# TypeScript Conversion Log

## Summary

Converted the project from JavaScript (CommonJS) to TypeScript.

---

## Files Created

### `src/Stack.ts`
- Replaces `src/Stack.js`
- Made `Stack` a generic class: `class Stack<T>`
- Added `private` modifier to `items: T[]`
- Type annotations added to all methods:
  - `constructor(): void` (implicit)
  - `push(item: T): void`
  - `pop(): T | undefined`
  - `peek(): T | null`
  - `size(): number`
  - `is_empty(): boolean`
- Changed `module.exports = Stack` → `export default Stack`

### `src/MaxStack.ts`
- Replaces `src/MaxStack.js`
- Changed `const Stack = require('./Stack.js')` → `import Stack from './Stack'`
- Made `MaxStack` a generic class: `class MaxStack<T>`
- Added `private` modifiers to `items: Stack<T>` and `maxs: Stack<T>`
- Type annotations added to all methods:
  - `constructor(): void` (implicit)
  - `peek(): T | null`
  - `max(): T | null`
  - `push(item: T): void`
  - `pop(): T | undefined`
  - `size(): number`
- **Bug fix in `pop()`**: Original JS had undeclared variable `item = this.items.pop()` (missing `const`/`let`). Added `const` declaration. Also updated the null-check to `item !== undefined` to match the actual return type of `Stack<T>.pop()` (which is `T | undefined`, not `T | null`).
- Changed `module.exports = MaxStack` → `export default MaxStack`

### `test/Stack.test.ts`
- Replaces `test/Stack.test.js`
- Changed `const Stack = require('../src/Stack.js')` → `import Stack from '../src/Stack'`
- Changed `var stack = null` → `let stack: Stack<number> | null = null`
- Added non-null assertion operator (`!`) when accessing `stack` inside test callbacks, since TypeScript cannot infer that `beforeEach` guarantees it is non-null
- All comments retained unchanged

### `tsconfig.json` (new)
- Added TypeScript compiler configuration
- `target`: ES6
- `module`: commonjs (to match existing project type)
- `strict`: true
- `esModuleInterop`: true
- `outDir`: ./dist
- `rootDir`: . (covers both src/ and test/)

## Files Modified

### `package.json`
- Added `devDependencies`:
  - `typescript`: ^5.0.0
  - `ts-jest`: ^29.1.0
  - `@types/jest`: ^29.5.0
- Added `jest` configuration block:
  - `preset`: ts-jest (runs TypeScript tests via ts-jest)
  - `testEnvironment`: node
  - `testMatch`: `**/test/**/*.test.ts`

## Module Structure

The module structure is retained — one class per file, with the same import/export relationships:
- `Stack.ts` is the base module
- `MaxStack.ts` imports and builds on `Stack.ts`
- `Stack.test.ts` imports `Stack.ts` for testing

## Installation

After these changes, run:
```
npm install
npm test
```
