
export default function pipeline(command, config) {
	const sequence = command
		.split(' ').join('').split('->')
	return {
		sequence,
		tasks: sequence.map(name => { return {
			name,
			func: name,
			options: config[':default'] || {}
		}})
	}
}
