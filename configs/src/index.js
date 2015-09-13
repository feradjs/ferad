
function defaults(env, app, cwd) {
	const config = Object.assign({}, env, app)
	const { port, assets, dest } = config
	return [
		group('default', ['serve', 'watch']),
		defTask('serve', 'serve', {
			port, root: dest, livereload: true
		}),
		group('watch', ['watch-assets', 'watch-jade', 'watch-sass', 'watch-scripts']),
		defTask('watch-assets', 'watch', {
			src: assets, task: 'assets', cwd
		}, ['assets']),
		defTask('watch-jade', 'watch', {
			src: '**/*.jade', task: 'jade', cwd
		}, ['jade']),
		defTask('watch-sass', 'watch', {
			src: '*.{scss,css}', task: 'sass', cwd
		}, ['sass']),
		defTask('assets', 'assets', {
			src: assets, dest, cwd
		}),
		defTask('jade', 'jade', {
			src: '*.jade', plumber: true, dest, cwd
		}),
		defTask('sass', 'sass', {
			src: '*.{scss,css}', plumber: true, dest, cwd
		})
	].concat(
		watchScripts(config, cwd)
	)
}

function watchScripts({ scripts, paths, dest }, cwd) {
	const tasks = []
	for (let script in scripts) {
		tasks.push(defTask('watch-' + script, 'scriptWatch', {
			main: script, output: scripts[script], paths, dest, cwd
		}))
	}
	tasks.push(group('watch-scripts', tasks.map(task => task.name)))
	return tasks
}

function defTask(name, func, options, depends) {
	return task(name, 'ferad-tasks', func, options, depends)
}
function task(name, modul, func, options, depends = []) {
	return { name, modul, func, options, depends }
}
function group(name, depends) {
	return {
		name, modul: 'ferad-configs', func: 'emptyTask',
		options: {}, depends
	}
}
function emptyTask(o, cb) {
	cb()
}

export default {
	defaults, watchScripts, defTask, task, group, emptyTask
}
