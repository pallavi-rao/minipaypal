This is a very basic implementation of paypal like website using Node.js.

## Setup
Assumption : You have MySQL installed and a database created.
- To create tables and populate your db with sample data, from the current directory, run >  ```cd scripts; mysql -u [user] -p [database] < paypal.sql```
- To install node and npm, from the current directory, run - > ```cd scripts; ./setup.sh```

## Running the server
- Open up start.sh and set the port, database name, user and password according to your settings.
- From the current directory, run - > ```cd scripts; ./start.sh```
- Open a browser and type in the URL -> http://localhost:[port]/
- URL http://localhost:[port]/admin takes you to the admin page

## Notes

- The password of all the test users is same as the user name. For example, password of alice is "alice" 
- User "admin" with password "admin" has admin privileges on the paypal site. 
