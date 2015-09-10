import _ from './common'

export default {
	jade(o) {
		return _.emit(o, _.src(o)
			.pipe(_.jade()))
	},
	sass(o) {
		return _.emit(o, _.src(o)
			.pipe(_.sass())
			.pipe(_.minifyCss()))
	}
}
