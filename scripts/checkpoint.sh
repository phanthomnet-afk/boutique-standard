#!/bin/bash
# Usage: ./scripts/checkpoint.sh "before-client-report-build"

set -e

NAME="$1"

if [ -z "$NAME" ]; then
  echo "Usage: ./scripts/checkpoint.sh <checkpoint-name>"
  echo "Example: ./scripts/checkpoint.sh before-client-report"
  exit 1
fi

TIMESTAMP=$(date +"%Y-%m-%d-%H%M")
TAG="checkpoint/${TIMESTAMP}-${NAME}"

echo "Creating checkpoint: $TAG"

# Stage all changes
git add -A

# Commit with checkpoint prefix
git commit -m "CHECKPOINT: ${NAME} (${TIMESTAMP})" \
  --allow-empty \
  -m "Restore: git checkout ${TAG}" \
  -m "Restore file: git checkout ${TAG} -- path/to/file"

# Tag the commit
git tag "$TAG"

echo ""
echo "Checkpoint created: $TAG"
echo ""
echo "To restore everything:"
echo "  git checkout $TAG"
echo ""
echo "To restore one file:"
echo "  git checkout $TAG -- apps/web/app/(public)/page.tsx"
echo ""

# Update SNAPSHOTS.md
echo "Updating SNAPSHOTS.md..."
node scripts/update-snapshots.js "$TAG" "$NAME" "$TIMESTAMP"

echo "Done."
