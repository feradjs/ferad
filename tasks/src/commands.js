import gulp from 'gulp'
import del from 'del'
import Rsync from 'rsync'
import mustache from 'mustache'
import fs from 'fs'
import _ from './common'

mustache.escape = data => data

export default {
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
	},
	template(data, cb) {
		const path = require.resolve('../templates/' + data.name)
		const template = fs.readFileSync(path, { encoding: 'utf8' })
		const output = mustache.render(template, data)
		fs.writeFile(data.name, output, cb)
	}
}
