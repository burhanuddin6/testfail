#!/bin/sh

# Apply database migrations
python store/manage.py migrate

# Start the server
exec "$@"