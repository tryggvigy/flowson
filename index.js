// @flow
const fs = require('fs');
const commander = require('commander')
const pkg = require('./package.json')
const fton = require('./fton');

commander.version(pkg.version)
commander.usage('[options] <file ...>')
commander.option('-i, --indent <n>', 'level of indentation in output', parseInt)
commander.option('-t, --typename', 'name of the type in the generated flow definition file')
commander.parse(process.argv)

if (commander.args.length !== 1) {
  commander.help()
  process.exit(1)
}

const inputFilename = commander.args[0]
const inputJson = fs.readFileSync(inputFilename)
const flowString = fton(inputFilename, inputJson, commander)

console.log(flowString)
