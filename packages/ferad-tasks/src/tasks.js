import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import rsync from 'rsync'
import { handleError } from 'gulp-error-notifier'

const _ = plugins()


function src(o) {
	return gulp.src(o.src)
		.pipe(_.if(o.plumber, _.errorNotifier()))
}

function dest(o, stream) {
	return stream.pipe(gulp.dest(o.dest))
}

function bundler({ main, paths }) {
	return browserify(main, {
		paths,
		debug: true,
		verbose: true,
		cache: {},
		packageCache: {},
		fullPath: true
	}).transform(babelify.configure({
		presets: ['es2015', 'react']
	}))
}

module.exports = {
	copy: o => dest(o, src(o)),
	clean: o => del(o.dest, { force: true }),
	serve: o => require('live-server').start(o),
	watch(o, cb, gulp) {
		_.watch(o.src, () =>
			gulp.start(o.task)
		)
		cb()
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
	babel(o) {
		return dest(o, src(o)
			.pipe(_.changed(o.dest))
			.pipe(_.babel({ presets: ['es2015', 'react'] })))
	},
	script(o) {
		return _.dest(o, bundler(o).bundle()
			.pipe(source(o.output))
			.pipe(buffer())
			.pipe(_.uglify()))
	},
	scriptWatch(o) {
		const watch = watchify(bundler(o))
		function bundle() {
			return _.dest(o, handleError(watch.bundle())
				.pipe(source(o.output)))
		}
		watch.on('update', bundle)
		//watch.on('log', _.util.log)
		return bundle()
	},
	env(o, cb) {
		process.env[o.prop] = o.value
		cb()
	},
	log(o, cb) {
		console.log(o.message)
		cb()
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
