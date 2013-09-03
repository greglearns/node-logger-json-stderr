var help = require('../test-helper')
var exec = require('child_process').exec
var tmp = require('tmp')
var fs = require('fs')
var expect = help.expect

describe('logger-json-stderr', function() {

  it('should write to stderr', function(done) {

    var msg = 'This should only go to stderr.'
    var expectedOutput = JSON.stringify({ level: 'info', message: msg }) + '\n'

    exec(command(msg), validate)

    function validate(err, stdout, stderr) {
      expect(stderr).to.equal(expectedOutput)
      done()
    }
  })

  it('should not write to stdout', function(done) {

    var expectedOutput = ''
    exec(command('Should not write to stdout'), validate)

    function validate(err, stdout, stderr) {
      expect(err).to.not.exist
      expect(stdout).to.equal(expectedOutput)
      done()
    }
  })

  it('should escape newlines in messages', function(done) {

    var msg = 'Should\nescape\nnewlines'
    var expectedOutput = JSON.stringify({ level: 'info', message: msg }) + '\n'

    writeTempfileThenDo(msg, validate)

    function validate(err, stdout, stderr) {
      expect(stderr).to.equal(expectedOutput)
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
    var expectedOutput = ''
    exec(silentCommand('Should not write to stderr if silent'), validate)

    function validate(err, stdout, stderr) {
      expect(err).to.not.exist
      expect(stderr).to.equal(expectedOutput)
      done()
    }
  })

})

function command(msg) {
  return "node -e \"require('./index').info('" + msg + "')\""
}

function silentCommand(msg) {
  return "node -e \"var logger = require('./index'); logger.silent(true); logger.info('" + msg + "')\""
}

function writeTempfileThenDo(msg, cb) {
  tmp.file({ prefix: 'node-logger-test-' }, function _tempFileCreated(err, path, fd) {
    if (err) throw err;
    fs.writeFile(path, msg, { encoding: 'utf8' }, function() {
      execWithTempfile(path, cb)
    })
  })

  function execWithTempfile(path, cb) {
    var cmd = "node -e \"var str=require('fs').readFileSync('" + path + "',{ encoding: 'utf8' }); require('./index').info(str);\""
    exec(cmd, cb)
  }

}

