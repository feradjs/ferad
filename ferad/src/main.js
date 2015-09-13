#!/usr/bin/env node
require('babel/polyfill')

import yargs from 'yargs'
import rc from 'rc'
import json from 'jsonfile'
import u from 'ferad-utils'
import execute from './execute'

const env = rc('ferad', {
	configurator: './configurator',
	appConfig: 'app.json',
	assets: ['assets/**/*', 'static/**/*'],
	dest: 'dist',
	port: 5000
})
const app = json.readFileSync(env.appConfig, { throws: false })
const configurator = require(env.configurator)
const tasks = configurator(env, app, process.cwd())
const task = u.normalize(yargs.argv._[0], 'default')

execute(task, tasks)
