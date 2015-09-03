
export default {
	nop() {},
	id: (x) => x,
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
