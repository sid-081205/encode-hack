#!/bin/bash

# Create data directory if it doesn't exist
mkdir -p /app/data

# Run database migrations
npx prisma db push --force-reset

echo "Database initialized successfully!"