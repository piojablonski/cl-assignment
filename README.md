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


## Running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
