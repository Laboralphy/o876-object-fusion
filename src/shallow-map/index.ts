/**
 * A simple object shallow transformation without any recursive mechanism.
 * The provided function accepts (value, key) parameters and must return the new value.
 * @param oObject object whose values are transformed
 * @param f transformer called with each (value, key)
 * @returns a new object with the same keys and transformed values
 */
function shallowMap<T, R> (
  oObject: Record<string, T>,
  f: (value: T, key: string) => R
): Record<string, R> {
  return Object.fromEntries(
    Object
      .entries(oObject)
      .map(([key, value]) => [key, f(value, key)])
  )
}

export { shallowMap }
