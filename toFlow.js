// @flow

const fs = require('fs')

function toFlow(inputObject) {
  return anyToType(inputObject, 0)
}

function setTypeName(flowString, filename, userPassedName) {
  const typeName = userPassedName ? userPassedName : `${filename.split('.')[0]}T`
  return (
`// @flow
export type ${typeName} = ${flowString}`
)
}

function generateIndentation (amount) {
  let indentation = ""
  for (let i = 0; i < (amount * 2); i++) {
    indentation += (" ")
  }
  return indentation
}

function anyToType (any, indentationLevel) {
  if (Array.isArray(any)) return arrayToType(any, indentationLevel)
  else if (any == null) return "void"
  else if (typeof any === "object") return objectToType(any, indentationLevel)
  else return typeof any
}

function arrayToType (array, indentationLevel) {
  if (array.length === 0) return '[]'
  let arrayTypes = array.map(el => anyToType(el, indentationLevel))
  let type = '['
  console.log(arrayTypes)
  return anyToType(array[0], indentationLevel) + "[]"
}

function objectToType (object, indentationLevel) {
  if (Object.keys(object).length === 0) return '{}';
  
  let type = "{\n"
  const indentation = generateIndentation(indentationLevel + 1)
  for (const key in object) {
    const value = object[key]
    type += `${indentation}"${key}": ${anyToType(value, indentationLevel + 1)},\n`
  }
  
  return `${type}${generateIndentation(indentationLevel)}}`
}

module.exports = {
  toFlow,
  setTypeName,
}