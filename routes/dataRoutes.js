'use strict';
var express = require('express');
var router = express.Router();

var dataStorage = require('../data/dataStorage');

router.get('/', function(req, res) {
	dataStorage
	.getAllData()
	.then(function(dataObjects) {
		res.status(200);
		res.send(dataObjects);
	})
	.catch(function(error) {
		res.status(500);
		res.send(error);
	});	
});

module.exports = router;