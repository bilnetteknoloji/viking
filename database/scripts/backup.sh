#!/bin/bash

# Get current date for backup file name
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_DIR="../backups"

# Create backups directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Get database URL from environment variable
DB_URL=$SUPABASE_DB_URL

if [ -z "$DB_URL" ]; then
    echo "Error: SUPABASE_DB_URL environment variable is not set"
    exit 1
fi

# Create backup
pg_dump $DB_URL > "$BACKUP_DIR/backup_$DATE.sql"

# Keep only last 7 backups
cd $BACKUP_DIR
ls -t | tail -n +8 | xargs -I {} rm -- {}

echo "Backup completed: backup_$DATE.sql"
