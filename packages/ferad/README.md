# Ferad API
[![NPM version][npm-image]][npm-url]

For more information about Ferad visit [homepage].

## Install
```shell
npm install --save-dev ferad
```

## Usage
```javascript
var ferad = require('ferad');
var gulp = require('gulp');

ferad.task('copy', function(o) {
    return gulp.src(o.src)
        .pipe(gulp.dest(o.dest));
})
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

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/ferad
[npm-image]: https://img.shields.io/npm/v/ferad.svg

[homepage]: https://github.com/feradjs/ferad

[ferad.json]: http://

[gulp]: http://gulpjs.com/
[gulp task]: https://github.com/gulpjs/gulp/blob/master/docs/API.md
