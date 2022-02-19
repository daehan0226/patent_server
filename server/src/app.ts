"use strict";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import sequelize from "./models/mysql/index";
import dbInit from "./models/mysql/init"

import morganMiddleware from "./lib/morganMiddleware";
import errorHandler from './lib/errorHandler'
import db from "./configs/db.config";
import mysqlConfig from "./configs/mysql.config";
import patent from "./api/patent";
import user from "./api/user";
import setHeaders from "./lib/rules";
import Logger from "./lib/logger";


const app = express();

app.use(morganMiddleware)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(setHeaders);

app.use("/patents", patent);
app.use("/users", user);
app.use(errorHandler);

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
