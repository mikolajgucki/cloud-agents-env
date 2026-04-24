# App

A TypeScript-based Node.js application with PostgreSQL integration using Knex.

## Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Database**: PostgreSQL integration via Knex query builder
- **Testing**: Jest with ts-jest for testing TypeScript code
- **Code Quality**: ESLint and Prettier for code quality and formatting
- **Type Safety**: Strict TypeScript configuration with comprehensive type checking

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database

## Installation

```bash
npm install
```

## Development

### Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

Watch mode for development:

```bash
npm run build:watch
```

### Testing

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Code Quality

Type checking:

```bash
npm run typecheck
```

Linting:

```bash
npm run lint
npm run lint:fix  # Auto-fix issues
```

Formatting:

```bash
npm run format        # Format code
npm run format:check  # Check formatting
```

## Project Structure

```
app/
├── src/
│   ├── __tests__/          # Test files
│   ├── MessageStore.ts     # Main MessageStore class
│   └── index.ts            # Public API exports
├── dist/                   # Compiled JavaScript (generated)
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest configuration
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
└── package.json            # Package dependencies and scripts
```

## Usage

### MessageStore

The `MessageStore` class provides methods to interact with the `test_messages` table:

```typescript
import { MessageStore } from "./MessageStore";

const store = new MessageStore({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "password",
  },
});

// Insert a message
const id = await store.insert("source-name", "Message text");

// Clean up
await store.destroy();
```

## Database Schema

The application expects a `test_messages` table with the following schema:

```sql
CREATE TABLE test_messages (
    id UUID PRIMARY KEY,
    source TEXT NOT NULL,
    text TEXT NOT NULL
);
```

## Environment Variables

The test suite uses the following environment variables:

- `AUTH_TOKEN`: Authentication token for the allocation service
- `ALLOCATE_URL`: URL for the database allocation service

## Scripts

| Script | Description |
|--------|-------------|
| `build` | Compile TypeScript to JavaScript |
| `build:watch` | Compile TypeScript in watch mode |
| `test` | Run tests |
| `test:watch` | Run tests in watch mode |
| `test:coverage` | Run tests with coverage report |
| `lint` | Run ESLint |
| `lint:fix` | Run ESLint with auto-fix |
| `format` | Format code with Prettier |
| `format:check` | Check code formatting |
| `typecheck` | Type check without emitting files |
| `clean` | Remove compiled files |

## License

Private
