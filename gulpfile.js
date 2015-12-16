var gulp = require('gulp')
var through = require('through2')
var _ = require('gulp-load-plugins')()

var dest = 'packages'
var scripts = 'packages/*/src/**/*.js'

gulp.task('default', ['compile'], function() {
	_.watch(scripts, function() {
		gulp.start('compile')
	})
})

gulp.task('compile', function() {
	gulp.src(scripts)
		.pipe(_.errorNotifier())
		.pipe(through.obj(function(file, enc, callback) {
			file.path = file.path.replace('src', 'dist')
			callback(null, file)
		}))
		.pipe(_.newer(dest))
		.pipe(_.babel())
		.pipe(gulp.dest(dest))

})
