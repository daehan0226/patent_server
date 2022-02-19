import { NextFunction, Request, Response } from 'express';

import {
	StatusCodes,
} from 'http-status-codes';
import * as User from './user.dal';
import {UserInput} from "../../models/mysql/User"
import { UniqueConstraintError } from 'sequelize';

const getById = async function (req:Request<{_id: number},{},{},{}>, res: Response, next: NextFunction) {
    try {
        try {
            const result = await User.getById(req.params._id)
            return res.status(StatusCodes.OK).json(result);
        } catch {
            return res.status(StatusCodes.NOT_FOUND).send();
        }
    } catch (e) {
        next(e)
    }
};


const create = async function (req:Request<{},{},UserInput,{}>, res: Response, next: NextFunction) {
    try {
        const result = await User.create({name:req.body.name})
        return res.status(StatusCodes.CREATED).json(result);
    } catch (e) {
        if (e instanceof UniqueConstraintError) {
            return res.status(StatusCodes.BAD_REQUEST).send();
        }
        next(e)
    }
};

export {
    getById,
    create
}