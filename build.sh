#!/bin/bash

set -xeu

cd ../mindwarriorgame.org
./build.sh

cd ../mindwarriorgame.org-build

cp -r ../mindwarriorgame.org/build/* .

git add .
git commit -m "Build"