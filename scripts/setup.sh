curl https://raw.githubusercontent.com/creationix/nvm/v0.17.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 0.10
nvm use 0.10
cd ..
npm install
npm install --save -g mocha
