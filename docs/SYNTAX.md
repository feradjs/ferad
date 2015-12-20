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
- [Implementation Details]

## Overview
Ferad configuration is defined in the `"ferad"` section of [`package.json`] file.

It consists of definition of commands and options.
Commands define a group of tasks executed together.
Options define parameters passed to tasks.
They could be either grouped in buckets and applied ad-hoc or assigned to tasks directly.

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
Task `c` is executed after `a` and `b` tasks are finished.

### Shell
Shell commands are defined using square brackets inside value string.
```json
{
  "clean": "[rm -rf ./dist]"
}
```

### Groups
TBD
Commands can be grouped with braces.
```json
{
  "command": "a, (b -> c), d"
}
```
Tasks `a`, `b -> c` and `d` are executed in parallel.

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
Command `command1` is equal to `a -> b -> c`.

## Options

### Buckets
Options are defined in named buckets using colon.
```json
{
  ":options": {
    "src": "src",
    "dest": "./dist"
  }
}
```

### Default
TBD DEPRECATED in favor of global options
Default options are applied to all tasks and take the lowest precedence.
```json
{
  ":default": {
    "x": 1,
    "y": 2
  }
}
```

### Bucket Application
Option buckets can be applied to tasks in commands.
```json
{
  "command": "a -> b:opts",
  ":opts": {
    "x": 1
  }
}
```
Options `opts` are applied to `b` task.

Option buckets being applied to commands set options for all their tasks.
```json
{
  "command": "ab:opts",
  "ab": "a, b"
}
```
Options `opts` are applied to both `a` and `b` tasks.

### Task Options
Options can be applied to the task directly.
```json
{
  "sass": {
    "src": "src/**/*.scss"
  }
}
```
Task options take lower precedence than option buckets.

### Bucket Groups
Buckets can be made from other buckets.
```json
{
  ":a": ":b:c",
  ":b": {
    "x": 1
  },
  ":c": {
    "y": 2
  }
}
```
Bucket `a` is equal to:
```json
{
  "x": 1,
  "y": 2
}
```

### Option Differentiation
TBD
By task inside bucket using dot after task name.
```json
{
  ":opts": {
    "x": 1,
    "a.": {
      "x": 2
    }
  }
}
```
Applying bucket `opts` will yield `x = 2` for `a` task and `x = 1` for all other tasks.

### Option Differentiation by Name
TBD
Inside bucket using dot before option name.
```json
{
  ":opts": {
    ".x": {
      "a": 1,
      "b": 2
    }
  }
}
```
Applying bucket `opts` will yield `x = 1` for `a` task and `x = 2` for `b` task.

On task level.
```json
{
  ".dist": "./dist",
  ".src": {
    "sass": "**/*.sass",
    "jade": "**/*.jade"
  }
}
```

### Short Option
TBD
There is a short syntax for single option definition for either task or bucket.
```json
{
  "a.x": 1
}
```
Task `a` has option `x` equal to `1`.

Short option syntax can be used inside option buckets.
```json
{
  ":opts": {
    "a.x": 1,
    "b.x": 2
  }
}
```
For bucket `opts` task `a` has `x = 1` and task `b` has `x = 2`.

### Inline Options
TBD
Options can be applied inline to tasks using curly braces, without creating buckets. Content of curly braces is parsed as regular JSON.
```json
{
  "command": "task: { src: 'src' }"
}
```

### Multiple Buckets
TBD
Options can be reused between buckets using comma.
```json
{
  ":a, :b": {
    "x": 1
  },
  ":a.y": 2
}
```

### Options Reusing
TBD
Option values can be reused by using comma.
```json
{
  ":opts": {
    "x, y": 1
  }
}
```

## Examples
TBD

## Implementation Details
### Options Merging
### Gulp Task Naming
### Commands validation
### Commands overlapping
Currently a command with the same name as a task shields it.

[`package.json`]: https://docs.npmjs.com/files/package.json