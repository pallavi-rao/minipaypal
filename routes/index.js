// This route is responsible for all actions related home/login/signup pages

var express = require('express');
var router = express.Router();
var users = require('./users');
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET Login page. */
router.get('/login', function(req, res, next) {
  var attributes = {
    page: 'users'
  };
  res.render('login', attributes);
});


/* GET Sign up page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/* GET admin home page. */
router.get('/admin', function(req, res, next) {
  var attributes = {
    page: 'admin'
  };
  res.render('login', attributes);
});

/* Login the admin 
  Currently the admin user and password are hardcoded.
*/
router.post('/admin/login', function(req,res,next){
  var username = req.param('name');
  var password = req.param('password');
  if (username == "admin" && password == "admin") {
    res.redirect('/users');
  } else {
    var attributes = {
      message : "Invalid admin user/password. Try again!",
      page : "admin"
    };
    res.render('login', attributes);
  }
});

module.exports = router;
