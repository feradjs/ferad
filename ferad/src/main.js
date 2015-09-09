#!/usr/bin/env node
require('babel/polyfill')

import rc from 'rc'
import json from 'jsonfile'
import execute from './execute'

const env = rc('ferad', {
	configurator: './configurator',
	appConfig: 'app.json',
	dest: 'dest',
	port: 5000
})
const app = json.readFileSync(env.appConfig, { throws: false })
const configurator = require(env.configurator)
const tasks = configurator(env, app, process.cwd())

execute(tasks)
