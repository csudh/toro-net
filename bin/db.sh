#!/bin/bash

TOPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"
DBPATH=${TOPDIR}/var/db

mkdir -p $DBPATH
mongod --dbpath $DBPATH

# if we want to set another data path, we must edit the /etc/neo4j/neo4j.conf
sudo service neo4j start  
