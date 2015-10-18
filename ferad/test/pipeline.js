import { deepEqual, throws } from 'assert'
import pipeline from '../dist/pipeline'

describe('pipeline', () => {
	test('empty config',
		'a', {
		}, ['a'], [
			task('a', 'a')
		]
	)
	describe('commands', () => {
		test('simple options',
			'a:1 -> b:2', {
				':1': { x: 1 },
				':2': { y: 2 }
			}, ['a:1', 'b:2'], [
				task('a:1', 'a', { x: 1 }),
				task('b:2', 'b', { y: 2 })
			]
		)
		test('basic definition',
			'a', {
				'a': 'task'
			}, ['a'], [
				seq('a', 'task'),
				task('task', 'task')
			]
		)
		test('basic whitespace option definition',
			'a', {
				':1': { value: 1 },
				'a': 'task : 1'
			}, ['a'], [
				seq('a', 'task:1'),
				task('task:1', 'task', { value: 1 })
			]
		)
		test('basic nested definition',
			'a:1', {
				':1': { x: 1 },
				':2': { y: 2 },
				':3': { z: 3 },
				'a': 'b:2',
				'b': 'c:3'
			}, ['a:1'], [
				seq('a:1', 'b:2:1'),
				seq('b:2:1', 'c:3:2:1'),
				task('c:3:2:1', 'c', { x: 1, y: 2, z: 3 })
			]
		)
		test('multiple with whitespaces',
			'a:1 -> c:2', {
				':1': { x: 1 },
				':2': { y: 2 },
				':3': { z: 3 },
				'a': 'b -> c:2 ',
				'c': 'd:3'
			}, ['a:1', 'c:2'], [
				seq('a:1', 'b:1', 'c:2:1'),
				task('b:1', 'b', { x: 1 }),
				seq('c:2:1', 'd:3:2:1'),
				task('d:3:2:1', 'd', { x: 1, y: 2, z: 3 }),
				seq('c:2', 'd:3:2'),
				task('d:3:2', 'd', { y: 2, z: 3 })
			]
		)
		test('shell',
			'a', {
				'a': ['one', 'two']
			}, ['a'], [
				shell('a', 'one', 'two')
			]
		)
		test('task options',
			'a', {
				'a': { value: 1 }
			}, ['a'], [
				task('a', 'a', { value: 1 })
			]
		)
		test('defaulted task options',
			'a', {
				':default': { x: 1 },
				'a': { x: 2 }
			}, ['a'], [
				task('a', 'a', { x: 2 })
			]
		)
		// TODO: Shared options
		// TODO: Unused options
		// TODO: Overlapping options
		// TODO: Errors for undefined tasks
	})
	describe('options', () => {
		testOptions('default',
			'', {
				':default': { value: 0 }
			}, { value: 0 }
		)
		testOptions('single',
			':1', {
				':1': { value: 1 },
			}, { value: 1 }
		)
		testOptions('defaulted',
			':1', {
				':default': { x: 0, y: 0 },
				':1': { x: 1},
			}, { x: 1, y: 0 }
		)
		testOptions('multiple',
			':1:2:3', {
				':1': { x: 1, y: 1, z: 1 },
				':2': { x: 2, y: 2 },
				':3': { x: 3 }
			}, { x: 3, y: 2, z: 1 }
		)
		testOptions('alias',
			':x', {
				':x': ':y',
				':y': { value: 1 },
			}, { value: 1 }
		)
		testOptions('group',
			':g', {
				':1': { x: 1, y: 1 },
				':2': { x: 2 },
				':g': ':1:2'
			}, { x: 2, y: 1 }
		)
		testOptions('group whitespaces',
			':g', {
				':1': { x: 1 },
				':2': { y: 1 },
				':g': ' :1 :2 '
			}, { x: 1, y: 1 }
		)
		testOptions('nested group',
			':g', {
				':1': { x: 1 },
				':2': { y: 2 },
				':3': { z: 3 },
				':j': ':1:2',
				':g': ':j:3'
			}, { x: 1, y: 2, z: 3 }
		)
		it('undefined', () => {
			throws(() => pipeline('a:1', {}),
				/No option bucket ":1" defined for "a" task!/
			)
		})
	})
})

function testOptions(name, options, config, result) {
	const command = 'task' + options
	test(name, command, config, [command],
		[task(command, 'task', result)]
	)
}

function test(name, command, config, sequence, tasks) {
	tasks.unshift(seq('default', ...sequence))
	it(name, () => deepEqual(
		pipeline(command, config), tasks
	))
}

function seq(name, ...tasks) {
	return { type: 'sequence', name, tasks }
}

function task(name, func, options = {}) {
	return { type: 'task', name, func, options }
}

function shell(name, ...commands) {
	return { type: 'shell', name, commands }
}
