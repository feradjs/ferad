#!/usr/bin/env node

import rc from 'rc'
import Locate from './locate'

const options = rc('ferad', {
	config: 'ferad.json',
	path: ['~']
})
const locate = Locate(options.config, options.path)
locate('test', console.log)
