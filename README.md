## Description
Colkie Backend Code Challenge

## Decisions
Documented thought process and decisions: [Link](DECISIONS.md)

## Installation

```bash
$ npm install
```

## Building and running for development

```bash


# run a database 
$ docker run -d -p 6379:6379 redis:7.0.11

# create .env file, modify if necesary
$ cp env.example .env

# development
$ npm run start

# watch mode
$ npm run start:dev
```

- application is available on http://localhost:3000
- api documentation is available on http://localhost:3000/api

## Building and running for production

```bash

docker build -t colkie-assignment .

# run the application on default port 3000
# application is available on http://localhost:3000
# api documentation is available on http://localhost:3000/api
docker run -d -p 3000:3000 colkie-assignment

# check if app is up and running
curl http://localhost:3000/healthz
```

## Running automated tests

```bash
# download redis image before running the tests to avoid timeout
$ docker pull redis:7.0.11

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
