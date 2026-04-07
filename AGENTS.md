## Cursor Cloud specific instructions

### Overview
This is a Node.js app (`app/`) that uses Knex + PostgreSQL to insert messages into a `test_messages` table. There is no separate build or lint step; the only script is `npm test` (Jest).

### PostgreSQL setup (one-time, already done in the snapshot)
PostgreSQL 16 is installed. Before running tests, ensure it is running:
```
sudo pg_ctlcluster 16 main start
```
The DB user `jobref-backend` (password: `jobref-backend`) and table `test_messages` in the default `postgres` database are pre-created.

### Running tests
```
cd app && npm test
```
The test reads DB connection config from `app/_tmp_cfg.json` (gitignored). If this file is missing, create it:
```json
{"dbHost":"localhost","dbPort":5432,"dbName":"postgres","dbUser":"jobref-backend","dbPassword":"jobref-backend"}
```
Without this file, the test falls back to fetching config from a remote `ALLOCATE_URL`, which requires `AUTH_TOKEN` and network access — avoid this in cloud agents.

### Notes
- No lint or build scripts are configured in `package.json`.
- The `env/` directory scripts (`start.js`, `install.js`) are environment lifecycle helpers that POST to an external logging service and require `AUTH_TOKEN`. They are **not** needed for development or testing.
- The `.cursor/environment.json` in the repo defines a terminal running `node env/start.js`; this requires `AUTH_TOKEN` and is not relevant for running the app's core tests.
