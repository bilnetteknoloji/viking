#!/bin/bash

# Get database URL from environment variable
DB_URL=$SUPABASE_DB_URL

if [ -z "$DB_URL" ]; then
    echo "Error: SUPABASE_DB_URL environment variable is not set"
    exit 1
fi

# Vacuum analyze all tables
psql $DB_URL -c "VACUUM ANALYZE;"

# Reindex all tables
psql $DB_URL -c "REINDEX DATABASE ${DB_NAME};"

# Update table statistics
psql $DB_URL -c "ANALYZE VERBOSE;"

echo "Database maintenance completed"
