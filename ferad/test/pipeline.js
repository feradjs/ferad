import { deepEqual } from 'assert'
import pipeline from '../src/pipeline'

describe('pipeline', () => {
	test('empty config',
		'a -> b', {
		}, ['a', 'b'], [
			task('a', 'a'),
			task('b', 'b')
		]
	)
	test('default options',
		'a', {
			':default': { value: 1 }
		}, ['a'], [
			task('a', 'a', { value: 1 })
		]
	)
})

function test(name, command, config, sequence, tasks) {
	it(name, () => deepEqual(
		pipeline(command, config),
		{ sequence, tasks }
	))
}

function task(name, func, options = {}) {
	return { name, func, options }
}
