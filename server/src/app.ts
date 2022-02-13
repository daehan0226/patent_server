"use strict";
import express from "express";
import bodyParser from "body-parser";
import morganMiddleware from "./lib/morganMiddleware";

import errorHandler from './lib/errorHandler'
import patent from "./api/patent";

const app = express();

app.use(morganMiddleware)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/patents", patent);
app.use(errorHandler);


export default app;
