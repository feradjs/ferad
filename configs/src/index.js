import { Seq } from 'immutable'

function defaults(env, app, cwd) {
	const config = Object.assign({}, env, app)
	const { port, assets, dest } = config
	return [
		group('default', ['serve', 'watch']),
		defTask('serve', 'serve', {
			port, root: dest, livereload: true
		}),
		group('build', ['assets', 'jade-prod', 'sass-prod', 'scripts']),
		defTask('prod', 'env', {
			prop: 'NODE_ENV', value: 'production'
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
		defTask('jade-prod', 'jade', {
			src: '*.jade', plumber: false, dest, cwd
		}),
		defTask('jade', 'jade', {
			src: '*.jade', plumber: true, dest, cwd
		}),
		defTask('sass-prod', 'sassProd', {
			src: '*.{scss,css}', dest, cwd
		}),
		defTask('sass', 'sass', {
			src: '*.{scss,css}', dest, cwd
		})
	].concat(
		scripts('script', '', ['prod'], config, cwd),
		scripts('scriptWatch', 'watch-', [], config, cwd)
	)
}

function scripts(func, prefix, depends, { scripts, paths, dest }, cwd) {
	const tasks = Seq(scripts)
		.mapEntries(([main, output]) => [
			prefix + main,
			defTask(prefix + main, func, {
				main, output, paths, dest, cwd
			}, depends)
		])
	return tasks.toArray().concat([
		group(prefix + 'scripts', tasks.keySeq().toArray())
	])
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
	defaults, scripts, defTask, task, group, emptyTask
}
