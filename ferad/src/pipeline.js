
export default function pipeline(command, config) {
	const sequence = command
		.split(' ').join('').split('->')
	return {
		sequence,
		tasks: sequence.map((task) => {
			const [func, ...options] = task.split(':')
			return {
				name: task, func,
				options: config[':' + options[0]] || config[':default'] || {}
			}
		})
	}
}
