# Ferad Command Line
[![NPM version][npm-image]][npm-url]
[![Gitter chat][gitter-image]][gitter-url]

For more information about Ferad visit the [homepage].

## Install
```shell
npm install -g ferad-cli
```

## Usage
Ferad executes commands defined in [`package.json`] using tasks defined in [`feradfile.js`].

### ferad *command*
Executes a *command* from [`package.json`] or a task named so in  [`feradfile.js`].
```shell
ferad # Executes command or task named 'default'
ferad build # Executes command or task named 'build'
ferad clean -> build, report # Executes multiple commands or tasks
```

### `feradfile.js`:
```javascript
var ferad = require('ferad');
var tasks = require('ferad-tasks');

ferad.tasks(tasks);
ferad.task('echo', function(o) {
    console.log(o.message);
})
```
### `package.json`:
```json
TODO: real example
```

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/ferad-cli
[npm-image]: https://img.shields.io/npm/v/ferad-cli.svg

[gitter-url]: https://gitter.im/feradjs/ferad
[gitter-image]: https://badges.gitter.im/feradjs/ferad.png

[homepage]: https://github.com/feradjs/ferad

[`package.json`]: #feradjson
[`feradfile.js`]: #feradfilejs
