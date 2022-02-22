import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from './logger';

export default function errorHandler(
    err: string,
    _: Request,
    res: Response,
    __: NextFunction
) {
    Logger.error('Error : ', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
}
