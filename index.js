var winston = require('winston')
var winstonStderr = require('winston-stderr')

module.exports = winston

winston.add(winstonStderr, { json: true, stringify: function(obj){ return JSON.stringify(obj) } })
winston.remove(winston.transports.Console)

winston.silent = function silent(value) {
  this.default.transports.StdError.silent = value
}

