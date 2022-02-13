"use strict";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import morganMiddleware from "./lib/morganMiddleware";
import errorHandler from './lib/errorHandler'
import db from "./configs/db.config";
import patent from "./api/patent";
import setHeaders from "./lib/rules";


const app = express();

app.use(morganMiddleware)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(setHeaders);

app.use("/patents", patent);
app.use(errorHandler);

mongoose
    .connect(db.url, {
        dbName: db.database
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err: Error) => console.log(err))

export default app;
