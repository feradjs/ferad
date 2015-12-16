#!/bin/sh
sudo chmod -R 777 /usr/local/lib/node_modules
cd tasks && npm link
cd ../configs && npm link
cd ../ferad-cli
npm link ferad-tasks
npm link ferad-configs
npm install
chmod +x dist/ferad.js
sudo ln -sf $(pwd)/dist/ferad.js /usr/local/bin/ferad
