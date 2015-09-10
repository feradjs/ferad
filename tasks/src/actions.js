import gulp from 'gulp'
import _ from './commons'

export default {
	serve(o) {
		_.connect.server(o)
	},
	watch({ src, task, cwd }, gulp) {
		_.watch(src, { cwd }, _.batch(
			(events, done) => gulp.start(task, done)
		))
	},
	prod() {
		process.env.NODE_ENV = 'production'
	}
}
