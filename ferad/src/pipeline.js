import _ from 'lodash'

export default function pipeline(command, config) {
	const sequence = parseSequence(command)
	const def = config[':default'] || {}
	return _.flattenDeep([
		{ type: 'sequence', name: 'default', tasks: sequence },
		_.flatten(sequence).map(getTask)
	])
	function getTask(command) {
		const [, task, scope = ''] = command.match(/^(.+?)(:.+)?$/)
		const sub = config[task]
		if (sub) {
			if (_.isArray(sub))
				return { type: 'shell', name: task, commands: sub }
			if (_.isString(sub)) {
				const sequence = parseSequence(sub, scope)
				return [
					{ type: 'sequence', name: command, tasks: sequence },
					_.flatten(sequence).map(getTask)
				]
			}
		}
		const options = Object.assign.apply(null,
			_.flattenDeep([{}, def, sub, getBuckets(scope)])
		)
		return { type: 'task', name: command, func: task, options }
		function getBuckets(scope) {
			const names = scope.split(':').slice(1)
			return names.map(name => {
				const bucket = config[':' + name]
				if (_.isUndefined(bucket))
					throw new Error(`No option bucket ":${name}" defined for "${task}" task!`)
				return _.isString(bucket) ?
					getBuckets(removeWhitespaces(bucket)) : bucket
			})
		}
	}
}

function parseSequence(command, scope = '') {
	return removeWhitespaces(command)
		.split('->').map(command => {
			const seq = command.split(',')
				.map(command => command + scope)
			return seq.length == 1 ? seq[0] : seq
		})
}

function removeWhitespaces(string) {
	return string.split(' ').join('')
}
