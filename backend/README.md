BACKEND README

# Getting started
In order to get started with the tech stack, please take a look at this [guide](https://burhanuddin6.github.io/blogsite/posts/django-react-setup/). 
This guide is NOT a tutorial but a place to start in order to get an overview of the application

Things in the Guide:
- Virtual Environment. Requirements for the backend are in a .txt file
- General guidelines and useful resources for building a Django Project
- File Structure of a Django project
- Useful management commands

</br></br>

# Authentication and Authorization

## Token Based Authentication 
Token based authentication is a choice but other authentication backends can also be used.
For Authentication and authorization, [Django Authemail](https://github.com/celiao/django-rest-authemail).
See the github it contains everything

## SSO
SSO is a requirement for products used by securiti AI. SSO needs to be implemented.

</br></br>

# Media and Files
- FIX: The ERD and the models as you will see contains Multiple Files tables, but the final application should contain a single files table and the other tables should have a many to many logic for the files. This will help to simplify the structure, make the backend more efficient, and make it easier to maintain files in the project

</br></br>

# Database

## Django ORM
ORM is one of the biggest reasons to chose Django as a backend framework. Writing raw SQL queries should be a last resort.

## Dev 
For dev, use sqlite as its is easier to use when making DB changes

## Production
For production, use a Postgres DB since it is best supported by Django ORM

</br></br>

# Migration from testrail
Testrail provides a way to export SQL. The schema of testrail db can be inspected through 
```
$ python3 path/to/manage.py inspectdb "name_of_db_in_settings.py" > models.py
```
Before doing this you need to export the raw sql from Testrail from Admin > Data Management > Export on Testrail. After that the data needs to be dumped to a mysql database. Testrail provides a Cassandra DB for files. The schema generated from testrail legacy_database is given in: 
```
backend/drf_backend/tcms/models/testrail_migrate.py
```
After inspection, it will give you models that can be mapped to the legacy_database. The mapping needs to be defined as a management commands.
One sample mapping is defined as the command
```
$ python3 path/to/manage.py testrail_migrate
```
The migration command is partially implemented in. Note that the command name will be same as the file name. The folder structure for managemnet command is very important
```
backend/drf_backend/tcms/management/commands/testrail_migrate.py
```

</br></br>

# Admin Panel
Django provides a default administration portal to directly edit DB. The admin portal is customizable The Admin panel of django will be used to 
- Manage User Acces and Permissions
- Manage User API key integrations
- Manage File Uploaded on the site
- Manage Export and importing data from CSV/EXCEL formats


