
function defaults(env, app, cwd) {
	const { port, assets, dest } = Object.assign({}, env, app)
	return [
		group('default', ['serve', 'watch']),
		defTask('serve', 'serve', {
			port, root: dest, livereload: true
		}),
		group('watch', ['watch-assets', 'watch-jade', 'watch-sass', 'watch-scripts']),
		defTask('watch-assets', 'watch', {
			src: assets, task: 'assets', cwd
		}),
		defTask('watch-jade', 'watch', {
			src: '**/*.jade', task: 'jade', cwd
		}, ['jade']),
		defTask('watch-sass', 'watch', {
			src: '*.{scss,css}', task: 'sass', cwd
		}, ['sass']),
		defTask('watch-scripts', 'scriptWatch', {
			main: 'main.js', output: 'app.js', paths: [], dest, cwd
		}),
		defTask('assets', 'assets', {
			src: assets, dest, cwd
		}),
		defTask('jade', 'jade', {
			src: '*.jade', plumber: true, dest, cwd
		}),
		defTask('sass', 'sass', {
			src: '*.{scss,css}', plumber: true, dest, cwd
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
