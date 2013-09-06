#!/usr/bin/env node
var logger = require(__dirname + '/../../../index')()
var str = "Should\nescape\nnewlines"
logger.info(str)

