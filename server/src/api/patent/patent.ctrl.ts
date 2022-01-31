import { Request, Response } from 'express';

const index = function (req:Request, res: Response, next: Function) {
    res.status(200).json([{"name": "patent"}]);
};

export {
    index
}
