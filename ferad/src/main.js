#!/usr/bin/env node

import rc from 'rc'
import serve from './serve'
import Locate from './locate'
import watch from './watch'

const options = rc('ferad', {
	appConfig: 'app.json',
	path: ['~'],
	port: 5000
})

/*const locate = Locate(options.appConfig, options.path)

serve(options.port, (project) => {
	locate(project, ([root]) => {
		watch(root, 8000)
	})
})*/

watch(process.cwd(), 8000)
