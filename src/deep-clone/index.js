function cloneArray (aArray, fTransformFunction = null) {
  return aArray.map(item => cloneItem(item, fTransformFunction))
}

function cloneObject (oObject, fTransformFunction = null) {
  const oOutput = {}
  for (const sKey in oObject) {
    if (Object.prototype.hasOwnProperty.call(oObject, sKey)) {
      oOutput[sKey] = cloneItem(oObject[sKey], fTransformFunction)
    }
  }
  return oOutput
}

function cloneItem (oItem, fTransformFunction = null) {
  switch (typeof oItem) {
    case 'object': {
      if (Array.isArray(oItem)) {
        return cloneArray(oItem, fTransformFunction)
      } else if (oItem === null) {
        return null
      } else if (oItem instanceof Date) {
        return new Date(oItem)
      } else if (oItem instanceof Set) {
        return new Set(cloneArray([...oItem]))
      } else {
        return cloneObject(oItem, fTransformFunction)
      }
    }

    case 'number':
    case 'string':
    case 'boolean': {
      return fTransformFunction ? fTransformFunction(oItem) : oItem
    }

    default: {
      // could be a function
      return fTransformFunction ? fTransformFunction(oItem) : oItem
    }
  }
}

module.exports = {
  deepClone: cloneItem
}
