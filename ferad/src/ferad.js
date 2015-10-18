#!/usr/bin/env node
require('babel/polyfill')

import gulp from 'gulp'
import json from 'jsonfile'
import gulpLog from './gulp-log'
import pipeline from './pipeline'
import define from './define'
import old from './old/ferad'

gulpLog(gulp)

const config = json.readFileSync('ferad.json', { throws: false })
if (config) {
	define(pipeline(process.argv[2], config))
	gulp.start('default')
} else {
	old()
}
