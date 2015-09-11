
export default {
	nop() {},
	id: (x) => x,
	normalize(val, def) {
		return val == null ? def : val
	},
	callback(ecb, cb) {
		return (error, ...args) => {
			if (error) {
				ecb(error)
			} else {
				cb.apply(null, args)
			}
		}
	}
}
