# Message Store Application

A TypeScript-based Node.js application that provides a message storage system using PostgreSQL and Knex.js.

## Features

- **TypeScript**: Fully typed codebase with strict type checking
- **Database Integration**: PostgreSQL database with Knex.js query builder
- **CRUD Operations**: Create, Read, and Delete messages
- **Comprehensive Testing**: Unit tests with Jest and ts-jest
- **Code Quality**: ESLint and Prettier for code consistency
- **Error Handling**: Proper validation and error handling

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database
- Environment variables for database configuration

## Database Setup

Create the `test_messages` table before running the application:

```sql
CREATE TABLE test_messages (
    id UUID PRIMARY KEY,
    source TEXT NOT NULL,
    text TEXT NOT NULL
);
```

## Installation

```bash
cd app
npm install
```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Usage

### Basic Example

```typescript
import { MessageStore } from './src/MessageStore';

const store = new MessageStore({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'mydb',
    user: 'myuser',
    password: 'mypassword',
  },
});

// Insert a message
const id = await store.insert('my-source', 'Hello, World!');

// Find by ID
const message = await store.findById(id);

// Find by source
const messages = await store.findBySource('my-source');

// Delete a message
await store.deleteById(id);

// Clean up
await store.destroy();
```

## Environment Variables

The application uses the following environment variables for testing:

- `AUTH_TOKEN` - Authentication token for database allocation service
- `ALLOCATE_URL` - URL of the database allocation service
- `PGHOST` - PostgreSQL host (default: localhost)
- `PGPORT` - PostgreSQL port (default: 5432)
- `PGDATABASE` - PostgreSQL database name
- `PGUSER` - PostgreSQL user
- `PGPASSWORD` - PostgreSQL password

## Testing

Run the test suite:

```bash
npm test
```

The tests include:
- Unit tests for MessageStore CRUD operations
- Validation tests for input parameters
- Integration tests for complete workflows
- Unit tests for database configuration fetcher

## Project Structure

```
app/
├── src/
│   ├── __tests__/
│   │   ├── MessageStore.test.ts
│   │   └── dbConfigFetcher.test.ts
│   ├── utils/
│   │   └── dbConfigFetcher.ts
│   ├── MessageStore.ts
│   ├── types.ts
│   └── index.ts
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── tsconfig.json
└── package.json
```

## API Reference

### MessageStore

#### Constructor

```typescript
constructor(config: MessageStoreConfig)
```

#### Methods

- `insert(source: string, text: string): Promise<string>` - Insert a new message and return its UUID
- `findById(id: string): Promise<Message | null>` - Find a message by ID
- `findBySource(source: string): Promise<Message[]>` - Find all messages from a source
- `deleteById(id: string): Promise<boolean>` - Delete a message by ID
- `destroy(): Promise<void>` - Close the database connection

### Types

```typescript
interface MessageStoreConfig {
  client: string;
  connection: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}

interface Message {
  id: string;
  source: string;
  text: string;
}

interface DatabaseConfig {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
}
```

## Code Quality

This project enforces code quality through:

- **TypeScript**: Strict type checking enabled
- **ESLint**: Linting rules for TypeScript
- **Prettier**: Code formatting standards
- **Jest**: Comprehensive test coverage

## License

Private
