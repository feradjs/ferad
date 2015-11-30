import _ from 'lodash'

export default function pipeline(command, config) {
	const def = config[':default'] || {}
	return _.flattenDeep(getCommand('default', command))

	function getCommand(name, command, scope = '') {
		const tasks = parseSequence(command, scope)
		return [
			{ type: 'sequence', name, tasks },
			_.flatten(tasks).map(getTask)
		]
	}
	function getTask(command) {
		const [, task, scope = ''] = command.match(/^(.+?)(:.+)?$/)
		const sub = config[task]
		if (sub) {
			if (_.isArray(sub))
				return { type: 'shell', name: task, commands: sub }
			if (_.isString(sub))
				return getCommand(command, sub, scope)
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
	function parseSequence(command, scope) {
		return removeWhitespaces(escapeShell(command))
			.split('->').map(command => {
				const seq = command.split(',')
					.map(command => command.charCodeAt(0) == 0 ?
						inlineShell(command) :
						command + scope)
				return seq.length == 1 ? seq[0] : seq
			})
	}
	function inlineShell(command) {
		command = unescape(command.slice(1))
		config[command] = [command]
		return command
	}
}

function removeWhitespaces(string) {
	return string.split(' ').join('')
}
function escapeShell(command) {
	return command.replace(/\[\s*(.+)\s*\]/g,
		(match, inline) => '\x00' + escape(inline))
}
function escape(command) {
	return command
		.replace('->', '\x01')
		.replace(',', '\x02')
		.replace(' ', '\x03')
}

function unescape(command) {
	return command
		.replace('\x01', '->')
		.replace('\x02', ',')
		.replace('\x03', ' ')
}
