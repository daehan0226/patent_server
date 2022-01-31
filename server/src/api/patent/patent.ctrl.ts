import { Request, Response, NextFunction } from 'express';

const index = function (req: Request, res: Response, next: NextFunction) {
    res.json([{"name": "patent"}]);
};

export {
    index
}