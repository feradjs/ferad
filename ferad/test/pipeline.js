import { deepEqual } from 'assert'
import pipeline from '../dist/pipeline'

describe('pipeline', () => {
	test('empty config',
		'a -> b', {
		}, ['a', 'b'], [
			task('a', 'a'),
			task('b', 'b')
		]
	)
	describe('options', () => {
		test('default',
			'a', {
				':default': { value: 0 }
			}, ['a'], [
				task('a', 'a', { value: 0 })
			]
		)
		test('single',
			'a:1', {
				':1': { value: 1 },
			}, ['a:1'], [
				task('a:1', 'a', { value: 1 })
			]
		)
	})
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
