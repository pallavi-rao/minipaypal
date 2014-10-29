// This route is responsible for all actions related to users
var express = require('express');
var store = require('../paypal_db');
var dao = require('../dao');
var router = express.Router();

function checkUser(req,res,next) {
  var username = req.cookies.paypal_user;
  console.log("Cookie: " + username);
  if (username != req.param.user) {
    var attributes = {
      message : "Login as user, " + req.param.user + ", to access that user's data."
    };
    res.render('login', attributes);
  }
}

/*Save a customer account*/
router.post('/add',  function(req,res,next){        
  var data = {   
    username : req.param('name'),
    email : req.param('email'),
    password : req.param('password')   
  };
  store.getUser(data.username, function(user) { 
    // User must not exist
     if (user == null) {
       store.addUser(data, function(status) {
          if (status) {
           res.redirect('/users/' + data.username);
          } 
       });
     } else {
        var attributes = {
          message : "User, " + data.username + ", already exists!"
        };
        res.render('signup', attributes);
     }
  });
});

/* Get a customer details*/
router.get('/:user',  function(req,res,next){
    // checkUser(req, res, next);
  var username = req.param('user');
  store.getUser(username, function (user) {
     if (user != null) {
        var attributes = {
            page : 'profile', 
            username : username,
            mode : req.param('mode'),
            user : user
        };
        res.render('account', attributes);
      } else {
        next();
      }
  });   
});

/* Get all users*/
router.get('/',  function(req,res,next){
  var username = req.param('user');

  store.getUsers(function (users) {
    if (users != null) {
       var attributes = {
          page : 'admin', 
          users : users
       };
       res.render('admin', attributes);
    } else {
       next();
    }
  });
});

  /* Login a user*/
router.post('/login', function(req,res,next){
    var username = req.param('name');
    var password = req.param('password');
    console.log(" User "  + username + " password " + password);
    store.getUser(username, function(user) {  
        console.log(user);
        var attributes = {
            message : "Invalid user name or password. Try again!",
            page : "users"
        };
      
        if (user == null) {
          res.render('login', attributes);
        } else {
          console.log(user);
          // Check if password matches
          if (user.password != password) {
            res.render('login', attributes);
          } else {
            res.redirect('/users/' + username);
          }
        }
    });
});


module.exports = router;
