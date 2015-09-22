#!/usr/bin/env node
require('babel/polyfill')

import rc from 'rc'
import json from 'jsonfile'
import gulp from 'gulp'
import gulpLog from './gulp-log'
import execute from './execute'

const env = rc('ferad', require('../ferad.json'))
const app = json.readFileSync(env.appConfig, { throws: false })
const configurator = require(env.configurator)
const tasks = configurator(env, app, process.cwd())
const task = env._[0] || 'default'

gulpLog(gulp)
execute(task, tasks)
