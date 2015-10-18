import _ from 'lodash'

export default function pipeline(command, config) {
	const sequence = parseSequence(command)
	const def = config[':default'] || {}
	return _.flattenDeep([
		{ type: 'sequence', name: 'default', tasks: sequence },
		sequence.map(getTask)
	])
	function getTask(command) {
		const [, task, scope = ''] = command.match(/^(.+?)(:.+)?$/)
		const sub = config[task]
		if (sub) {
			if (_.isArray(sub))
				return { type: 'shell', name: task, commands: sub }
			if (_.isString(sub)) {
				const sequence = parseSequence(sub)
					.map(command => command + scope)
				return [
					{ type: 'sequence', name: command, tasks: sequence },
					sequence.map(getTask)
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

function parseSequence(command) {
	return removeWhitespaces(command).split('->')
}

function removeWhitespaces(string) {
	return string.split(' ').join('')
}
