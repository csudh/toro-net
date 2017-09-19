#!/bin/bash
# Install MongoDB
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
apt-get update
apt-get install -y mongodb-org
# Install NodeJS
curl -sL https://deb.nodesource.com/setup_8.x | -E bash -
apt-get install -y nodejs
# Install global npm packages
npm install -g gulp babel yarn
# Install the required npm packages with yarn
cd /home/ubuntu/toro-net/api && yarn
cd /home/ubuntu/toro-net/client && yarn
