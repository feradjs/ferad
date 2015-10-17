
export default function pipeline(command, config) {
	const sequence = command
		.split(' ').join('').split('->')
	config = Object.assign({ ':default': {} }, config)
	return {
		sequence,
		tasks: sequence.map(task => {
			const [func, ...buckets] = task.split(':')
			buckets.unshift('default')
			const options = Object.assign.apply(null,
				buckets.map(bucket => config[':' + bucket])
			)
			return { name: task, func, options }
		})
	}
}
