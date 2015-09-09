import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
const _ = plugins()

export default {
	serve(o) {
		_.connect.server(o)
	},
	watch({ src, tasks, cwd }) {
		gulp.watch(src, { cwd }, tasks)
	}
}
