var winston = require('winston')
var winstonStderr = require('winston-stderr')

winston.add(winstonStderr, { json: true, stringify: function(obj){ return JSON.stringify(obj) } })
winston.remove(winston.transports.Console)

module.exports = winston

