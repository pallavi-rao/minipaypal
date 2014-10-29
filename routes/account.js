// This route is responsible for all actions related to an account

var express = require('express');
var store = require('../paypal_db');
var dao = require('../dao');
var router = express.Router();

/* GET the account transfer initial page. */
router.get('/:user/transfer', function(req, res, next) {
  var attributes = {
    page : 'transferInitiate',
    username : req.param('user')
  };
  res.render('account', attributes);
});


/* Transfer money from one account to another*/
router.post('/:user/debit',  function(req,res,next){  
  var username = req.param('user');
  var toUser = req.param('toUser');
  var amount = req.param('amount');
  var targetUser;

  // Check if the target user exists
  store.getUser(toUser, function(user) {
    if ( user == null) {
      var attributes = {
        page : 'transferInitiate',
        username : username,
        message : "User " + toUser + " does not exist!"
      };
      res.render('account', attributes);
      return next;
    } else {
      targetUser = user;
      console.log(targetUser);
    }
    // Check if account has enough funds
    store.getAccount(username, function(srcAccount) {
      if ( srcAccount.balance < amount) {
         var attributes = {
           page : 'transferInitiate',
           username : username,
           message : "Insufficient funds! Your balance is " + srcAccount.balance
         };
         res.render('account', attributes);
         return next;
      }
      
      // Do the money transfer
      store.doAccountTransfer(srcAccount, targetUser, amount, function (status){
        if (status) {
          var attributes = {
            page : 'transferSuccess',
            username : username,
            message : "USD " + amount + " has been transferred to " + toUser
          };
          res.render('account', attributes);
          console.log(res);
        }
      });
    });
  });  
});


/* Get a customer account*/
router.get('/:user',  function(req,res,next){
  var user = req.param('user');    
  store.getAccount(user, function(account) {
    console.log(account);
    if (account != null) {
       var attributes = {
          page : 'account', 
          username : user,
          mode : req.param('mode'),
          account : account
        };
        res.render('account', attributes);
     } else {
        return next;
     }      
  });
});

/* Get a customer account*/
router.get('/:user/transfers',  function(req,res,next){
  var user = req.param('user')
  store.getAccount(user, function(account) {
  console.log(account);
   if (account != null) {
     store.getAccountTransactions(account, function(transactions) {
       var attributes = {
         page : 'transfers', 
         username : user,
         mode : req.param('mode'),
         transactions : transactions
       };

       res.render('account', attributes);
     });
   } else {
       return next;
   }
        
  });
});

module.exports = router;
