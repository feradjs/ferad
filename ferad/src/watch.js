import gulp from 'gulp'
import { build, misc } from 'ferad-tasks'

export default function watch(cwd, port) {
	gulp.task('default', ['serve', 'watch-jade'])
	gulp.task('serve', ()=> misc.serve({ port, root: 'target/1', livereload: true }))
	gulp.task('watch-jade', ['jade'], ()=> gulp.watch('src/*.jade', { cwd }, ['jade']))
	gulp.task('jade', ()=> build.jade({ src: 'src/*.jade', dest: 'target/1', cwd }))
	gulp.start('default')
}
