import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import rsync from 'rsync'

const _ = plugins()


function src(o) {
	return gulp.src(o.src)
		.pipe(_.if(o.plumber, _.errorNotifier()))
}

function dest(o, stream) {
	return stream.pipe(gulp.dest(o.dest))
}

module.exports = {
	copy: o => dest(o, src(o)),
	clean: o => del(o.dest, { force: true }),
	serve: o => require('live-server').start(o),
	watch(o, cb, gulp) {
		_.watch(o.src, () =>
			gulp.start(o.task)
		)
	},
	jade(o) {
		return dest(o, src(o)
			.pipe(_.data(() => o.locals))
			.pipe(_.jade({ pretty: o.pretty })))
	},
	sass(o) {
		return dest(o, src(o)
			.pipe(_.sass())
			.pipe(_.autoprefixer()))
	},
	sassProd(o) {
		return dest(o, src(o)
			.pipe(_.sass())
			.pipe(_.autoprefixer())
			.pipe(_.minifyCss()))
	},
	rsync(o, cb) {
		new Rsync()
			.archive()
			.delete()
			.compress()
			.progress()
			.source(o.dest + '/')
			.destination(o.target)
			.execute((error, code, cmd) => { cb(error) },
				data => console.log(data.toString('utf8'))
			)
	}
}
