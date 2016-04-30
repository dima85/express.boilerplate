'use strict';
var express = require('express');
var dataRoutes = require('./routes/postRoutes');

var app = express();

app.use('/post', dataRoutes);

module.exports = app;
