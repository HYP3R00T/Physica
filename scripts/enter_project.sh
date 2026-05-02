#!/usr/bin/env bash
set -eu

# Ensure Commitizen (cz) is available
if ! command -v cz >/dev/null 2>&1; then
    uv tool install commitizen
    command -v cz >/dev/null 2>&1 || { echo "Failed to install commitizen"; exit 1; }
fi

# Ensure prek is installed and hooks are set up idempotently
if command -v prek >/dev/null 2>&1; then
    # Check if pre-commit hook is already installed
    if [ ! -x .git/hooks/pre-commit ] || ! grep -q "prek" .git/hooks/pre-commit 2>/dev/null; then
        prek install --overwrite >/dev/null
    fi

    # Check if commit-msg hook is already installed
    if [ ! -x .git/hooks/commit-msg ] || ! grep -q "prek" .git/hooks/commit-msg 2>/dev/null; then
        prek install --hook-type commit-msg --overwrite >/dev/null
    fi
fi
