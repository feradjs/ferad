#!/bin/sh
npm install
gulp build
cd packages/ferad && npm link
cd ../ferad-tasks && npm link
cd ../../default
npm link ferad
npm link ferad-tasks
npm install
cd ../packages/ferad-cli
npm link ferad
npm install
chmod +x dist/ferad.js
sudo ln -sf $(pwd)/dist/ferad.js /usr/local/bin/ferad
