import _ from 'lodash'

export default function pipeline(command, config) {
	const sequence = removeWhitespaces(command).split('->')
	config = Object.assign({ ':default': {} }, config)
	return {
		sequence,
		tasks: sequence.map(task => {
			const [func, ...buckets] = task.split(':')
			function getBuckets(names) {
				return names.map(name => {
					const bucket = config[':' + name]
					if (_.isUndefined(bucket))
						throw new Error(`No option bucket ":${name}" defined for "${func}" task!`)
					return _.isString(bucket) ?
						getBuckets(removeWhitespaces(bucket)
							.split(':').slice(1)) : bucket
				})
			}
			buckets.unshift('default')
			const options = Object.assign.apply(null,
				_.flattenDeep(getBuckets(buckets))
			)
			return { name: task, func, options }
		})
	}
}

function removeWhitespaces(string) {
	return string.split(' ').join('')
}
