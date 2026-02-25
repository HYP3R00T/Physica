# Commit Message Generation

Follow Conventional Commits specification (conventionalcommits.org).

## Structure

```
<type>(<scope>): <description>
```

**Type** describes the nature of the change. **Scope** (optional) identifies which component is affected. **Description** explains what changed, in imperative mood, under 72 characters.

## Choosing the Type

The type reflects **what kind of change** this is, not where the change is located:

- `feat` - adds new capability or functionality to the application
- `fix` - corrects a bug or error in existing functionality
- `test` - adds, modifies, or fixes tests (no production code changes)
- `docs` - updates documentation only
- `refactor` - restructures code without changing behavior
- `chore` - build process, dependencies, tooling, configuration
- `style` - formatting, whitespace, linting (no logic changes)

## Choosing the Scope

Scope identifies **which component or module** is affected, not where the files live.

Examples:

- Changes to API service -> `(api)` not `(services)`
- Tests for API -> `test(api):` not `test(tests):` or `feat(tests):`
- Kubernetes manifests -> `(kubernetes)` or `(k8s)`

Scope is optional. Omit it when the change spans multiple components or is repository-wide.

## Description Guidelines

- Use imperative mood: "add", "fix", "update" (not "added", "fixed", "updated")
- Start with lowercase
- No period at the end
- Describe intent, not implementation details
- Keep under 72 characters total

## Valid Examples

```
feat(api): implement health check endpoint
fix(api): correct status code for failed health checks
test(api): add endpoint validation tests
docs: update API quickstart guide
refactor(config): simplify environment variable loading
chore(deps): upgrade fastapi to 0.130.0
```
