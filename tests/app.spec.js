'use strict';
var app = require('../app.js');
var _ = require('lodash');
var request = require('superagent');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var postStorage = require('../data/postStorage');
var Promise = require('bluebird');

var port = 1111;
var baseUrl = "http://localhost:" + port;
var server;

describe('app tests', function () {
	beforeEach(function (done) {
		server = app.listen(port, done);
	});
	afterEach(function (done) {
		server.close(done)
	});

	describe('When get all data records', function () {
		describe('And return list of data objects', function() {
			var response;
			var error;
			var dataObjects = [{id: 1, name: 'hello'}, {id: 2, name: 'world!'}];
			beforeEach(function (done) {
				sinon.stub(postStorage, 'getAllPosts', function() {
					return Promise.resolve(dataObjects);
				});

				request
				.get(baseUrl + "/post")
				.end(function(err, res) {
					error = err;
					response = res;
					done();
				});
			});

			afterEach(function () {
				postStorage.getAllPosts.restore();
			});

			it('Should not return error', function () {
				expect(error).to.not.exist;
			});

			it('Should return status "OK"', function () {
				expect(response.status).to.equal(200);
			});

			it('Should return array of data', function () {
				var responseObject = JSON.parse(response.text);
				expect(_.isArray(responseObject)).to.be.true;
			});

			it('Should return 2 data objects', function () {
				var responseObject = JSON.parse(response.text);
				expect(responseObject.length).to.equal(2);
			});

			it('Should return list of data objects', function () {
				var responseObject = JSON.parse(response.text);
				expect(responseObject).to.eql(dataObjects);
			});
		});
		describe('And failled to fetch all data objects', function() {
			var response;
			var error;

			beforeEach(function (done) {
				sinon.stub(postStorage, 'getAllPosts', function() {
					return Promise.reject('Some error');
				});

				request
				.get(baseUrl + '/post')
				.end(function(err, res) {
					error = err;
					response = res;
					done();
				})
			});

			afterEach(function () {
				postStorage.getAllPosts.restore();
			});

			it('Should return error', function () {
				expect(error).to.exist;
			});

			it('Should return 500 error status', function () {
				expect(response.status).to.equal(500);
			});
		});

	});
});
