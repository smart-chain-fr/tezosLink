# Tezos Link

[![Go Report Card](https://goreportcard.com/badge/github.com/octo-technology/tezos-link)](https://goreportcard.com/report/github.com/octo-technology/tezos-link)

Tezos link is a gateway to access to the Tezos network aiming to improve developer experience when developing Tezos dApps.

# Table of Contents

- [Project organization](#project-organization)
- [Run services locally on the machine](#run-services-locally-on-the-machine)
- [Build all services](#build-all-services)
- [Tests all services](#tests-all-services)
- [Frontend](#frontend)
- [Services](#services)
  - [API](#api)
  - [Proxy](#proxy)
  - [Snapshot exporter](#snapshot-exporter)
- [Infrastructure](#infrastructure)
  - [Architecture](#architecture)
  - [Requirements](#requirements)
  - [How To Deploy](#how-to-deploy)
- [Documentation](#documentation)
- [References](#references)

# Project Organization

The repository is currently following this organization:

```
src
├── api          # api source code (rest api)
├── common       # common files across services
├── entries      # entry points
├── rpc-gateway  # rpc-gateway source code (proxy)
└── test        # test-specific files (e.g. mocks)
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

#### Api

```bash
$> npm install
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


