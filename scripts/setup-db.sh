#!/bin/bash
echo "Pulling Vercel environment variables..."
cd apps/web

# Pull production env vars
npx vercel env pull .env.local --environment=production

echo ""
echo "Running prisma db push..."
npx prisma db push

echo ""
echo "Seeding report data..."
cd ../..
npm run db:seed

echo ""
echo "Done. Your database is ready."
echo "Check SNAPSHOTS.md for the client report URL."
