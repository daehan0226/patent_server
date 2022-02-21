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
        const name = req.body.name
        const password = req.body.password
        const userId = await Session.create({name, password})
        const session = req.session;
        if (userId) {
            session.user = {
                id: userId,
                name
            }
            session.loggedIn = true;
            return res.status(StatusCodes.CREATED).send();
        }
        session.user = null;
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
        session.user = null;
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
        session.user = null;
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