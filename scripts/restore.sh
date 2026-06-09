#!/bin/bash
# Usage: ./scripts/restore.sh
# Lists checkpoints and lets you choose one

set -e

echo "Available checkpoints:"
echo ""
git tag -l "checkpoint/*" | sort -r | head -20 | \
  nl -w2 -s". "

echo ""
echo "To restore everything to a checkpoint:"
echo "  git checkout <tag-name>"
echo ""
echo "To restore one folder to a checkpoint:"
echo "  git checkout <tag-name> -- apps/web/components/"
echo ""
echo "To restore one file:"
echo "  git checkout <tag-name> -- apps/web/app/(public)/page.tsx"
echo ""
echo "To see what changed since a checkpoint:"
echo "  git diff <tag-name> HEAD"
echo ""
echo "To list all checkpoints:"
echo "  git tag -l 'checkpoint/*' | sort -r"
