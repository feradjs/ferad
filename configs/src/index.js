
function defaults({ port }, app, cwd) {
	return [
		group('default', ['serve', 'watch']),
		defTask('serve', 'serve', {
			port, root: 'target/1', livereload: true
		}),
		group('watch', ['watch-jade', 'watch-sass']),
		defTask('watch-jade', 'watch', {
			src: '**/*.jade', tasks: ['jade'], cwd
		}, ['jade']),
		defTask('watch-sass', 'watch', {
			src: '*.{scss,css}', tasks: ['sass'], cwd
		}, ['sass']),
		defTask('jade', 'jade', {
			src: '*.jade', dest: 'target/1', plumber: true, cwd
		}),
		defTask('sass', 'sass', {
			src: '*.{scss,css}', dest: 'target/1', plumber: true, cwd
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
