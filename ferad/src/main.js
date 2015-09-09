#!/usr/bin/env node
require('babel/polyfill')

import rc from 'rc'
import execute from './execute'

const env = rc('ferad', {
	appConfig: 'app.json',
	configurator: './configurator',
	port: 5000
})
const configurator = require(env.configurator)
const tasks = configurator(env, null, process.cwd())

execute(tasks)
