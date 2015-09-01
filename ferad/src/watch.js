import gulp from 'gulp'
import run from 'run-sequence'
import { build, misc } from 'ferad-tasks'

export default function watch(cwd, port) {
	gulp.task('default', ['serve', 'watch-jade'])
	gulp.task('serve', ()=> misc.serve({ port, root: 'dist/1', livereload: true }))
	gulp.task('watch-jade', ['jade'], ()=> gulp.watch('src/*.jade', { cwd }, ['jade']))
	gulp.task('jade', ()=> build.jade({ src: 'src/*.jade', dest: 'dist/1', cwd }))
	run('default')
}
