#!/bin/sh

# Apply database migrations
python drf_backend/manage.py migrate
python drf_backend/manage.py collectstatic --noinput
# Start the server
exec "$@"
