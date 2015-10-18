import gulp from 'gulp'
import run from 'run-sequence'
import shell from 'gulp-shell'
import tasks from 'ferad-tasks'

export default function define(tasks) {
	tasks.forEach(task =>
		gulp.task(task.name, cb =>
			func[task.type](task, cb)
		)
	)
}

const func = {
	sequence({ tasks }, cb) {
		run.apply(null, tasks.concat([cb]))
	},
	task({ func, options }, cb) {
		return tasks[func](options, cb, gulp)
	},
	shell({ commands }) {
		return shell.task(commands)()
	}
}
