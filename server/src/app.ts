"use strict";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import patent from "./api/patent";

const app = express();

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/patents", patent);

export default app;
