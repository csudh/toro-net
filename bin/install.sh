#!/bin/sh

echo "setting up apt repos"
sudo apt-key adv \
   --keyserver hkp://keyserver.ubuntu.com:80 \
   --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list 
sudo apt-get update 

echo "installing mongo"
sudo apt-get install -y mongodb-org 

echo "installing node"
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - &&
sudo apt-get install -y nodejs 
npm install

# sudo service mongod start