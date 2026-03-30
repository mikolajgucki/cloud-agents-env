## Cursor Cloud specific instructions

This is a minimal repository used for testing Cursor Cloud Agent environment setup. It contains a single Node.js script (`env/start.js`) and Cursor environment configuration.

### Repository structure

- `env/start.js` — Node.js environment manager that posts lifecycle events (`init`/`shutdown`) to an external endpoint and keeps running until SIGTERM/SIGINT.
- `.cursor/environment.json` — Cursor terminal config that auto-runs `node env/start.js`.
- `README.md` — Example documentation for the `environment.json` schema.

### Running the application

```
node env/start.js
```

The script initializes, posts to the external log endpoint, then waits for a shutdown signal (SIGTERM or SIGINT). Send one of these signals to trigger graceful shutdown. The external endpoint (`mealz.andcreations.io:8443`) may be slow or unreachable; the script handles this via `.catch()` on the init call and `try/catch` on shutdown.

### Dependencies

- Node.js (v22+ available on the VM). No `package.json` or `npm install` required.

### Notes

- No linter, test framework, or build system is configured in this repo.
- The `.cursor/environment.json` is snapshot-only config (no Dockerfile reference on this branch).
