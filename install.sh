#!/bin/sh
sudo chmod -R 777 /usr/local/lib/node_modules
cd tasks && npm link
cd ../configs && npm link
cd ../ferad
npm link ferad-tasks
npm link ferad-configs
npm install
