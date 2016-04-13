'use strict';
var Promise = require('bluebird');

var data = [{id: 1, name: 'hello'}, {id: 2, name: 'world!'}];

function getAllData() {
	var deferred = Promise.pending();

	setTimeout(function() {
		deferred.resolve(data);
	});

	return deferred.promise;
}

module.exports = {
	getAllData: getAllData
};