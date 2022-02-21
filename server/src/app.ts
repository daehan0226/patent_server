"use strict";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import sequelize from "./database/mysql/index";
import dbInit from "./database/mysql/init"

import morganMiddleware from "./middlewares/morganMiddleware";
import sessionMiddleware, {ISessionUser} from "./middlewares/sessionMiddleware";
import errorHandler from './middlewares/errorHandler'
import db from "./configs/db.config";
import mysqlConfig from "./configs/mysql.config";
import patent from "./api/patent";
import user from "./api/user";
import session from "./api/session";
import setHeaders from "./middlewares/rules";
import Logger from "./middlewares/logger";

const app = express();

declare module 'express-session' {
    interface SessionData {
        cookie: Cookie;
        user: ISessionUser | null;
        loggedIn: boolean;
    }
}

app.use(morganMiddleware)
app.use(sessionMiddleware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setHeaders);
app.use(errorHandler);

app.use("/patents", patent);
app.use("/sessions", session);
app.use("/users", user);

sequelize.sync() 
.then(()=>{
    Logger.info(`mysql(sequelize) url : ${mysqlConfig.url}`)
    dbInit()
}).catch((error: Error)=>{
    Logger.error('Unable to connect to the database:', error);
})

if (process.env.NODE_ENV !== "test") {
    mongoose
        .connect(db.url, {
            dbName: db.database
        })
        .then(()=>{    
            Logger.info(`mongdb(mongoose) url : ${db.url}${db.database}`)
        })
        .catch((err: Error) => Logger.error(err))   
}

export default app;
