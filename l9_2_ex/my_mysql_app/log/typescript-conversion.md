# TypeScript Conversion Log

Date: 2026-03-19

## Summary

Converted project from JavaScript to TypeScript. All module structure and comments retained.

## New Files Created

| TypeScript File | Converted From |
|---|---|
| `app.ts` | `app.js` |
| `bin/www.ts` | `bin/www` |
| `models/db.ts` | `models/db.js` |
| `models/message.ts` | `models/message.js` |
| `routes/index.ts` | `routes/index.js` |
| `routes/users.ts` | `routes/users.js` |
| `routes/echo.ts` | `routes/echo.js` |
| `__test__/models/message.test.ts` | `__test__/models/message.test.js` |
| `__test__/models/echo.test.ts` | `__test__/models/echo.test.js` |
| `tsconfig.json` | (new) |

## Configuration Changes

### `tsconfig.json` (new)
- Target: ES2020, module: CommonJS
- `strict: true` for full type checking
- `esModuleInterop: true` to allow default imports from CommonJS modules

### `package.json`
- Updated `start` script: `node ./bin/www` → `ts-node ./bin/www.ts`
- Updated `jest` config: added `ts-jest` preset, changed `testMatch` to `.test.ts`
- Added devDependencies: `typescript`, `ts-node`, `ts-jest`, and `@types/*` packages for all dependencies
- Moved `jest` and `supertest` from `dependencies` to `devDependencies`
- Added `body-parser` to `dependencies` (was required but missing)

## Type Annotations Added

### `models/db.ts`
- `pool: Pool` — typed as `Pool` from `mysql2/promise`
- `cleanup(): Promise<void>` — explicit async return type

### `models/message.ts`
- `Message` class: `msg: string`, `time: Date` field types; constructor params typed
- `MessageRow` interface extending `RowDataPacket` for query result typing
- `sync(): Promise<void>`
- `all(): Promise<Message[]>` — return type explicit; query result typed as `MessageRow[]`
- `insertOne(message: Message): Promise<void>` — result typed as `ResultSetHeader`
- `insertMany(messages: Message[]): Promise<void>`
- `deleteOne(message: Message): Promise<void>` — result typed as `ResultSetHeader`

### `routes/index.ts`
- Route handler params: `req: Request, res: Response, next: NextFunction`
- Return type: `void`

### `routes/users.ts`
- Route handler params: `req: Request, res: Response, next: NextFunction`
- Return type: `void`

### `routes/echo.ts`
- All route handler params typed: `req: Request, res: Response, next: NextFunction`
- All async route handlers return `Promise<void>`
- `msg` in POST `/submit/` typed as `string`

### `app.ts`
- 404 handler: `req: Request, res: Response, next: NextFunction`
- Error handler: `err: HttpError, req: Request, res: Response, next: NextFunction`

### `bin/www.ts`
- `normalizePort(val: string): number | string | false`
- `onError(error: NodeJS.ErrnoException): void`
- `onListening(): void` — `addr` typed as `AddressInfo | string | null`

### `__test__/models/message.test.ts`
- `setup(): Promise<void>`, `teardown(): Promise<void>`

### `__test__/models/echo.test.ts`
- `setup(): Promise<void>`, `teardown(): Promise<void>`
- `received` array typed as `message.Message[]`

## Module System
- Changed `module.exports = ...` to named `export { ... }` or `export default`
- Changed `require(...)` to `import ... from ...`
- Views (`.ejs`) and client-side JS (`public/`) are unchanged (not TypeScript targets)
