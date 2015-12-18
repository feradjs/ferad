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
        .pipe(sass(o))
        .pipe(ferad.dest(o));
});
```

## API

### ferad.task(name, func)
Register a Ferad task.

`func` should take form of `function(options, callback)` and return a [Gulp task].
* `options` - Options passed to the task as defined in [package.json]
* `callback` - Optional callback for tasks which don't return streams or promises

### ferad.task(name)
Return registered Ferad task.

### ferad.tasks(tasks)
Register multiple tasks from `tasks` object parameter.

### ferad.tasks()
Return all registered Ferad tasks.

### ferad.src(options)
Analogue of [`gulp.src`].

### ferad.dest(options)
Analogue of [`gulp.dest`].

### ferad.start(task)
Analogue of [`gulp.start`].

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/ferad
[npm-image]: https://img.shields.io/npm/v/ferad.svg

[gitter-url]: https://gitter.im/feradjs/ferad
[gitter-image]: https://badges.gitter.im/feradjs/ferad.png

[homepage]: https://github.com/feradjs/ferad

[package.json]: https://github.com/feradjs/ferad/docs/SYNTAX.md

[gulp task]: https://github.com/gulpjs/gulp/blob/master/docs/API.md
[`gulp.src`]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrc
[`gulp.dest`]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdest
[`gulp.start`]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpstart
[watching]: https://npmjs.org/package/gulp-watch
