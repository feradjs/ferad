import gulp from 'gulp'
import rsync from 'rsync'

module.exports = {
	copy({ src, dest }) {
		return gulp.src(src)
			.pipe(gulp.dest(dest))
	},
	clean({ dest }) {
		return del(dest, { force: true })
	},
	serve(o) {
		require('live-server').start(o)
	},
	watch({ src, task }, cb, gulp) {
		_.watch(src, () =>
			gulp.start(task)
		)
	},
	rsync({ target, dest }, cb) {
		new Rsync()
			.archive()
			.delete()
			.compress()
			.progress()
			.source(dest + '/')
			.destination(target)
			.execute((error, code, cmd) => { cb(error) },
				data => console.log(data.toString('utf8'))
			)
	}
}
