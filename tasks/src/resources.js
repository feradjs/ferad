import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import u from 'ferad-utils'
const _ = plugins()

function src({ src, cwd, plumber = false }) {
	return (plumber ? plumb : u.id)
		(gulp.src(src, { cwd }))
}
function plumb(stream) {
	return stream.pipe(_.plumber())
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
	},
	sass(o) {
		return emit(o, src(o).pipe(_.sass())
			.pipe(_.minifyCss()))
	}
}
