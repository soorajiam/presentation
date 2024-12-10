#!/bin/bash

# Apply schema
echo "Applying schema..."
wrangler d1 execute quiz-app-db --file=./server/database/migrations/schema.sql --remote

# Run the seeding script
echo "Seeding database..."
wrangler d1 execute quiz-app-db --command="$(cat server/database/seed.sql)" --remote 