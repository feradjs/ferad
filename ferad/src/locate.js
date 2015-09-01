import { exec } from 'child_process'

export default function Locate(config, dirs) {
	const path = dirs.join(' ')
	return (name, cb) => {
		exec(`find ${path} -ipath "*/${name}/${config}"`,
			(error, stdout) => cb(stdout.trim().split('\n')
				.map((path) => path.slice(0, -config.length))
			)
		)
	}
}
