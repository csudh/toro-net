#!/bin/sh

# Install MongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Install NodeJS
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install global npm packages
sudo npm install -g gulp babel yarn

# Clone the repo
git clone https://github.com/csudh/toro-net

# Install the required npm packages with yarn
cd /home/$USER/toro-net/api && yarn
cd /home/$USER/toro-net/client && yarn