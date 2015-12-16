import fs from 'fs'
import path from 'path'
import _ from './common'

export default {
	assets(o) {
		return _.emit(o, _.src(o))
	},
	jade(o) {
		var locals = {}
		try {
			locals = JSON.parse(
				fs.readFileSync(o.locals)
			)
		} catch (error) {}
		return _.emit(o, _.src(o)
			.pipe(_.data(() => locals))
			.pipe(_.jade({ pretty: o.pretty })))
	},
	sass(o) {
		return _.emit(o, _.src(o)
			.pipe(_.sass())
			.pipe(_.autoprefixer())
			.on('error', _.logError))
	},
	sassProd(o) {
		return _.dest(o, _.src(o)
			.pipe(_.sass())
			.pipe(_.autoprefixer())
			.pipe(_.minifyCss()))
	}
}
