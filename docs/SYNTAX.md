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
Parallel commands have higher precedence than successive ones (`c` is executed after `a` and `b` are finished).
```json
{
  "command": "a, b -> c"
}
```

### Shell
Shell commands are defined using square brackets.
```json
{
  "clean": "rm -rf ./dist"
}
```

### Groups
TBD
### Multiline
TBD

## Options
### Default
### Buckets
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
