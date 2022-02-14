"use strict";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import morganMiddleware from "./lib/morganMiddleware";
import errorHandler from './lib/errorHandler'
import db from "./configs/db.config";
import patent from "./api/patent";
import setHeaders from "./lib/rules";
import Logger from "./lib/logger";


const app = express();

app.use(morganMiddleware)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(setHeaders);

app.use("/patents", patent);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
    Logger.info(`mongdb(mongoose) url : ${db.url}${db.database}`)
    mongoose
        .connect(db.url, {
            dbName: db.database
        })
        .then()
        .catch((err: Error) => Logger.error(err))
}

export default app;
