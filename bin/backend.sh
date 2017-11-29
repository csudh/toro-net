#!/bin/sh

TOPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"
mkdir -p $TOPDIR/var/log

echo "starting frontend server"
cd $TOPDIR
npm run serve > $TOPDIR/var/log/frontend.log
