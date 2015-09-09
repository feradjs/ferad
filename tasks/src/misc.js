import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
const _ = plugins()

export default {
	serve(o) {
		_.connect.server(o)
	},
	watch({ src, task, cwd }, gulp) {
		_.watch(src, { cwd }, _.batch(
			(events, done) => gulp.start(task, done)
		))
	}
}
