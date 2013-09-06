var help = require('../test-helper')
var exec = require('child_process').exec
var expect = help.expect

describe('logger-json-stderr', function() {
  var timeInMs = 200
  this.slow(timeInMs)

  it('should write to stderr', function(done) {

    var msg = 'This should only go to stderr.'
    exec(command({ msg: msg }), validate)

    function validate(err, stdout, stderr) {
      expect(stderr).to.match(new RegExp(msg))
      done()
    }
  })

  it('should not write to stdout', function(done) {

    var expectedOutput = ''
    exec(command({ msg: 'Should not write to stdout' }), validate)

    function validate(err, stdout, stderr) {
      expect(err).to.not.exist
      expect(stdout).to.equal(expectedOutput)
      done()
    }
  })

  it('should write objects correctly', function(done) {

    var msg = 'An object is included with this message.'
    var objectAsStr = "{ something: 'with a value' }"
    exec(command({ msg: msg, objectAsStr: objectAsStr }), validate)

    function validate(err, stdout, stderr) {
      var subject = JSON.parse(stderr)
      expect(subject.msg).to.equal(msg)
      expect(subject.something).to.equal('with a value')
      done()
    }
  })

  it('should escape newlines in messages so that each log entry uses only one line', function(done) {

    var expected = 'Should\\\\nescape\\\\nnewlines'

    exec('node ' + __dirname + '/script/multiline_log.js', validate)

    function validate(err, stdout, stderr) {
      expect(stderr).to.match(new RegExp(expected))
      validateThereIsOnlyOneNewline(stderr)
      done()
    }

    function validateThereIsOnlyOneNewline(str) {
      var splitStr = str.split('\n')
      expect(splitStr.length).to.equal(2)
      expect(splitStr[1]).to.equal('')
    }

  })

  it('should output nothing if silent(true) is called', function(done) {
    var silent = true
    exec(command({ msg: 'Should not write to stderr if silent', silent: silent }), validate)

    function validate(err, stdout, stderr) {
      expect(err).to.not.exist
      expect(stderr).to.equal('')
      expect(stdout).to.equal('')
      done()
    }
  })

})

function command(opts) {
  return [
    'node -e "',
    "var logger = require('./index')();",
    opts.silent ? 'logger.silent(true);' : '',
    'logger.info(',
    "'" + opts.msg + "'",
    opts.objectAsStr ? ', ' + escape(opts.objectAsStr) : '',
    ')',
    '"'
  ].join(' ')

  function escape(str) {
    return str.replace(/"/g,'\\"')
  }
}

