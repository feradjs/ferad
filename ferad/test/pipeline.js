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
		test('defaulted',
			'a:1', {
				':default': { x: 0, y: 0 },
				':1': { x: 1},
			}, ['a:1'], [
				task('a:1', 'a', { x: 1, y: 0 })
			]
		)
		test('multiple',
			'a:1:2:3', {
				':1': { x: 1, y: 1, z: 1 },
				':2': { x: 2, y: 2 },
				':3': { x: 3 }
			}, ['a:1:2:3'], [
				task('a:1:2:3', 'a', { x: 3, y: 2, z: 1 })
			]
		)
		// Nested
		// Error
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
