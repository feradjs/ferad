import gulp from 'gulp'
import { build, misc } from 'ferad-tasks'

export default function watch(cwd, port) {
	gulp.task('default', ['serve', 'watch'])
	gulp.task('serve', ()=> misc.serve({ port, root: 'target/1', livereload: true }))
	gulp.task('watch', ['watch-jade', 'watch-sass'])
	gulp.task('watch-jade', ['jade'], ()=> gulp.watch('**/*.jade', { cwd }, ['jade']))
	gulp.task('watch-sass', ['sass'], ()=> gulp.watch('*.{scss,css}', { cwd }, ['sass']))
	gulp.task('jade', ()=> build.jade({ src: '*.jade', dest: 'target/1', plumber: true, cwd, }))
	gulp.task('sass', ()=> build.sass({ src: '*.{scss,css}', dest: 'target/1', plumber: true, cwd}))
	gulp.start('default')
}
