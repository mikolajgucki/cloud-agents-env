# TypeScript Boilerplate with PostgreSQL

A production-ready TypeScript boilerplate for Node.js applications with PostgreSQL database integration.

## Features

- **TypeScript**: Fully typed codebase with strict compiler options
- **PostgreSQL**: Database integration with Knex.js query builder
- **Testing**: Comprehensive test suite with Jest and ts-jest
- **Code Quality**: ESLint and Prettier for consistent code style
- **Type Safety**: Strong typing for database operations and configurations

## Database Setup

Create the `test_messages` table before running the application:

```sql
CREATE TABLE test_messages (
    id UUID PRIMARY KEY,
    source TEXT NOT NULL,
    text TEXT NOT NULL
);
```

## Quick Start

```bash
cd app
npm install
npm run build
npm test
```

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