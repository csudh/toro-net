# Toro Net

## Getting started

Add a `.env` file with your PORT, MONGO_URI, 
[GITHUB_ID, GITHUB_SECRET and APP_URL](https://github.com/jaredhanson/passport-github) like this:

``` bash
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/toro-net
GITHUB_ID=233245n234566kjh243f
GITHUB_SECRET=k2hj432kjgjkh2g34kj2g4jkh23g4jk2342jhg34
APP_URL=http://127.0.0.1:3000/
```

After that execute the following:

``` bash
# fork the repo then clone it to your local machine
git clone https://github.com/<your username>/toro-net-test.git

# cd into the dir
cd toro-net-test

# provision the vagrant box
vagrant up

# ssh into your box
vagrant ssh

# cd into the dir on your box
cd toro-net-test

# install dependencies (mongo, node, npm packages)
./dev-env.sh

# build and watch for changes
npm run serve

# run mongo as a service
sudo service mongod start

# open a new terminal on your host os
cd toro-net-test
vagrant ssh
cd toro-net-test
./node_modules/nodemon/bin/nodemon.js server.js
```
