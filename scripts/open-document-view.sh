#!/usr/bin/env bash

./scripts/delete-document-view.sh

echo "start document-view"
npx pm2 --name "document-view" start ./scripts/document-view.sh

# delay 5 seconds
sleep 5

echo "Opening browser http://127.0.0.1"
node node_modules/opn-cli/cli.js http://127.0.0.1:8080
