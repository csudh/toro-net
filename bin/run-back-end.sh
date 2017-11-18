#!/bin/sh

TOPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"
mkdir -p $TOPDIR/var/log

echo "starting backend server"
cd $TOPDIR
<<<<<<< HEAD
npm run serve > $TOPDIR/var/log/backend.log
=======
npm run serve > $TOPDIR/var/log/backend.log
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
