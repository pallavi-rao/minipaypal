SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

-- Create tables

CREATE TABLE IF NOT EXISTS customer (
	id BIGINT AUTO_INCREMENT PRIMARY KEY, 
	username VARCHAR(100) UNIQUE, 
	email VARCHAR(50), 
	password VARCHAR(100));

CREATE TABLE IF NOT EXISTS account (
	id BIGINT AUTO_INCREMENT PRIMARY KEY, 
	userid BIGINT, 
	created DATE, 
	balance DOUBLE, 
	FOREIGN KEY (userid) REFERENCES customer(id));

CREATE TABLE IF NOT EXISTS transaction (
	id BIGINT AUTO_INCREMENT PRIMARY KEY, 
	fromaccount BIGINT, 
	touser VARCHAR(100), 
	date DATE, 
	amount DOUBLE, 
	type ENUM ('credit', 'debit'), 
	FOREIGN KEY (fromaccount) REFERENCES account(id),
	FOREIGN KEY (touser) REFERENCES customer(username));

-- Create some users
INSERT INTO customer (id, username, email, password) VALUES
(1, 'alice', 'alice@dev.com', '92903040'),
(3, 'bob', 'bob@dev.com', '97717'),
(4, 'charlie', 'charlie@dev.com', '739067762');

-- create accounts for those users
INSERT INTO account (id, userid, created, balance) VALUES
(1, 1, '2014-10-28', 75),
(2, 3, '2014-10-28', 110),
(3, 4, '2014-10-28', 115);

-- create transactions for the users
INSERT INTO transaction (id, fromaccount, touser, date, amount, type) VALUES
(1, 1, 'bob', '2014-10-29', 25, 'debit'),
(2, 2, 'charlie', '2014-10-29', 15, 'debit');


