"use strict";
import './config'
import app from "./app"
import Logger from './middlewares/logger';

const port = process.env.EXPRESS_PORT;
app.listen(port, () => {
   Logger.info(`Server is running on ${port} port`);
});
