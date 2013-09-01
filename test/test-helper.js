var chai = require('chai')
chai.Assertion.includeStack = true

module.exports = {
	require: requireCode,
	expect: chai.expect
}

function requireCode(path) {
	return require(__dirname + '/../' + path)
}

