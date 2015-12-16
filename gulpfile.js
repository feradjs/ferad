var gulp = require('gulp')
var through = require('through2')
var _ = require('gulp-load-plugins')()

var dest = 'packages'
var scripts = 'packages/*/src/**/*.js'
var tests = 'packages/*/test/**/*.js'

gulp.task('default', ['compile'], function() {
	_.watch([scripts, tests], function() {
		gulp.start('compile')
	})
})

gulp.task('compile', function() {
	return gulp.src(scripts)
		.pipe(_.errorNotifier())
		.pipe(through.obj(function(file, enc, callback) {
			file.path = file.path.replace('src', 'dist')
			callback(null, file)
		}))
		// TODO: clean on first run
		.pipe(_.newer(dest))
		.pipe(_.babel({ presets: ['es2015'] }))
		.pipe(gulp.dest(dest))

})

gulp.task('test', function() {
	return gulp.src('packages/*/dist-test/**/*.js')
		.pipe(_.babel({ presets: ['es2015'] }))
		.pipe(_.mocha())
})
