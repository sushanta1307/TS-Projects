# Service Registry CLI

## Purpose

Build a command-line tool for managing a local service registry. The CLI should let a developer register services, inspect what is registered, update metadata, remove stale entries, and export the registry for use by other tooling.

## Users

- Developers running multiple local or internal services.
- Tooling scripts that need a predictable machine-readable service index.
- Operators who need a quick way to inspect service ownership, endpoints, health check URLs, and runtime metadata.

## Core Requirements

### Initial Data Source

The first version will consume a dummy registry file at `src/service-registry-cli/data/dummy-registry.json`.

The CLI should read this JSON file, parse it into the service model, and then use that in-memory registry for commands such as `list`, `get`, and `export`. Later versions can add `add`, `update`, and `remove` commands that write changes back to a registry file.

### Service Model

Each registered service must include:

- `name`: Unique service identifier.
- `url`: Base URL for the service.
- `environment`: Environment name, such as `local`, `dev`, `staging`, or `prod`.
- `owner`: Team, person, or alias responsible for the service.

Each registered service may include:

- `description`: Short human-readable summary.
- `healthUrl`: URL used to check service health.
- `tags`: List of searchable labels.
- `metadata`: Additional key/value fields for project-specific data.

### Commands

The CLI must support these commands:

- `add`: Register a new service.
- `list`: Show registered services.
- `get`: Show one service by name.
- `update`: Modify an existing service.
- `remove`: Delete a service from the registry.
- `check`: Run health checks for one or more registered services.
- `export`: Write the registry to JSON for other tools.

### Persistence

- Store registry data locally in a JSON file.
- Default storage location should be deterministic and documented.
- Allow overriding the storage path with a CLI flag or environment variable.
- Writes must be atomic enough to avoid corrupting the registry during normal use.
- The CLI must create the registry file if it does not exist.

### Input and Validation

- Service names must be unique within the registry.
- URLs must be valid absolute URLs.
- Required fields must be validated before writing data.
- Unknown commands and invalid flags must return a non-zero exit code.
- Validation errors must explain which field failed and why.

### Output

- Human-readable output should be the default.
- Commands that produce data must support a `--json` flag for scripting.
- `list` should support filtering by environment, owner, and tag.
- `export` must produce stable, formatted JSON.

### Health Checks

- `check` should request each service's `healthUrl` when available.
- If `healthUrl` is not set, `check` may fall back to the service `url`.
- Health results should include service name, checked URL, status, latency, and error details when applicable.
- Failed checks must be visible in the command output and reflected in the exit code.

### Configuration

The CLI should support:

- `--registry <path>` to choose a registry file for a single command.
- `SERVICE_REGISTRY_PATH` to choose a default registry file.
- `--json` to print machine-readable output.
- `--help` for command usage.
- `--version` for the installed CLI version.

### Error Handling

- Missing registry files should be handled by creating an empty registry where appropriate.
- Malformed registry JSON must fail safely with a clear error message.
- Duplicate service names must be rejected on `add`.
- Removing or updating a missing service must return a clear not-found error.
- Network errors during health checks must not crash the CLI.

## Non-Functional Requirements

- Implement in TypeScript.
- Run on supported Node.js LTS versions.
- Keep the command behavior deterministic for testability.
- Avoid requiring a network connection except when running health checks.
- Keep registry data portable and readable as plain JSON.

## Acceptance Criteria

- A developer can add, list, inspect, update, remove, check, and export services from the terminal.
- All required fields are validated with useful error messages.
- JSON output is valid and suitable for shell scripts or CI jobs.
- Registry file location can be overridden per command and by environment variable.
- Health checks return a non-zero exit code when one or more services are unhealthy.
- Core command behavior is covered by automated tests.

