import _ from './common'

export default {
	assets(o) {
		return _.emit(o, _.src(o))
	},
	jade(o) {
		return _.emit(o, _.src(o)
			.pipe(_.jade()))
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
