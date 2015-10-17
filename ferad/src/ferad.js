#!/usr/bin/env node
require('babel/polyfill')

import gulp from 'gulp'
import json from 'jsonfile'
import gulpLog from './gulp-log'
import old from './old/ferad'

gulpLog(gulp)

const config = json.readFileSync('ferad.json', { throws: false })
if (config) {
	// 2.0
} else {
	old()
}
