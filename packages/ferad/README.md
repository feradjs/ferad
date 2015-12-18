# Ferad API
[![NPM version][npm-image]][npm-url]
[![Gitter chat][gitter-image]][gitter-url]

For general information about Ferad visit the [homepage].

## Install
```shell
npm install --save-dev ferad
```

## Usage
```javascript
var ferad = require('ferad');
var sass = require('gulp-sass');

ferad.task('sass', function(o) {
    return ferad.src(o)
        .pipe(sass())
        .pipe(ferad.dest(o));
});
```

## API

### ferad.task(name, func)
Registers Ferad task.

`func` takes form of `function(options, callback, gulp)` and returns [Gulp task].
* `options` - Options passed as defined in [ferad.json]
* `callback` - A callback for asynchronous Gulp tasks
* `gulp` - instance of Gulp used by ferad

### ferad.task(name)
Return registered Ferad task.

### ferad.tasks(tasks)
Register multiple tasks from `tasks` object parameter.

### ferad.tasks()
Return all current Ferad tasks.

### ferad.src(options)
Analogue of [`gulp.src`].

### ferad.dest(options)
Analogue of [`gulp.dest`].

### ferad.start(task)
Analogue of [`gulp.start`]. Useful for [watching] tasks.

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/ferad
[npm-image]: https://img.shields.io/npm/v/ferad.svg

[gitter-url]: https://gitter.im/feradjs/ferad
[gitter-image]: https://badges.gitter.im/feradjs/ferad.png

[homepage]: https://github.com/feradjs/ferad
[ferad.json]: http://

[`gulp.src`]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrc
[`gulp.dest`]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdest
[`gulp.start`]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpstart
[watching]: https://npmjs.org/package/gulp-watch

[gulp]: http://gulpjs.com/
[gulp task]: https://github.com/gulpjs/gulp/blob/master/docs/API.md
