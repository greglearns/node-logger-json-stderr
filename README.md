# node-logger-json-stderr

[![Build Status](https://travis-ci.org/greglearns/node-logger-json-stderr.png?branch=master)](https://travis-ci.org/greglearns/node-logger-json-stderr) [![Dependency Status](https://david-dm.org/greglearns/node-logger-json-stderr.png)](https://david-dm.org/greglearns/node-logger-json-stderr)

[![NPM](https://nodei.co/npm/logger-json-stderr.png?downloads=true)](https://nodei.co/npm/logger-json-stderr/)

Log JSON to stderr.

Currently, it uses [Bunyan](https://github.com/trentm/node-bunyan) to do the work.

# What it does

* log data is only written to stderr
* log data is written in JSON format
* all newline characters (\n) in the log data are escaped, such that each log entry has only one unescaped newline at the end of the line -- this makes it easy to split your log files on newlines in order to get each JSON string.
* objects can be logged as well
* enables two 'styles' of logger: message first then objects (like Winston), or object first, then message (like Bunyan)

# Installation

```bash
npm install -S logger-json-stderr // install and add as a dependency to your package.json
```

# Usage

Basic (verbose) usage, using the default (Winston) style (message first, then object):

```javascript
var options = { name: 'name for the logger', loggingLevel: 'error' }
    // name defaults to 'Logger', and loggingLevel defaults to 'info'
var loggerFn = require('logger-json-stderr');
var logger = loggerFn(options)

logger.info('this will show up in stderr as one line of JSON');
```

A shorter version is

```javascript
var logger = require('logger-json-stderr')({ name: "awesome app" })
logger.info('this log entry will have an awesome name associated with it')
```

Objects can be logged as well

```javascript
logger.info('this is a message', { and: 'this is', an: 'object that will be logged' })
```

Using the Bunyan style (object first, then message)

```javascript
var logger = require('logger-json-stderr')({ name: "awesome app", style: 'bunyan' })
logger.info({ an: 'object comes first' }, 'and then this message comes second')
```

# Suppressing logging

```javascript
logger.info('this will show up on stderr as JSON');
logger.silent(true)
logger.info('this will not show up')
logger.silent(false)
logger.info('this will show up')
```

# Testing

```bash
make test
```

# Change History

1.0.0
* Replace Winston with Bunyan.
* Returns a function instead of an object.
* Must call the function with an object like { name: 'the name for the logger' }.

0.1.0
* Use Winston.

# License

MIT

