# Bookstore API

## Generate .env from .env.example 
To set up your environment variables, generate a `.env` file from `.env.example`.

## Docker run : 
docker compose up --build

## Local use : 
npm install 

and change environmental variables for db. (host)

## Swagger
Access the API documentation using Swagger UI:

[http://localhost:3000/api](http://localhost:3000/api)

## pgAdmin
Access pgAdmin for managing PostgreSQL databases:

[http://localhost:5050](http://localhost:5050)

## Seed Users
Seed users are available only in the development environment. Use the following credentials:

- Email addresses: `user@a.a`, `admin@a.a`, `manager@a.a`
- Password for all users: `password`

## Guard
All routes are admin-guarded by default. To make a route public, customize the guard rules accordingly.