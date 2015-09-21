import fs from 'fs'
import path from 'path'
import _ from './common'

export default {
	assets(o) {
		return _.emit(o, _.src(o))
	},
	jade(o) {
		return _.emit(o, _.src(o)
			.pipe(_.data((file) => {
				let data = null
				const { dir, name } = path.parse(file.path)
				try {
					data = fs.readFileSync(`${dir}/${name}.json`)
				} catch (error) {
				}
				return JSON.parse(data)
			}))
			.pipe(_.jade({ pretty: o.pretty })))
	},
	sass(o) {
		return _.emit(o, _.src(o)
			.pipe(_.sass())
			.on('error', _.logError))
	},
	sassProd(o) {
		return _.dest(o, _.src(o)
			.pipe(_.sass())
			.pipe(_.minifyCss()))
	}
}
