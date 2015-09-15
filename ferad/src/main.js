#!/usr/bin/env node
require('babel/polyfill')

import rc from 'rc'
import json from 'jsonfile'
import u from 'ferad-utils'
import gulp from 'gulp'
import gulpLog from './gulp-log'
import execute from './execute'

const env = rc('ferad', require('../ferad.json'))
console.log(rc('ferad', require('../ferad.json')))
const app = json.readFileSync(env.appConfig, { throws: false })
const configurator = require(env.configurator)
const tasks = configurator(env, app, process.cwd())
const task = u.normalize(env._, 'default')

gulpLog(gulp)
execute(task, tasks)
