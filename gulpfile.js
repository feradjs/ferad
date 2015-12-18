require('babel-register')

var gulp = require('gulp')
var run = require('run-sequence')
var through = require('through2')
var _ = require('gulp-load-plugins')()
var del = require('del')

var dest = 'packages'
var scripts = 'packages/*/src/**/*.js'
var tests = 'packages/*/test/**/*.js'


gulp.task('default', ['build'], function() {
	_.watch([scripts, tests], function() {
		gulp.start('test')
	})
})

gulp.task('build', function(cb) {
	run('clean', 'compile', cb)
})

var compiled = false
gulp.task('compile', function() {
	compiled = true
	return gulp.src(scripts)
		.pipe(_.errorNotifier())
		.pipe(_.plumber({
			errorHandler: function(error) {
				_.errorNotifier.notify(error)
				compiled = false
			}
		}))
		.pipe(through.obj(function(file, enc, callback) {
			file.path = file.path.replace('src', 'dist')
			callback(null, file)
		}))
		.pipe(_.newer(dest))
		.pipe(_.babel({ presets: ['es2015'] }))
		.pipe(gulp.dest(dest))
})

gulp.task('test', ['compile'], function() {
	if (!compiled) return
	return gulp.src(tests, { read: false })
		.pipe(_.errorNotifier())
		.pipe(_.mocha({
			reporter: 'min'
		}))
})

gulp.task('clean', function() {
	return del('packages/*/dist')
})
