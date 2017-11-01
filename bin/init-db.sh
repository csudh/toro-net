#!/bin/bash

TOPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"
DBPATH=${TOPDIR}/var/db

mkdir -p $DBPATH
mongod --dbpath $DBPATH
