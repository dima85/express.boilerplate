'use strict';
var Promise = require('bluebird');
var mongoose = require('mongoose');

var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  user: 'test_user',
  pass: '123'
};

mongoose.connect('mongodb://ds013300.mlab.com:13300/dima_test', options);

var PostSchema = mongoose.Schema({
  title: String,
  text: String,
  created: Date
});

var Post = mongoose.model('Post', PostSchema);

function getAllPosts() {
	var deferred = Promise.pending();

	Post.find(function(error, posts) {
    if (error) {
      deferred.reject();
    }
    else {
      deferred.resolve(posts);
    }
  });

	return deferred.promise;
}

module.exports = {
	getAllPosts: getAllPosts
};
