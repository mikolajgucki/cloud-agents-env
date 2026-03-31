## Cursor Cloud specific instructions

This repository is a Cursor Cloud Agent environment configuration (not a traditional application). It contains:

- `.cursor/Dockerfile` — Docker image definition (base: `node:20-bookworm`)
- `.cursor/environment.json` — Cursor environment config (build settings + terminal definitions)
- `env/install.js` — Install-time telemetry/logging script (runs during Docker build)
- `env/start.js` — Long-running environment manager process (lifecycle management with graceful SIGTERM/SIGINT shutdown)

### Running the scripts

- **No dependencies to install.** There is no `package.json`; scripts use only Node.js built-in APIs (`fetch`, `crypto`, `Buffer`). Requires Node.js 18+.
- Install script: `node env/install.js` (sends install telemetry, exits)
- Start script: `node env/start.js` (sends init telemetry, stays alive until SIGTERM/SIGINT)
- Both scripts POST to an external HTTPS endpoint (`mealz.andcreations.io:8443`). Network access is required; scripts will error if the endpoint is unreachable.

### No lint, test, or build tooling

This repo has no linters, test frameworks, build tools, or CI/CD pipelines. Validation consists of running the two Node.js scripts and confirming they execute without errors.
