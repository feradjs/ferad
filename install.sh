#!/bin/sh
cd tasks && npm link
cd ../configs && npm link
cd ../ferad
npm link ferad-tasks
npm link ferad-configs
npm install
