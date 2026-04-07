# Environment example

## Database setup

Create the `test_messages` table before running the application:

```sql
CREATE TABLE test_messages (
    id UUID PRIMARY KEY,
    source TEXT NOT NULL,
    text TEXT NOT NULL
);
```

## Application

The `app/` directory contains a Node.js application that inserts rows into the
`test_messages` table via Knex.

```bash
cd app
npm install
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