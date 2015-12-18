# Ferad Command Line
[![NPM version][npm-image]][npm-url]
[![Gitter chat][gitter-image]][gitter-url]

For more information about Ferad visit the [homepage].

## Install
```shell
npm install -g ferad-cli
```

## Usage
Execute commands from [`package.json`] using tasks defined in [`feradfile.js`]

### ferad
Executes a command named `"default"` in [`package.json`] or a task named so in [`feradfile.js`].
```shell
ferad
```

### ferad *name*
Executes a command from [`package.json`] or a task named so in  [`feradfile.js`].


### Global Commands
If there is no [`package.json`] in the directory `~/.ferad/`

### `feradfile.js`:
```javascript
TODO: real example
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
