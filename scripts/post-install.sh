#!/usr/bin/env bash

# check folder not exists
if [ ! -d ".dynamodb" ]; then
    echo "Folder not exists"
     npx patch-package
fi

sls dynamodb install
