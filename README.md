# Fabric Angular

This repository contains a recruitment task related to Angular. The project leverages Office Fabric React components for Angular applications. If you’re interested in using these components, follow the instructions below.

## Getting Started

1. Clone the repository: </br>
   git clone https://github.com/konrad-wojda/fabric-angular.git

2. Navigate to the project directory: </br>
   cd fabric-angular/docker

3. Start the Docker containers: </br>
   docker-compose up

## Docker-composes:

There're two .yml files, one for building FastAPI as backend (docker-compose-fastapi.yml) and other is Nest.JS (default one). </br>
If You want to play with FastAPI instead of Nest.JS just change name of docker-compose.yml to something like docker-compose-nestjs.yml,
and than docker-compose-fastapi.yml rename to docker-compose.yml. That's all about BE swapping.

## URLs:

FE: localhost/list </br>
BE: localhost:8000/docs </br>
Now you’re all set! Enjoy working with the fabric-angular project. If you have any further questions or need additional assistance, feel free to ask! 😊

Angular 18 + Fabric.JS + FastAPI + SQLite + Docker </br>
PS. Adding for example PostgreSQL for BE is simple, just add FastAPI connection engine to PSQL and change docker-compose.yml adding (you can also check my other repo: "aplikacje-bazodanowe"):

      postgresql-db:
         container_name: db
         image: postgres:14.6
         restart: on-failure
         environment:
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: #your-password
            POSTGRES_DB: #db-name
            PGDAT: /var/lib/postgresql/data
         volumes:
            - ./postgres:/var/lib/postgresql/data
         networks:
            - drawing-network
         ports:
            - 5433:5432
