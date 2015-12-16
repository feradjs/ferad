import gulp from 'gulp'
import run from 'run-sequence'
import shell from 'gulp-shell'

export default function define(funcs, tasks) {
	const func = {
		sequence({ tasks }, cb) {
			run.apply(null, tasks.concat([cb]))
		},
		task({ func, options }, cb) {
			return funcs[func](options, cb, gulp)
		},
		shell({ commands }) {
			return shell.task(commands)()
		}
	}
	tasks.forEach(task =>
		gulp.task(task.name, cb =>
			func[task.type](task, cb)
		)
	)
}
