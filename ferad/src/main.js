#!/usr/bin/env node

import rc from 'rc'
import watch from './watch'

const env = rc('ferad', {
	appConfig: 'app.json',
	configurator: './configurator',
	port: 5000
})
const configurator = require(env.configurator)
const config = configurator(env, null)

watch(process.cwd(), config.port)
