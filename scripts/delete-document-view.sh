#!/usr/bin/env bash

echo "find process document-view"
npx pm2 ps | awk '{print $4}' | grep -w "document-view" -q
RESULT_CODE_DOCUMENT_VIEW=$?

if [ $RESULT_CODE_DOCUMENT_VIEW -eq 0 ]; then
    echo "delete document-view"
    npx pm2 delete document-view
fi

sleep 2
