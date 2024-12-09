<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Bankuish Challenge

#### This project is the backend implementation for the Bankuish Challenge, a technical assessment demonstrating proficiency with NestJS, TypeScript, and Dockerized environments. The backend processes courses, handles prerequisites, and includes user authentication via Firebase.


## Features

* Authentication: Firebase-based authentication and authorization.
* Endpoints Documentation: Auto-generated Swagger API available at /api.
* Testing: Includes unit and e2e tests using Jest.
* Docker Support: Seamless setup with Docker Compose.

## Prerequisites

* Node (v18 or higher recommended)
* Yarn
* Docker and Docker Compose

## Installation

1. Clone de repository
```
git clone https://github.com/SamuGauna/bankuish-challenge.git
cd bankuish-challenge
```
2. Install dependencies
```
yarn install
```
3. Set environment variables
```
cp example.env .env
```
#### Key enviroment variables include:
* NODE_ENV: Application environment (development, test, staging, production). Default is development.
* APP_PORT: Port on which the app runs.
* LOGGER_LEVEL: Logging level (error, warn, info, debug, log, silent).
* DB_HOST: Database host.
* DB_PORT: Database port.
* DB_USERNAME: Database username.
* DB_PASSWORD: Database password.
* DB_NAME: Database name.
* FIREBASE_PROJECT_ID: Firebase project ID.
* FIREBASE_PRIVATE_KEY: Firebase private key.
* FIREBASE_CLIENT_EMAIL: Firebase client email.
* FIREBASE_API_KEY: Firebase client API key.
* FIREBASE_AUTH_DOMAIN: Firebase auth domain.

## Running the Project
1. Start with Docker Compose
```
docker-compose up --build
```
2. Start Locally (Non-Docker)
```
yarn start:dev
```

## Testing
1. Unit Test
```
yarn test
```
2. e2e Tests
```
yarn test:e2e
```
3. Coverage report
```
yarn test:cov
```

## Project Structure

The project adheres to the NestJS default structure, ensuring consistency and maintainability.


## Dependencies
#### Main Libraries
* Nest.js
* TypeORM
* Firebase
* Swagger
* Jest
#### Dev tools
* ESLint
* Prettier
* Docker Compose

## API Documentation
Swagger API documentation is available at:
```
http://localhost:<APP_PORT>/api
```

## Notes

* Ensure that the .env file is configured correctly before running the project.
* The project is tailored for the Bankuish Challenge and follows best practices for backend development.
