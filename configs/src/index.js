import glob from 'glob'
import homedir from 'os-homedir'
import { Seq } from 'immutable'

function defaults(env, app, cwd) {
	const config = Object.assign({}, env, app)
	config.dest = config.dest || (homedir() + '/.ferad/dist')
	const { port, serveRoot, dest, assets, jadeLocals: locals } = config
	return [
		group('default', ['serve', 'watch']),
		defTask('serve', 'serve', {
			port, root: serveRoot || dest, livereload: true
		}),
		group('build', ['assets-prod', 'jade-prod', 'sass-prod', 'scripts']),
		defTask('prod', 'env', {
			prop: 'NODE_ENV', value: 'production'
		}, ['clean']),
		defTask('clean', 'clean', {
			dest, cwd
		}),
		group('watch', ['watch-assets', 'watch-jade', 'watch-sass', 'watch-scripts']),
		defTask('watch-assets', 'watch', {
			src: assets, task: 'assets', cwd
		}, ['assets']),
		defTask('watch-jade', 'watch', {
			src: ['**/*.jade', '*.json'], task: 'jade', cwd
		}, ['jade']),
		defTask('watch-sass', 'watch', {
			src: '**/*.{sass,scss}', task: 'sass', cwd
		}, ['sass']),
		defTask('assets-prod', 'assets', {
			src: assets, dest, cwd
		}, ['prod']),
		defTask('assets', 'assets', {
			src: assets, dest, cwd
		}),
		defTask('jade-prod', 'jade', resource('jade', { plumber: false, locals }), ['prod']),
		defTask('jade', 'jade', resource('jade', { plumber: true, locals })),
		defTask('sass-prod', 'sassProd', resource('{sass,scss}'), ['prod']),
		defTask('sass', 'sass', resource('{sass,scss}', { plumber: true })),
		defTask('sync', 'rsync', {
			target: config.sync, dest, cwd
		}),
		defTask('deploy', 'rsync', {
			target: config.deploy, dest, cwd
		}, ['build'])
	].concat(
		scripts('script', '', ['prod'], config, cwd),
		scripts('scriptWatch', 'watch-', [], config, cwd)
	)
	function resource(ext, options) {
		return Object.assign({
			src: ['[^_]*.' + ext, '**/[^_]**/[^_]*.' + ext],
			dest, cwd
		}, options)
	}
}

function scripts(func, prefix, depends, { scripts, paths, dest }, cwd) {
	if (!scripts) {
		scripts = Seq(glob.sync('*.js', { cwd }))
			.toSetSeq().toObject()
	}
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
