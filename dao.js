var User = function () {
	this.data = {
		id: null,
		username: null,
		email: null,
		password: null
	};

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};

	this.getInformation = function () {
		return this.data;
	};

};

var Account = function () {
	this.data = {
		id: null,
		userid: null,
		created: null,
		balance: null
	};

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};

	this.getInformation = function () {
		return this.data;
	};

};

var Transaction = function () {
	this.data = {
		id: null,
		fromaccount: null,
		touser: null,
		date: null,
		amount: null,
		type: null
	};

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};

	this.getInformation = function () {
		return this.data;
	};

};

exports.user = function (info) {
	var instance = new User();

	instance.fill(info);

	return instance;
};

exports.account = function (info) {
	var instance = new Account();

	instance.fill(info);

	return instance;
};

exports.transaction = function (info) {
	var instance = new Transaction();

	instance.fill(info);

	return instance;
};

exports.getUser = function (user, callback) {
  var connection = db.connection;
  var query = connection.query("SELECT * from customer where username = ? ", [user], function(err, rows)
        {   
          if (err) {
              console.log("Unable to retrieve user from db : %s ",err );
              return null;
          } 
          if (rows.length != 1) {
            callback(null);
          } else {
            callback(dao.user(rows[0]).data);
          }
        });
        
       console.log(query.sql); // get raw query
}




