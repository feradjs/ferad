import gulp from 'gulp'

export default function execute(tasks) {
	tasks.forEach(({ name, modul, func, options, depends }) =>
		gulp.task(name, depends, () =>
			require(modul)[func](options)
		)
	)
	gulp.start('default')
}
