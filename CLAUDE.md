# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a fork of [sipeed/NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB) browser component, adapted for Cloudflare Workers deployment. The project automatically syncs with the upstream repository and applies custom patches.

**Original project**: [usbkvm.sipeed.com](https://usbkvm.sipeed.com)

## Architecture

### Auto-Sync Workflow

The GitHub Actions workflow (`.github/workflows/main.yml`) runs daily (cron: `0 0 * * *`) to:

1. **Clone upstream** from `sipeed/NanoKVM-USB` (main branch, depth 1)
2. **Sync files** using `rsync --delete` to mirror the `browser/` directory
3. **Apply patches** from `patch/*.patch` using `git apply --reject`
4. **Commit & push** changes automatically via external Git.sh script

**Protected directories** (not synced from upstream):
- `.github/` - Contains workflows
- `wrangler.jsonc` - Cloudflare Workers configuration
- `patch/` - Custom patch files

### Patch System

Custom modifications are stored as git patch files in the `patch/` directory:

1. Create patches: `git diff > patch/my-change.patch`
2. Workflow applies them automatically after sync
3. Uses `--reject` flag - conflicts create `.rej` files instead of failing
4. Empty `patch/` directory is safely ignored

## Development

**Tech stack**: React + TypeScript + Vite + TailwindCSS + Antd + Jotai (state management)

```bash
# Install dependencies
pnpm install

# Development server (port 3001)
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint
```

## Deployment

Built files go to `dist/` directory, which is served via Cloudflare Workers (configured in `wrangler.jsonc`).

**Note**: This repo does not use pnpm lockfiles - they are removed during sync (`pnpm-*.yaml`).
