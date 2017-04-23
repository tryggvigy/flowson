// @flow
const commander = require('commander')
const pkg = require('./package.json')
const {toFlow, setTypeName} = require('./toFlow')
const {readFile} = require('./utils')

commander.version(pkg.version)
commander.usage('[options] <file ...>')
commander.option('--verbose', 'output verbose messages on internal operations')
commander.option('--typename', 'name of the type in the generated flow definition file')
commander.parse(process.argv)

if (commander.args.length !== 1) {
  commander.help()
  process.exit(1)
}

const [jsonFile] = commander.args

readFile(jsonFile)
  .then(fileContents => JSON.parse(fileContents))
  .then(obj => toFlow(obj, jsonFile))
  .then(flowString => setTypeName(flowString, jsonFile, commander.typeName))
  .then(res => console.log(res))
  .catch(err => {
    console.log(err);
  })

