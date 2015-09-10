import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import _ from './common'

function bundler({ main, paths }) {
	return browserify(main, {
		paths,
		debug: true,
		verbose: true,
		cache: {},
		packageCache: {},
		fullPath: true
	}).transform(babelify.configure({
		stage: 0
	}))
}

export default {
	script(o) {
		return _.dest(o, bundler(o).bundle()
			.pipe(source(o.output))
			.pipe(buffer())
			.pipe(_.uglify()))
	},
	scriptWatch(o) {
		const watch = watchify(bundler(o))
		function bundle() {
			return _.emit(o, watch.bundle()
				.on('error', _.logError)
				.pipe(source(o.output)))
		}
		watch.on('update', bundle)
		watch.on('log', _.util.log)
		return bundle()
	}
}
