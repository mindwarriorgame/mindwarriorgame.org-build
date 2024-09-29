#!/bin/bash

set -xeu

cd ../mindwarriorgame.org
./build.sh

cd ../mindwarriorgame.org-build

cp -r ../mindwarriorgame.org/build/* .

git add .
git status
git commit -m "Build"

git push origin main