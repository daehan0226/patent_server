import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserParams } from '../api/user/user.ctrl';
import { getById } from '../api/user/user.dal';
import { RoleAttributes, Roles } from '../database/mysql/role';
import Logger from './logger';

export interface ICustomRequestParams extends Partial<UserParams> {}

const checkIfOwner = (
    req: Request<ICustomRequestParams, {}, {}, {}>,
    sessionUserId: number
) => {
    const resourceUserId = req.params.userId && parseInt(req.params.userId, 10);
    return resourceUserId === sessionUserId;
};

const checkIfAdmin = (roles: RoleAttributes[]): boolean => {
    return !!roles.find((userRole) => userRole.name === 'admin');
};

const checkIfManger = (roles: RoleAttributes[]): boolean => {
    return !!roles.find((userRole) => userRole.name === 'manager');
};

const checkIfManagerOrAdmin = (roles: RoleAttributes[]): boolean => {
    return !!roles.find((userRole) =>
        ['admin', 'manager'].includes(userRole.name)
    );
};

const checkRole = (role: Roles) => {
    return async (
        req: Request<ICustomRequestParams, {}, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        let checkRoleResult: boolean = false;
        let statusCode = StatusCodes.FORBIDDEN;
        let error = `No ${role} permission granted`;
        if (req.session.user?.id) {
            const user = await getById(req.session.user?.id);
            switch (role) {
                case 'admin':
                    checkRoleResult =
                        (user.roles && checkIfAdmin(user.roles)) || false;
                    break;
                case 'manager':
                    checkRoleResult =
                        (user.roles && checkIfManger(user.roles)) || false;
                    break;
                case 'customer':
                    checkRoleResult = checkIfOwner(req, user.id);
                    if (!checkRoleResult) {
                        checkRoleResult =
                            (user.roles && checkIfManagerOrAdmin(user.roles)) ||
                            false;
                    }
                    break;
                default:
                    Logger.error('checkRole, role type error');
                    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
                    error =
                        'Oops, something went wrong. Please try again later';
            }
            if (checkRoleResult) {
                return next();
            }
        }
        return res.status(statusCode).send({
            error,
        });
    };
};

export default checkRole;
