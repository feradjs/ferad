
export default function pipeline(command, config) {
	const sequence = command
		.split(' ').join('').split('->')
	return {
		sequence,
		tasks: sequence.map(name => {
			name,
			func: name,
			options: {}
		})
	}
}
