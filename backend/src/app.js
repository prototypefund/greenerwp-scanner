var express = require('express');
var analyseRouter = require('./routes/analyse');

var app = express();
app.use(express.json());
app.use('/analyse', analyseRouter);

module.exports = app;
