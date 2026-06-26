export type TransformFunction = (value: unknown) => unknown

function cloneArray (aArray: unknown[], fTransformFunction: TransformFunction | null = null): unknown[] {
  return aArray.map(item => cloneItem(item, fTransformFunction))
}

function cloneObject (
  oObject: Record<string, unknown>,
  fTransformFunction: TransformFunction | null = null
): Record<string, unknown> {
  const oOutput: Record<string, unknown> = {}
  for (const sKey in oObject) {
    if (Object.prototype.hasOwnProperty.call(oObject, sKey)) {
      oOutput[sKey] = cloneItem(oObject[sKey], fTransformFunction)
    }
  }
  return oOutput
}

/**
 * Recursively clones any value. Plain objects, arrays, Date, Set and Map instances
 * are duplicated; primitives (and functions) are returned as-is unless a transformation
 * function is provided, in which case it receives every leaf value (including Set
 * elements and Map keys/values) and returns the replacement to store in the clone.
 * @param oItem value to clone
 * @param fTransformFunction optional leaf-value transformer
 * @returns a deep clone of oItem
 */
function cloneItem<T> (oItem: T, fTransformFunction: TransformFunction | null = null): T {
  switch (typeof oItem) {
    case 'object': {
      if (Array.isArray(oItem)) {
        return cloneArray(oItem, fTransformFunction) as T
      } else if (oItem === null) {
        return null as T
      } else if (oItem instanceof Date) {
        return new Date(oItem) as T
      } else if (oItem instanceof Set) {
        return new Set(cloneArray([...oItem], fTransformFunction)) as T
      } else if (oItem instanceof Map) {
        return new Map(
          [...oItem].map(([key, value]) => [
            cloneItem(key, fTransformFunction),
            cloneItem(value, fTransformFunction)
          ])
        ) as T
      } else {
        return cloneObject(oItem as Record<string, unknown>, fTransformFunction) as T
      }
    }

    case 'number':
    case 'string':
    case 'boolean': {
      return (fTransformFunction ? fTransformFunction(oItem) : oItem) as T
    }

    default: {
      // could be a function
      return (fTransformFunction ? fTransformFunction(oItem) : oItem) as T
    }
  }
}

export { cloneItem as deepClone }
