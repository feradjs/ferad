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
		gulp.start('compile')
	})
})

gulp.task('build', function(cb) {
	run('clean', 'compile', cb)
})

gulp.task('clean', function() {
	return del('packages/*/dist')
})

gulp.task('compile', function() {
	return gulp.src(scripts)
		.pipe(_.errorNotifier())
		.pipe(through.obj(function(file, enc, callback) {
			file.path = file.path.replace('src', 'dist')
			callback(null, file)
		}))
		.pipe(_.newer(dest))
		.pipe(_.babel({ presets: ['es2015'] }))
		.pipe(gulp.dest(dest))
})

gulp.task('test', function() {
	return gulp.src(tests, { read: false })
		.pipe(_.mocha())
})
