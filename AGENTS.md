# AGENTS.md

## Cursor Cloud specific instructions

This is a minimal skeleton repository (`cloud-agents-env`) used for testing Cursor cloud agent environment setup. It has no application code, no runtime services, no package managers, and no dependencies beyond basic system tools.

### Repository structure

- `Dockerfile` — Defines the dev container environment (Alpine-based with `curl`, `bash`, `git`).
- `setup.sh` — Minimal setup script (no-op).
- `.cursor/environment.json` — Points to the `Dockerfile` as the environment source of truth.
- `README.md` — Single-line project name.

### Development notes

- There are no build steps, lint checks, test suites, or services to run.
- The `Dockerfile` is the source of truth for the dev environment (referenced by `.cursor/environment.json`). Environment changes should be made in the `Dockerfile`, not via snapshots.
- `setup.sh` is a simple shell script; run with `bash setup.sh`.
