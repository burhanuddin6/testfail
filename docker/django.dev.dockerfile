# Use an official Python runtime as a parent image
FROM python:3.12

# Set the working directory in the container
WORKDIR /backend

# Copy the requirements file into the container
COPY /backend/requirements.txt /backend/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY ./backend/ /backend/

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Add the entrypoint script
COPY ./docker/entrypoint.sh /backend/entrypoint.sh

# Ensure the entrypoint script is executable
RUN chmod +x /backend/entrypoint.sh

# Run the entrypoint script
ENTRYPOINT ["/backend/entrypoint.sh"]

CMD ["python", "drf_backend/manage.py", "runserver", "0.0.0.0:8000"]

