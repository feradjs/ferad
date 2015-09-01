#!/usr/bin/env node

import Locate from './locate'

const locate = Locate('ferad.json', ['~'])
locate('test', console.warn, console.log)
