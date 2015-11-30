#!/usr/bin/env node

import gulp from 'gulp'
import json from 'jsonfile'
import gulpLog from './gulp-log'
import pipeline from './pipeline'
import define from './define'

const config = Object.assign(
	require('../default.json'),
	json.readFileSync('ferad.json', { throws: false })
)
const based = Object.assign(
	require(config.$configs)(config.$base),
	config
)
define(require(config.$tasks),
	pipeline(process.argv[2], based)
)

gulpLog(gulp)
gulp.start('default')
