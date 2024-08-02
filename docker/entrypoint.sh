#!/bin/sh

# Apply database migrations
python drf_backend/manage.py migrate
ls -a
# Start the server
exec "$@"
