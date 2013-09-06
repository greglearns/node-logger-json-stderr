var Logger = require('bunyan')

module.exports = function(opts) {
  if (!opts) { opts = {} }

  var log = new Logger({
    name: opts.name || "Logger",
    level: opts.loggingLevel || "info",
    stream: process.stderr,
    serializers: {
      req: Logger.stdSerializers.req,
      res: resSerializer
    }
  });

  [
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
  ].forEach(function(fnName) {
    log[fnName] = (function(fn) {
      var originalFn = log[fn]
      return function() {
        if (arguments.length < 2) { return originalFn.apply(log, arguments) }
        var args = Array.prototype.slice.call(arguments)
        var tmp = args[0]
        args[0] = args[1]
        args[1] = tmp
        console.log(arguments)
        console.log(args)
        originalFn.apply(log, args)
      }
    }(fnName))
  })

  log.silent = silent

  return log

  function silent(shouldBeSilent) {
    if (shouldBeSilent && !this.originalStreams) {
      this.originalStreams = this.streams
      var ringbuffer = new Logger.RingBuffer({ limit: 1 });
      this.streams = [ringbuffer]
      return
    }
    if (shouldBeSilent === false) {
      if (!this.originalStreams) { return }
      this.streams = this.originalStreams
      this.originalStreams = null
      return
    }
  }

  function resSerializer(res) {
    return {
      statusCode: res.statusCode,
      headers: res.headers()
    }
  }

}

