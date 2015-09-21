import gulp from 'gulp'
import plugins from 'gulp-load-plugins'

function src({ src, cwd, plumber = false }) {
	return gulp.src(src, { cwd })
		.pipe(_.plumber(plumber ?
			null : { errorHandler: fail }))
}
function emit(o, stream) {
	return dest(o, stream)
		.pipe(_.connect.reload())
}
function dest({ dest }, stream) {
	return stream.pipe(gulp.dest(dest))
}

function fail(error) {
	console.error(error.toString())
	process.exit(1)
}
function logError(error) {
	_.util.log('[' + _.util.colors.red('ERROR') + ']', error.message)
	this.emit('end')
}

const _ = plugins()
Object.assign(_, { src, emit, dest, fail, logError })
export default _
