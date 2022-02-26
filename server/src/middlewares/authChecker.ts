import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default function authChecker(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.session.user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .send({ error: 'Please log in first' });
    }
    next();
}
