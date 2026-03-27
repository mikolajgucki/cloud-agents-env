# AGENTS.md

## Cursor Cloud specific instructions

This is a minimal shell-script repository (`cloud-agents-env`). There are no frameworks, package managers, build systems, tests, or linters.

### Repository contents

- `README.md` — project title only.
- `setup.sh` — a shell script that sends an HTTP POST via `curl`.

### Prerequisites

The only system dependency is `curl`, which is pre-installed in the Cloud Agent VM.

### Running the application

```bash
bash setup.sh
```

This executes a single `curl` POST request. There is no long-running service.

### Notes

- The `.cursor/environment.json` that previously existed referenced a deleted `Dockerfile` and was removed because it was broken. Snapshot-managed environment settings are used instead.
- There are no tests, no linters, and no build steps in this repository.
