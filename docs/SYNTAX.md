# Ferad Configuration Syntax

## Contents
- [Overview](#overview)
  - ...
- [Commands](#commands)
  - ...
- [Options](#options)
  - ...
- [Examples](#examples)
  - ...

## Overview
Ferad configuration is defined in the `"ferad"` section of [`package.json`] file.

## Commands
Commands are made of tasks with applied [options](#options).

### Default
Command named `"default"` is executed by default.

### Successive
Commands can be successive using `->`.
```json
{
  "command": "a -> b -> c"
}
```

### Parallel
Commands can be parallel with comma.
```json
{
  "command": "a, b"
}
```
Parallel commands have higher precedence than successive ones.
```json
{
  "command": "a, b -> c"
}
```
`c` is executed after `a` and `b` are finished.

### Shell
Shell commands are defined using square brackets inside value string.
```json
{
  "clean": "[rm -rf ./dist]"
}
```

### Groups
TBD
Commands can be grouped with braces:
```json
{
  "command": "a, (b -> c), d"
}
```
`a`, `b -> c` and `d` are executed in parallel.

### Multiline
TBD
A single command can take multiple lines by using array.
```json
{
  "command": [
    "a ->",
    "b, c",
    "-> d"
  ]
}
```

### Referencing
Commands can reference each other.
```json
{
  "command1": "a -> command2",
  "command2": "b -> c"
}
```
`command1` is equal to `a -> b -> c`.

## Options

### Buckets
Options are defined in named buckets using colon:
```json
{
  ":options": {
    "src": "src",
    "dest": "./dist"
  }
}
```

### Default
### Task Options
### Bucket Application
### Option Differentiation
TBD
### Inline Options
TBD
### Multiple Buckets
TBD

## Examples
TBD

[`package.json`]: https://docs.npmjs.com/files/package.json
