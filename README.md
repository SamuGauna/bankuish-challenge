<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Bankuish Challenge

#### This project is the backend implementation for the Bankuish Challenge, a technical assessment demonstrating proficiency with NestJS, TypeScript, and Dockerized environments. The backend processes courses, handles prerequisites, and includes user authentication via Firebase.

## Features

- Authentication: Firebase-based authentication and authorization.
- Endpoints Documentation: Auto-generated Swagger API available at /api.
- Testing: Includes unit and e2e tests using Jest.
- Docker Support: Seamless setup with Docker Compose.

## Prerequisites

- Node (v18 or higher recommended)
- Yarn
- Docker and Docker Compose

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

- NODE_ENV: Application environment (development, test, staging, production). Default is development.
- APP_PORT: Port on which the app runs.
- LOGGER_LEVEL: Logging level (error, warn, info, debug, log, silent).
- DB_HOST: Database host.
- DB_PORT: Database port.
- DB_USERNAME: Database username.
- DB_PASSWORD: Database password.
- DB_NAME: Database name.
- FIREBASE_PROJECT_ID: Firebase project ID.
- FIREBASE_PRIVATE_KEY: Firebase private key.
- FIREBASE_CLIENT_EMAIL: Firebase client email.
- FIREBASE_API_KEY: Firebase client API key.
- FIREBASE_AUTH_DOMAIN: Firebase auth domain.

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

- Nest.js
- TypeORM
- Firebase
- Swagger
- Jest

#### Dev tools

- ESLint
- Prettier
- Docker Compose

## API Documentation

Swagger API documentation is available at:

```
http://localhost:<APP_PORT>/api
```

## Notes

- Ensure that the `.env` file is configured correctly before running the project.
- The project is tailored for the Bankuish Challenge and follows best practices for backend development.

## ⚠️ Note on Test Coverage

The system implements unit tests and end-to-end (e2e) tests to validate the functionality of the endpoints and the expected application behavior. However, please consider the following:

- **Test Coverage:**  
  The unit and e2e test coverage is not fully exhaustive due to time and resource constraints. A functional implementation of necessary tests was performed to validate the main logic.

- **Test Database Environment:**  
  Instead of setting up a dedicated test database, the application uses the existing database environment for testing purposes. This choice allowed faster testing and validation of routes in a real-world-like environment.

- **Practical Approach:**  
  Due to time constraints in the challenge, this approach was implemented as a temporary solution. In a real-world scenario, it is recommended to configure a dedicated test database and adapt the test suite to ensure more comprehensive coverage.

Thank you for your understanding and for taking the time to review the code and tests. If you have any further questions or need additional clarifications, feel free to reach out!

