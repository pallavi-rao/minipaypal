This is a very basic implementation of paypal like website using Node.js.

## Setup
Assumption : You have MySQL installed and a database created.
<li> To populate your db with sample data, from the current directory, run -> <i> mysql -u [user] -p [database] < paypal.sql </i> </li>
<li> To install node and npm, from the current directory, run -> <i> ./setup.sh </i> </li>

## Running the server
<li> Open up start.sh and set the port, database name, user and password according to your settings. </li>
<li> From the current directory, run ->  <i> ./start.sh </i> </li>

## Notes
<li>The password of all the test users is same as the user name. For example, password of alice is "alice" </li>
<li>User "admin" with password "admin" has admin previleges </li>
	
