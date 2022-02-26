import { NextFunction, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { UserParams } from '../user/user.ctrl';
import * as UserPatent from './userPatent.dal';
import { UserPatentRequestInput } from '../../database/mysql/userPatent';

interface UserPatentParams extends UserParams {
    patentId: string;
}

const getAll = async function (
    req: Request<UserParams, {}, {}, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = parseInt(req.params._id, 10);
        try {
            const result = await UserPatent.getAll(userId);
            return res.status(StatusCodes.OK).json(result);
        } catch {
            return res.status(StatusCodes.NOT_FOUND).send();
        }
    } catch (e) {
        next(e);
    }
};
const create = async function (
    req: Request<UserParams, {}, UserPatentRequestInput, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        const patentId = req.body.patentId;
        const userId = parseInt(req.params._id, 10);
        const session = req.session;
        if (session.user?.id == userId) {
            const result = await UserPatent.create({
                userId,
                patentId,
            });
            if (result) {
                return res.status(StatusCodes.CREATED).send();
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                error: 'Could not find the patent',
            });
        }
        return res.status(StatusCodes.FORBIDDEN).send();
    } catch (e) {
        next(e);
    }
};

const deleteById = async function (
    req: Request<UserPatentParams, {}, UserPatentRequestInput, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        const patentId = req.params.patentId;
        const userId = parseInt(req.params._id, 10);
        const session = req.session;
        if (session.user?.id == userId) {
            const result = await UserPatent.deleteById({
                userId,
                patentId,
            });
            if (result) {
                return res.status(StatusCodes.NO_CONTENT).send();
            }
            return res.status(StatusCodes.NOT_FOUND).send();
        }
        return res
            .status(StatusCodes.FORBIDDEN)
            .send({ error: 'Something went wrong. Please, try again later' });
    } catch (e) {
        next(e);
    }
};

export { getAll, create, deleteById };
