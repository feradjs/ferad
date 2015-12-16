# Ferad
[![NPM version][npm-image]][npm-url]

Gulp Frontend

Ferad takes care of managing configuration. Ferad makes easy to reuse, distribute, compose gulp tasks and projects. Ferad treats configuration as first-class citizen.

### Differences from Gulp
- Ferad tasks accept options.
- Ferad uses declarative task configuration syntax with powerful options handling.
- Ferad allows to write `feradfile` with [CoffeScript] or [EcmaScript 6] out of the box.

## Install
```shell
npm install -g ferad
```

## Usage
### `feradfile.js`:
```javascript
var ferad = require('ferad');
var gulp = require('gulp');

ferad.task('build', function() {
    return gulp.src('./src')
        .pipe(gulp.dest('./dist'));
})
```
### `ferad.json`:
```json
{
  "run": "build"
}
```
### Execution
```shell
ferad run
```

## API

### ferad.task(name, [func])
Creates or returns a task.
```javascript
ferad.task('do', function(cb))
```

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/ferad
[npm-image]: https://img.shields.io/npm/v/ferad.svg
