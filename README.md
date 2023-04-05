# Tezos Link

[![Go Report Card](https://goreportcard.com/badge/github.com/octo-technology/tezos-link)](https://goreportcard.com/report/github.com/octo-technology/tezos-link)

Tezos link is a gateway to access to the Tezos network aiming to improve developer experience when developing Tezos dApps.

# Table of Contents

- [Project organization](#project-organization)
- [Run services locally on the machine](#run-services-locally-on-the-machine)
- [Tests all services](#tests-all-services)
- [Services](#services)
  - [API](#api)
  - [Proxy](#proxy)

# Project Organization

The repository is currently following this organization:

```
src
├── api          # api source code (rest api)
├── common       # common files across services
├── entries      # entry points
├── rpc-gateway  # rpc-gateway source code (proxy)
└── tests       # test-specific files (e.g. mocks)
```

## Run services locally on the machine with mockup blockchain node

> Blockchain nodes are mocked up for development environment the be as lightweight as possible.

### Requirements

- `Docker`
- `docker-compose`
- `Npm` (setup with 8.19.2)
- `Typescript` (setup with 4.9.4)
- `Node.js` (setup with 16.18.0)

### How to

To run services locally on the machine, you will need to run those commands :
##### Install all packages
```bash
$> npm install
```
#### Api

```bash
$> npm run api:dev
```

It will run:

- `tzlink-api`
- `postgres:11`

#### Rpc-gateway

```bash
$> npm run rpc-gateway:dev
```

It will run:

- `tzlink-rpc-gateway`

#### Cronjob

```bash
$> npm run cron:dev
```

It will run:

- `tzlink-cron`

## Test all services

### Requirements

- `Jest` (setup with 29.5.0)

For integrations tests only:

- `npm` (setup with 8.19.2)

### How to

To run the `unit tests`, you can use the command

```bash
$> npm run test
```
## Services

### API

REST API to manage projects and get project's metrics.

#### Dependencies

- `PostgreSQL` (setup with 11)

#### Environment variables 

##### Database

- `DATABASE_HOSTNAME` (default: `localhost`)
- `DATABASE_PORT` (default: `5432`)
- `DATABASE_USER` (default: `user`)
- `DATABASE_PASSWORD` (default: `pass`)
- `DATABASE_NAME` (default: `tezoslink`)
- `DEV_PRISMA_STUDIO_DB_URL` (default: `postgres://user:pass@localhost:5432/tezoslink`), 'prisma studio' needs this variable to execute migrations on the database

##### Api

- `API_LABEL` (default: `TezosLink API`)
- `API_PORT` (default: `3001`)
- `API_ROOT_URL` (default: `/api`)

##### Nodes

- `ARCHIVE_NODES_URL` 
- `ARCHIVE_NODES_PORT` 
- `ROLLING_NODES_URL`
- `ROLLING_NODES_PORT`
- `TEZOS_NETWORK` (default: `TESTNET`)

##### Prometheus
 
- `PROMETHEUS_URL`  (default: `http://localhost:9090`)
- `PROMETHEUS_NAMESPACE_TEZOSLINK`  (default: `tezoslink`)
- `PROMETHEUS_NAMESPACE_TEZOS_K8S_MAINNET` (default: `tezos_k8s_mainnet`)
- `PROMETHEUS_NAMESPACE_TEZOS_K8S_TESTNET` (default: `tezos_k8s_testnet`)

### Proxy

- HTTP proxy in front of the nodes to handle CORS and rate limiting


#### Dependencies

- `PostgreSQL` (setup with 11)

#### Environment variables 

##### Database

- `DATABASE_HOSTNAME` (default: `localhost`)
- `DATABASE_PORT` (default: `5432`)
- `DATABASE_USER` (default: `user`)
- `DATABASE_PASSWORD` (default: `pass`)
- `DATABASE_NAME` (default: `tezoslink`)
- `DEV_PRISMA_STUDIO_DB_URL` (default: `postgres://user:pass@localhost:5432/tezoslink`), 'prisma studio' needs this variable to execute migrations on the database

##### RPC Gateway

- `RPC_GATEWAY_LABEL` (default: `TezosLink RPC Gateway`)
- `RPC_GATEWAY_PORT` (default: `3002`)
- `RPC_GATEWAY_ROOT_URL` (default: `/rpc`)
