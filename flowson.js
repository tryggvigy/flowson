module.exports = function flowson(inputFilename, inputJson, options = {}) {
  const stringifiedJson = JSON.stringify(
    JSON.parse(inputJson), 
    null, 
    options.indent || 2
  )

  const typeName = options.typename ? options.typename : `${inputFilename.split('.')[0]}T`

  const flowString = `// @flow\nexport type ${typeName} = ${stringifiedJson}`

  return flowString
}