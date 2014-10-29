var dao = require('./dao');

// Initialize DB
var mysql      = require('mysql');
var connectionInfo = {
  host     : 'localhost',
  user     : process.env.DBUSER || 'user',
  database : process.env.DBNAME || 'paypal'
}
if (process.env.DBPASSWORD) {
  connectionInfo['password'] = process.env.DBPASSWORD;
}
var connection = mysql.createConnection(connectionInfo);

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected to db ' + connectionInfo.database);
});

exports.connection = connection;

// Query the customer table for a give user name
exports.getUser = function (user, callback) {
  var query = connection.query("SELECT * from customer where username = ? ", [user], function(err, rows) {   
      if (err) {
        console.log("Unable to retrieve user from db : %s ",err );
        throw err;
      } 
      if (rows.length != 1) {
         callback(null);
      } else {
         callback(dao.user(rows[0]).data);
      }
   });  
   console.log(query.sql); // get raw query
}

// Get all records in the customer table
exports.getUsers = function (callback) {
   var query = connection.query("SELECT * from customer",  function(err, rows) {   
      if (err) {
        console.log("Unable to users for user from db : %s ",err );
        throw err;
      } 
      var users = [];
      for(var i=0; i<rows.length; i++) {
        console.log(dao.user(rows[i]).getInformation());
        users[i] = dao.user(rows[i]).getInformation();
        console.log(users[i]);
      }     
      callback(users);
   }); 
   console.log(query.sql);
}

// Add a record to customer table and also add a record to account to table
// to start an account with an initial balance of 100
exports.addUser = function (data, callback) {
	connection.beginTransaction(function(err) {
        if (err) { throw err; }
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows) {   
          if (err) {
              connection.rollback(function() {
                console.log("Error inserting : %s ",err );
                throw err;
             });
          }	
          // The record may already exist
          if (rows.affectedRows == 0) {
              callback(false);
          }
          var account = {
            created : new Date(),
            balance : 100,
            userid : rows.insertId
          };
          connection.query('INSERT INTO account set ?', account, function(err, result) {
         	 if (err) { 
           		connection.rollback(function() {
              		throw err;
             	});
          	 }  
          	 connection.commit(function(err) {
          	 	if (err) { 
            		connection.rollback(function() {
              			throw err;
                	});
          	 	}
          	 	callback(true);
          	 });
          	 console.log(result);
          });
          console.log(rows);
      	});
        console.log(query.sql); // get raw query
    });
}

// Get a record from account table given a user name
exports.getAccount = function (user, callback) {
  var query = connection.query("SELECT * FROM account where userid = (SELECT id FROM customer where username = ?)",[user], function(err, rows) {   
    if (err) {
        console.log("Unable to retrieve account from db : %s ",err );
        throw err;
    }
    if (rows.length != 1) {
        callback(null);
    } else {
        callback(dao.account(rows[0]).data);
    }
   });
   console.log(query.sql); // get raw query
}

// Get all records from transaction table for a given account
exports.getAccountTransactions = function(account, callback) {
	var query = connection.query("SELECT * from transaction where fromaccount = ? ", [account.id], function(err, rows) {   
     	if (err) {
            console.log("Unable to transactions for user from db : %s ",err );
            throw err;
        } 
        var transactions = [];
        for(var i=0; i<rows.length; i++) {
            console.log(dao.transaction(rows[i]).getInformation());
            transactions[i] = dao.transaction(rows[i]).getInformation();
            console.log(transactions[i]);
        }
        callback(transactions);
    });
	console.log(query.sql); // get raw query
}

/* Transfer money
  Deduct amount from source account, add amount to target account and add a record to the transaction
  Using transaction boundary.
*/
exports.doAccountTransfer = function(srcAccount, targetUser, amount, callback) {
	connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var query = connection.query("UPDATE account SET balance = balance-? where userid  = " + srcAccount.userid, [parseInt(amount)], function(err, rows) {  
          if (err) {
              connection.rollback(function() {
                console.log("Error inserting : %s ",err );
                throw err;
             });
          }	

          connection.query("UPDATE account SET balance = balance+? where userid = "+ targetUser.id, [parseInt(amount)], function(err, rows) {
             if (err) {
              connection.rollback(function() {
                console.log("Error inserting : %s ",err );
                throw err;
             });
         	 } 
          	 var transaction = dao.transaction({
            	fromaccount: srcAccount.id,
            	touser: targetUser.username,
            	date: new Date(),
            	amount: amount,
            	type: "debit"
          	 });

          	 // Update the transactions table
          	 connection.query("INSERT INTO transaction set ? ", transaction.getInformation(), function(err, rows) {
                if (err) {
               	  connection.rollback(function() {
                	console.log("Error inserting : %s ",err );
                	throw err;
             	  });
             	}
          	 });

          	 connection.commit(function(err) {
          		if (err) { 
            		connection.rollback(function() {
              			throw err;
            		});
          		}
          	    console.log(rows);
          	 });
          });
        });
        console.log(query.sql);
        callback(true);
    });
}
