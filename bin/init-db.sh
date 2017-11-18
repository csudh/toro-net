#!/bin/bash

TOPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"
DBPATH=${TOPDIR}/var/db

mkdir -p $DBPATH
<<<<<<< HEAD
mongod --dbpath $DBPATH
=======
mongod --dbpath $DBPATH
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
