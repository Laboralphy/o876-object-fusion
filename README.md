# o876-object-fusion

Tools for recursively cloning, merging and comparing objects. Written in TypeScript,
shipped as an ES module with bundled type declarations.

## Installation

```bash
npm install @laboralphy/object-fusion
```

## Usage

```ts
import {
  deepClone,
  deepMerge,
  deepEqual,
  deepFreeze,
  shallowMap
} from '@laboralphy/object-fusion'
```

> This package is **ESM only**. Use `import` (Node ≥ 16 with `"type": "module"`,
> or a bundler). `require()` is not supported.

## API

### `deepClone(value, transform?)`
Recursively clones `value`. Plain objects, arrays, `Date` and `Set` instances are
duplicated; primitives are copied. An optional `transform(value)` function is applied
to every leaf value.

### `deepMerge(target, source)`
Deep-merges `source` into `target` (mutating and returning `target`). Nested objects
are merged recursively, arrays are concatenated with deep-cloned items, other values
overwrite. Throws `ERR_MERGE_RECURSIVE` on circular source references.

### `deepEqual(a, b)`
Structural equality check for primitives, arrays and plain objects (key-order
independent).

### `deepFreeze(value)`
Recursively freezes `value`, returning a deeply immutable version.

### `shallowMap(object, fn)`
Returns a new object with the same keys, each value replaced by `fn(value, key)`.
Non-recursive.

## Development

```bash
npm run build      # compile TypeScript to dist/
npm test           # run the Vitest suite
npm run typecheck  # type-check without emitting
```
