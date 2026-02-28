#!/usr/bin/env bash
# Pre-commit hook: block commits containing secrets or credentials.
# Scans staged file diffs for common secret patterns.

set -euo pipefail

patterns=(
  # Connection strings with passwords
  'postgresql://[^[:space:]]*:[^@[:space:]]+@'
  'postgres://[^[:space:]]*:[^@[:space:]]+@'
  'mysql://[^[:space:]]*:[^@[:space:]]+@'

  # Generic secret/token/key assignments with actual values
  'AUTH_SECRET=[^[:space:]]+'
  'AUTH_GITHUB_SECRET=[^[:space:]]+'
  'CLOUDFLARE_API_TOKEN=[^[:space:]]+'
  'DATABASE_URL=[^[:space:]]+'

  # AWS
  'AKIA[0-9A-Z]{16}'

  # Private keys
  '-----BEGIN .*PRIVATE KEY-----'

  # Common token patterns
  'sk_live_[0-9a-zA-Z]+'
  'ghp_[0-9a-zA-Z]{36}'
  'gho_[0-9a-zA-Z]{36}'
)

staged_diff=$(git diff --cached --diff-filter=ACMR -U0 -- . ':!scripts/check-secrets.sh' ':!*.example' ':!*.test.ts' ':!*.test.tsx' ':!*.md') || true

if [ -z "$staged_diff" ]; then
  exit 0
fi

found=0
for pattern in "${patterns[@]}"; do
  matches=$(echo "$staged_diff" | grep -nE "^\+" | grep -E -e "$pattern" || true)
  if [ -n "$matches" ]; then
    if [ "$found" -eq 0 ]; then
      echo "🚨 Possible secrets detected in staged changes:"
      echo ""
    fi
    echo "$matches"
    echo ""
    found=1
  fi
done

if [ "$found" -ne 0 ]; then
  echo "Commit blocked. Remove secrets before committing."
  echo "If this is a false positive, use: git commit --no-verify"
  exit 1
fi
