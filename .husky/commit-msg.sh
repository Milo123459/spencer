#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '$ commit-msg' 
echo '$ yarn commitlint -e $1'
yarn commitlint -e $1