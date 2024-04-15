# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
git checkout dev-2
```

## Installing NPM modules

```
npm install
```

## Run Docker and migrations:

1. Move to root project directory in Terminal
2. Run **docker-compose up -d** or **sudo docker compose up -d** for launching
3. Execute script for create db: **sudo npm run db-init** or **npm run db-init**

## Running application

```
npm run start or npm run start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:port/doc/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```
