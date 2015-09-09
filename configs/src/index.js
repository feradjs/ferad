
function defaults(env, app, cwd) {
	const { port, dest } = Object.assign({}, env, app)
	return [
		group('default', ['serve', 'watch']),
		defTask('serve', 'serve', {
			port, root: dest, livereload: true
		}),
		group('watch', ['watch-jade', 'watch-sass']),
		defTask('watch-jade', 'watch', {
			src: '**/*.jade', task: 'jade', cwd
		}, ['jade']),
		defTask('watch-sass', 'watch', {
			src: '*.{scss,css}', task: 'sass', cwd
		}, ['sass']),
		defTask('jade', 'jade', {
			src: '*.jade', dest, plumber: true, cwd
		}),
		defTask('sass', 'sass', {
			src: '*.{scss,css}', dest, plumber: true, cwd
		})
	]
}

function defTask(name, func, options, depends) {
	return task(name, 'ferad-tasks', func, options, depends)
}
function task(name, modul, func, options, depends = []) {
	return {
		name,
		modul,
		func,
		options,
		depends
	}
}
function group(name, depends) {
	return {
		name,
		depends,
		modul: 'ferad-utils',
		func: 'nop',
		options: {}
	}
}

export default {
	defaults, defTask, task, group
}
