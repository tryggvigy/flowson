#! /usr/bin/env node

const fs = require('fs')
const commander = require('commander')
const pkg = require('./package.json')
const flowson = require('./flowson')

commander.version(pkg.version)
commander.usage('[options] <file ...>')
commander.option('-i, --indent <n>', 'level of indentation in output', parseInt)
commander.option('-t, --typename <s>', 'name of the type in the generated flow definition file')
commander.parse(process.argv)

if (commander.args.length !== 1) {
  commander.help()
  process.exit(1)
}

try {
  const inputFilename = commander.args[0]
  const inputJson = fs.readFileSync(inputFilename)
  const flowString = flowson(inputFilename, inputJson, commander)
  console.log(flowString)
} catch (exception) {
  console.error(exception)
  process.exit(1)
}

process.exit(0)
