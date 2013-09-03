# node-logger-json-stderr

[![Build Status](https://travis-ci.org/greglearns/node-logger-json-stderr.png?branch=master)](https://travis-ci.org/greglearns/node-logger-json-stderr) [![Dependency Status](https://david-dm.org/greglearns/node-logger-json-stderr.png)](https://david-dm.org/greglearns/node-logger-json-stderr)

[![NPM](https://nodei.co/npm/logger-json-stderr.png?downloads=true)](https://nodei.co/npm/logger-json-stderr/)

Log JSON to stderr.

Currently, it uses [Winston](https://github.com/flatiron/winston) and [Winston-stderr](https://github.com/greglearns/winston-stderr) to do the work.

# What it does

It has tests to ensure that:

* log data is only written to stderr
* log data is written in JSON format
* all newline characters (\n) in the log data are escaped, such that each log data entry had only one unescaped newline at the end of the line -- this makes it easy to split your log files by newline in order to get each JSON string.

# Installation

```bash
npm install -S logger-json-stderr # install and add as a dependency to your package.json
```

# Usage

```javascript
var logger = require('logger-json-stderr');
logger.info('this will show up in stderr as JSON');
```

# Suppressing logging

```javascript
var logger = require('logger-json-stderr');
logger.info('this will show up in stderr as JSON');
logger.silent(true)
logger.info('this will not show up')
```

# Testing

```bash
make test
```

# License

MIT

