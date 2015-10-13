import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import notifier from 'node-notifier'

function src({ src, cwd, plumber = false }) {
	return gulp.src(src, { cwd })
		.pipe(_.plumber({ errorHandler:
			plumber ? viewError : fail }))
}
function emit(o, stream) {
	return dest(o, stream)
		.pipe(_.connect.reload())
}
function dest({ dest, cwd }, stream) {
	return stream.pipe(gulp.dest(dest, { cwd }))
}

function fail(error) {
	console.error(error.toString())
	process.exit(1)
}
function logError(error) {
	viewError(error)
	this.emit('end')
}
function viewError(error) {
	_.util.log('[' + _.util.colors.red('ERROR') + ']', error.message)
	notifier.notify({ title: 'Error!', message: error.message })
}

const _ = plugins()
Object.assign(_, { src, emit, dest, fail, logError })
export default _
