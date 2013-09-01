MOCHA=node_modules/.bin/mocha
DEBUG?=
reporter?=spec
FLAGS?=$(DEBUG) --reporter $(reporter)

test:
	$(MOCHA) $(shell find test -name *-test.js) $(FLAGS)

.PHONY: test

