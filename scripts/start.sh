#!/bin/bash

source ~/.nvm/nvm.sh
nvm use 0.10

read -p "Enter the port on which you want the web server to listen [DEFAULT : 8080] " port
read -p "Enter Database name: " dbname
read -p "Enter Database user: " dbuser
read -s -p "Enter db user password: [Hit 'Enter' for a no password login] : " dbpassword

if [ "$port" = "" ]
then
	port=8080
fi
export PORT="$port"
export DBNAME="$dbname"
export DBUSER="$dbuser"
export DBPASSWORD="$dbpassword"
cd ..
node ./bin/www
