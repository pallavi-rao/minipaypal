This is a very basic implementation of paypal like application using Node.js.

## Setup
Assumption : You have MySQL installed and a database created.
- To create tables and populate your db with sample data, from the current directory, run >  ```cd scripts; mysql -u [user] -p [database] < paypal.sql```
- To install node and npm, from the current directory, run - > ```cd scripts; ./setup.sh```

## Running the server
- To start the HTTP server, from the current directory, run - > ```cd scripts; ./start.sh``` . Enter the details as requested.
- Open a browser and type in the URL -> http://localhost:8080/
- URL http://localhost:8080/admin takes you to the admin page. Login with user "admin" and password "admin" 

## Notes
- The password of all the test users is same as the user name. For example, password of alice is "alice" 
