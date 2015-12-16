import gulp from 'gulp'
import del from 'del'
import Rsync from 'rsync'
import fs from 'fs'
import _ from './common'

export default {
	// TODO: copy task
	// TODO: del + mkdir
	clean({ dest }, cb) {
		del(dest, { force: true })
			.then(() => cb())
	},
	// TODO #67: use dest option instead of root
	serve(o) {
		_.connect.server(o)
	},
	watch({ src, task }, cb, gulp) {
		_.watch(src, ({ path }) => {
			console.log(path)
			gulp.start(task)
		})
		cb()
	},
	rsync({ target, dest }, cb) {
		new Rsync()
			.archive()
			.delete()
			.compress()
			.progress()
			.source(dest + '/')
			.destination(target)
			.execute((error, code, cmd) => { cb(error) },
				data => console.log(data.toString('utf8'))
			)
	}
}
