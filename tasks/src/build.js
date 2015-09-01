import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
const _ = plugins()

function src({ src, cwd }) {
	return gulp.src(src, { cwd })
}
function emit(o, stream) {
	return dest(o, stream)
		.pipe(_.connect.reload())
}
function dest({ dest }, stream) {
	return stream.pipe(gulp.dest(dest))
}

export default {
	jade(o) {
		return emit(o, src(o).pipe(_.jade()))
	}
}
