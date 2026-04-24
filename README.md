# TypeScript Boilerplate Project

A production-ready TypeScript boilerplate for Node.js applications with PostgreSQL database integration.

## Features

- **TypeScript**: Full TypeScript support with strict mode enabled
- **Database Integration**: PostgreSQL integration using Knex.js with type-safe queries
- **Testing**: Jest testing framework with TypeScript support and comprehensive test coverage
- **Code Quality**: ESLint and Prettier for consistent code formatting
- **Type Safety**: Strongly typed database configurations and models

## Project Structure

```
app/
├── src/
│   ├── __tests__/          # Test files
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── MessageStore.ts     # Main business logic
│   └── index.ts           # Public exports
├── dist/                   # Compiled JavaScript (generated)
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest configuration
├── .eslintrc.js          # ESLint configuration
└── .prettierrc.js        # Prettier configuration
```

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

## Development

### Build the Project

```bash
npm run build
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Code Quality

```bash
# Lint the code
npm run lint

# Fix linting issues
npm run lint:fix

# Format the code
npm run format

# Check formatting
npm run format:check

# Type check without emitting files
npm run typecheck
```

## Usage Example

```typescript
import { MessageStore, fetchDBConfig } from './src';

async function main() {
  // Fetch database configuration
  const dbConfig = await fetchDBConfig();
  
  // Create MessageStore instance
  const store = new MessageStore({
    client: 'pg',
    connection: {
      host: dbConfig.dbHost,
      port: dbConfig.dbPort,
      database: dbConfig.dbName,
      user: dbConfig.dbUser,
      password: dbConfig.dbPassword,
    },
  });

  // Insert a message
  const id = await store.insert('example', 'Hello, TypeScript!');
  console.log('Inserted message with ID:', id);

  // Retrieve the message
  const message = await store.findById(id);
  console.log('Retrieved message:', message);

  // Clean up
  await store.destroy();
}

main().catch(console.error);
```

## Environment Variables

The application requires the following environment variables for database configuration:

- `AUTH_TOKEN`: Authentication token for resource allocation
- `ALLOCATE_URL`: URL for database resource allocation endpoint

Alternatively, you can manually configure the database connection in your tests or application code.

## `environment.json`

```json
{
  "name": "cloud-agents-dev",
  "user": "node",
  "start": "node env/start.js"
}
```

## Cursor `environment.json`

```json
{
  "name": "my-dev-environment",
  "user": "node",
  "install": "npm install",
  "start": "npm run dev",
  "repositoryDependencies": [
    "github.com/example/shared-lib",
    "github.com/example/api-client"
  ],
  "ports": [
    {
      "name": "web server",
      "port": 3000
    },
    {
      "name": "api",
      "port": 4000
    }
  ],
  "terminals": [
    {
      "name": "dev server",
      "command": "npm run dev",
      "description": "Starts the frontend development server"
    },
    [
      {
        "name": "backend",
        "command": "npm run start:api",
        "description": "Runs the backend API service"
      },
      {
        "name": "worker",
        "command": "npm run worker",
        "description": "Starts background job processor"
      }
    ]
  ],
  "build": {
    "dockerfile": "./Dockerfile",
    "context": "."
  },
  "snapshot": "base-env-v1.2.3",
  "agentCanUpdateSnapshot": true
}
```