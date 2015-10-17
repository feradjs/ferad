import _ from 'lodash'

export default function pipeline(command, config) {
	const sequence = removeWhitespaces(command).split('->')
	config = Object.assign({ ':default': {} }, config)
	return {
		sequence,
		tasks: sequence.map(getTask)
	}
	function getTask(command) {
		const [task, ...buckets] = command.split(':')
		buckets.unshift('default')
		const options = Object.assign.apply(null,
			_.flattenDeep([{}, getBuckets(buckets)])
		)
		return {
			name: command,
			func: config[task] || task,
			options
		}
		function getBuckets(names) {
			return names.map(name => {
				const bucket = config[':' + name]
				if (_.isUndefined(bucket))
					throw new Error(`No option bucket ":${name}" defined for "${task}" task!`)
				return _.isString(bucket) ?
					getBuckets(removeWhitespaces(bucket)
						.split(':').slice(1)) : bucket
			})
		}
	}
}

function removeWhitespaces(string) {
	return string.split(' ').join('')
}
