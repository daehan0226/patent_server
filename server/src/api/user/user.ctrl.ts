import { NextFunction, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import * as User from './user.dal';
import { GetAllUsersFilters, UserInput } from '../../database/mysql/user';
import { UniqueConstraintError, ValidationError } from 'sequelize';

export interface UserParams {
    userId: string; // params are always string
}

const getById = async function (
    req: Request<UserParams, {}, {}, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        try {
            const result = await User.getById(parseInt(req.params.userId, 10));
            return res.status(StatusCodes.OK).json(result);
        } catch {
            return res.status(StatusCodes.NOT_FOUND).send();
        }
    } catch (e) {
        next(e);
    }
};

const getAll = async function (
    req: Request<{}, {}, {}, GetAllUsersFilters>,
    res: Response,
    next: NextFunction
) {
    try {
        try {
            const name = req.query.name || '';
            const includeDeleted = false; // check if admin with session
            const result = await User.getAll({ includeDeleted, name });
            return res.status(StatusCodes.OK).json(result);
        } catch {
            return res.status(StatusCodes.NOT_FOUND).send();
        }
    } catch (e) {
        next(e);
    }
};

const update = async function (
    req: Request<UserParams, {}, UserInput, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        try {
            await User.update(parseInt(req.params.userId, 10), req.body);
            return res.status(StatusCodes.NO_CONTENT).send();
        } catch {
            return res.status(StatusCodes.NOT_FOUND).send();
        }
    } catch (e) {
        next(e);
    }
};

const deleteById = async function (
    req: Request<UserParams, {}, {}, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        try {
            await User.getById(parseInt(req.params.userId, 10));
            await User.deleteById(parseInt(req.params.userId, 10));
            return res.status(StatusCodes.NO_CONTENT).send();
        } catch {
            return res.status(StatusCodes.NOT_FOUND).send();
        }
    } catch (e) {
        next(e);
    }
};

const create = async function (
    req: Request<{}, {}, UserInput, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await User.create({
            name: req.body.name,
            password: req.body.password,
        });
        return res.status(StatusCodes.CREATED).json(result);
    } catch (e) {
        if (e instanceof UniqueConstraintError) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send({ error: `User name ${req.body.name} already exists.` });
        }
        if (e instanceof ValidationError) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send({ error: `Name or password format error` });
        }
        next(e);
    }
};

export { getAll, getById, deleteById, create, update };
