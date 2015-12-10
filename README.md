# Ferad
[![NPM version][npm-image]][npm-url]

Gulp Frontend

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

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/ferad
[npm-image]: https://img.shields.io/npm/v/ferad.svg
