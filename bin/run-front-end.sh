#!/bin/sh

export PORT=3000
export MONGO_URI=mongodb://127.0.0.1:27017/toro-net
export GITHUB_ID=233245n234566kjh243f
export GITHUB_SECRET=k2hj432kjgjkh2g34kj2g4jkh23g4jk2342jhg34
export APP_URL=http://127.0.0.1:3000/

TOPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"
mkdir -p $TOPDIR/var/log

echo "starting front-end server"
cd $TOPDIR
./node_modules/nodemon/bin/nodemon.js server.js > $TOPDIR/var/log/frontend.log 
