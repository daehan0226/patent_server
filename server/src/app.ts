'use strict';
import express from 'express';
import bodyParser from 'body-parser';

import {
    morganMiddleware,
    sessionMiddleware,
    ISessionUser,
    errorHandler,
    setHeaders,
    checkAuth,
} from './middlewares';

import patent from './api/patent';
import user from './api/user';
import session from './api/session';
import userPatent from './api/userPatent';

import { init_sequelize, init_mongoose } from './database';

const app = express();

declare module 'express-session' {
    interface SessionData {
        cookie: Cookie;
        user: ISessionUser | null;
        loggedIn: boolean;
    }
}

app.use(morganMiddleware);
app.use(sessionMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setHeaders);
app.use(errorHandler);

app.use('/patents', patent);
app.use('/sessions', session);
app.use('/users', user);
app.use('/users/:userId/patents', checkAuth, userPatent);

init_sequelize();
init_mongoose();

export default app;
