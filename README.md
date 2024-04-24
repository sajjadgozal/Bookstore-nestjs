# Bookstore api 

## generate .env from .env.example 
docker compose up --build

## swagger
http://localhost:3000/api

## pgAdmin
http://localhost:5050

## seed Users : 
only in dev env , 

 [ user@a.a - admin@a.a - manager@a.a ] , password of all: password

 ## guard
 all routes are admin guarded by default, they get public by making rule on them  