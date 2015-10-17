import gulp from 'gulp'

export default function execute(task, tasks) {
	tasks.forEach(({ name, modul, func, options, depends }) =>
		gulp.task(name, depends, (cb) =>
			require(modul)[func](options, cb, gulp)
		)
	)
	gulp.start(task)
}
