# envx

> Never deploy with a broken `.env` again — validate, diff, and sync environment files in one command.

[![CI](https://github.com/long260398/envx/actions/workflows/ci.yml/badge.svg)](https://github.com/long260398/envx/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/%40long260398%2Fenvx.svg)](https://www.npmjs.com/package/@long260398/envx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)

## Demo

```
$ envx check

✗ Missing keys (2):
  - DATABASE_URL
  - REDIS_URL

⚠ Empty values (1):
  ~ APP_KEY

3 issues found

$ envx sync

Added 2 keys to .env:
  + DATABASE_URL=
  + REDIS_URL=

$ envx check

✓ .env is valid
```

## Features

- **Catch broken deploys early** — spot missing keys before they cause production errors
- **Visual diff** — see exactly what's different between `.env` and `.env.example` at a glance
- **One-command sync** — copy missing keys from `.env.example` to `.env` automatically
- **Safe by default** — `--dry-run` previews all changes before writing anything
- **Custom paths** — works with any naming convention (`--env`, `--example` flags)
- **Zero config** — drop it into any project, no setup required

## Getting Started

### Prerequisites

- Node.js 18+

### Install globally

```bash
npm install -g @long260398/envx
```

### Or run without installing

```bash
npx @long260398/envx check
```

## Usage

```bash
# Check for missing or empty keys
envx check

# Show a visual diff
envx diff

# Add missing keys from .env.example to .env
envx sync

# Preview sync without writing
envx sync --dry-run

# Use custom file paths
envx check --env .env.staging --example .env.example
envx diff  --env .env.staging --example .env.staging.example
```

### In CI pipelines

```yaml
# GitHub Actions — fail the build if .env is out of sync
- run: npx @long260398/envx check
```

### In package.json scripts

```json
{
  "scripts": {
    "env:check": "envx check",
    "env:sync": "envx sync --dry-run",
    "predev": "envx check"
  }
}
```

## Stack

| | |
|---|---|
| Language | TypeScript 5 |
| Runtime | Node.js 18+ |
| CLI framework | Commander |
| Output | Chalk |

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

## License

[MIT](LICENSE)

## Support

If envx saves you from a broken deploy, consider [sponsoring on GitHub](https://github.com/sponsors/long260398).
