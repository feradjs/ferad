import rc from 'rc'
import json from 'jsonfile'
import execute from './execute'

export default function ferad() {
	const env = rc('ferad', require('../../ferad-old.json'))
	const app = json.readFileSync(env.appConfig, { throws: false })
	const configurator = require(env.configurator)
	const tasks = configurator(env, app)
	const task = env._[0] || 'default'
	execute(task, tasks)
}
