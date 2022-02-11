"use strict";
import './config'
import app from "./app"

const port = process.env.EXPRESS_PORT;

app.listen(port, () => {
   console.log(`Server is running on ${port} port`);
});
