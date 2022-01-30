"use strict";

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var patent = require('./api/patent');

if (process.env.NODE_ENV !== 'test') {
   app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/patents', patent);

module.exports = app;