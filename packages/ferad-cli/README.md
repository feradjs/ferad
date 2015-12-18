# Ferad Command Line
[![NPM version][npm-image]][npm-url]
[![Gitter chat][gitter-image]][gitter-url]

For general information about Ferad visit the [homepage].

## Install
```shell
npm install -g ferad-cli
```

## Usage
Ferad executes commands defined in [`package.json`] using tasks defined in [`feradfile.js`]. Tasks can be used in place of commands.

### ferad *command*
Executes a *command* from [`package.json`] or a task named so in  [`feradfile.js`].
```shell
ferad # Executes a command "default"
ferad build # Executes a command "build"
ferad clean -> build, report # Executes multiple commands
```

### `package.json`
#### [Configuration Syntax][syntax]
```json
{
  "private": true,
  "ferad": {
    "clean": "del -> echo",
    ":default": {
      "dest": "./dist",
      "message": "Cleaned!"
    }
  },
  "devDependencies": {
    "ferad": "^4.0.0",
    "ferad-tasks": "^4.0.0"
  }
}
```

### `feradfile.js`
#### [Ferad API][api]
```javascript
var ferad = require('ferad');
var tasks = require('ferad-tasks');

ferad.tasks(tasks);
ferad.task('echo', function(o, cb) {
    console.log(o.message);
	cb();
});
```

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/ferad-cli
[npm-image]: https://img.shields.io/npm/v/ferad-cli.svg

[gitter-url]: https://gitter.im/feradjs/ferad
[gitter-image]: https://badges.gitter.im/feradjs/ferad.png

[homepage]: https://github.com/feradjs/ferad
[syntax]: https://github.com/feradjs/ferad/docs/SYNTAX.md
[api]: https://npmjs.org/package/ferad

[`package.json`]: #package-json
[`feradfile.js`]: #feradfile-js
