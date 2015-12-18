#!/usr/bin/env node
require('app-module-path')
	.addPath(process.cwd())

import gulp from 'gulp'
import json from 'jsonfile'
import gulpLog from './gulp-log'
import pipeline from './pipeline'
import define from './define'

require('feradfile')
const config = json.readFileSync('ferad.json', { throws: false })

define(pipeline(process.argv[2], config))

gulpLog(gulp)
gulp.start('default')
