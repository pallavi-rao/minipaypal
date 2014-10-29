source ~/.nvm/nvm.sh
nvm use 0.10
export PORT=8080
export DBNAME=paypal
export DBUSER=root
export DBPASSWORD=root
node ./bin/www
