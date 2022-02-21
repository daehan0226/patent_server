import { NextFunction, Request, Response } from 'express';

import {
	StatusCodes,
} from 'http-status-codes';
import Logger from '../../middlewares/logger';
import * as Session from './session.dal';

interface ISession {
    name: string;
    password: string;
}

const create = async function (req:Request<{},{},ISession,{}>, res: Response, next: NextFunction) {
    try {
        const result = await Session.create({name:req.body.name, password: req.body.password})
        const session = req.session;
        if (result) {
            session.username = req.body.name
            session.loggedIn = true;
            return res.status(StatusCodes.CREATED).send();
        }
        session.username = ''
        session.loggedIn = false;
        return res.status(StatusCodes.BAD_REQUEST).send({error: 'Wrong username and password'});
    } catch (e) {
        next(e)
    }
};


const destory = async function (req:Request<{},{},ISession,{}>, res: Response, next: NextFunction) {
    try {
        const session = req.session;
        session.destroy(err=> {
            if(err) {
                Logger.error(`Destory session error : ${err}`)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: 'Could not log out'});
            }
        })
        session.username = ''
        session.loggedIn = false;
        return res.status(StatusCodes.NO_CONTENT).send();
    } catch (e) {
        next(e)
    }
};


const validate = async function (req:Request<{},{},ISession,{}>, res: Response, next: NextFunction) {
    try {
        const session = req.session;
        if (session.loggedIn) {
            return res.status(StatusCodes.OK).send();
        }
        session.username = ''
        session.loggedIn = false;
        return res.status(StatusCodes.UNAUTHORIZED).send();
    } catch (e) {
        next(e)
    }
};

export {
    create,
    destory,
    validate
}