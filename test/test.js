
	var request = require('supertest');
	var express = require('express');
	var app = require('../app');
	var dao = require('../dao');


	function isNotFoundPage(res) {
	    if (!(JSON.stringify(res.body) == '{}')) throw new Error("Not returning an error page");
	  }

	function pageContains(res, str) {
	    if (!(JSON.stringify(res.body) == '{}')) throw new Error("Page does not expected content");
	}

	// Ensure the user listing shows up fine
	describe('GET /users', function(){
	  it('responds with HTML', function(done){
	    request(app)
	      .get('/users')
	      .expect('Content-Type', 'text/html; charset=utf-8')
	      .expect(200, done);

	  })
	})

	// Ensure the error page shows up fine when an invalid user is supplied
	describe('GET /account/abcd', function(){
	  it('responds with error page', function(done){
	    request(app)
	      .get('/account/abc')
	      .expect('Content-Type', 'text/html; charset=utf-8')
	      .expect(200)
	      .expect(isNotFoundPage)
	      .end(done);
	      
	  })
	})

	// Login page 
	describe('GET /login', function(){
	  it('responds with login page', function(done){
	    request(app)
	      .get('/login')
	      .expect('Content-Type', 'text/html; charset=utf-8')
	      .expect(200)
	      .expect(pageContains, 'Login')
	      .end(done);
	      
	  })
	})

	// Signup page
	describe('GET /signup', function(){
	  it('responds with signup page', function(done){
	    request(app)
	      .get('/login')
	      .expect('Content-Type', 'text/html; charset=utf-8')
	      .expect(200)
	      .expect(pageContains, 'Signup')
	      .end(done);
	      
	  })
	})

	// Some Data Access Object tests

	// Create a user
	describe('Create User object', function(){
		it('creates a user object', function (done) {
			var test = {id : 1,
				username : "abc",
				email : "abc@dev.com",
				password : "abc"};
			console.log(test);
			var user = dao.user(test);
			console.log(user.getInformation());
			if (JSON.stringify(user.getInformation()) == JSON.stringify(test)) {
				done();
			} else {
				throw new Error ('Created object does not match test object');
			}

		})
	})


