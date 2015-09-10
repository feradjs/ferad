import gulp from 'gulp'

export default function execute(tasks) {
	tasks.forEach(({ name, modul, func, options, depends }) =>
		gulp.task(name, depends, (cb) =>
			require(modul)[func](options, cb, gulp)
		)
	)
	gulp.start('default')
}
