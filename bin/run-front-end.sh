#!/bin/sh


TOPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"

if [ ! -f $TOPDIR/.env ] ; then
  echo .env file is missing
  exit
else
  source $TOPDIR/.env
fi

mkdir -p $TOPDIR/var/log
echo "starting front-end server on port $PORT"
echo "=> point your browser to $APP_URL"

cd $TOPDIR
<<<<<<< HEAD
./node_modules/nodemon/bin/nodemon.js server.js > $TOPDIR/var/log/frontend.log 
=======
./node_modules/nodemon/bin/nodemon.js server.js > $TOPDIR/var/log/frontend.log 
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
