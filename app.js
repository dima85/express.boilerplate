'use strict';
var express = require('express');
var dataRoutes = require('./routes/dataRoutes');

var app = express();

app.use('/data', dataRoutes);

module.exports = app;