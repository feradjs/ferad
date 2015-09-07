#!/usr/bin/env node

import rc from 'rc'
import watch from './watch'

const options = rc('ferad', {
	appConfig: 'app.json',
	path: ['~'],
	port: 5000
})

watch(process.cwd(), 8000)
