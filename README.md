# terasys-mvp

A docker stack for dev and AWS EC2/ECS prod.

## dependencies

Ensure these are installed before going further:

- docker@^18.05.0-ce
- docker-compose@^1.21.2

## development

### 0. setup

    create .env from .env-lock for each service

### 1. run

    docker-compose up -d

You can begin editing code on your host machine, changes will be detected and all relevant processes restarted or live-reloaded inside their containers.

### 2. inspect

    docker-compose ps (print status)
    docker-compose logs api app (attaches to logs of one or more services)

## production

### 0. setup

    create .env from .env-lock for each service

### 1. run

    docker-compose up -d

### 2. inspect

    docker-compose -f docker-compose-prod ps
    docker-compose -f docker-compose-prod logs api app
