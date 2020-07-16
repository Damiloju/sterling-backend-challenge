# Software Developer Application Test

Create an API that serves the latest scores of fixtures of matches in a “Mock Premier League”

## Features

**Admin accounts** which are used to

- signup/login
- manage teams (add, remove, edit, view)
- create fixtures (add, remove, edit, view)
- Generate unique links for fixture

**Users accounts** who can

- signup/login
- view teams
- view completed fixtures
- view pending fixtures
- obustly search fixtures/teams

> Only the search API should be availble to the public.

## Technologies

- NodeJs (JavaScript)
- MongoDB
- Redis
- Docker
- POSTMAN
- Jest
- Express

## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node.js
- Docker
- Redis

- To run:

```sh
git clone <git@github.com:Damiloju/sterling-backend-challenge.git>
cd sterling-backend-challenge
npm install
copy .env.example  .env
Fill in needed env values
npm run dev
```

## Docker Development Setup

- Install Docker
- Change to application root directory
- Build a docker image with the following command `docker build -t sterling-backend-challenge .`
- Run `docker-compose up -d`
- Stop Container `docker-compose down`

## Testing

```sh
npm run test
```

## API

The API is hosted at
[Api URL](https://sterling-backend-challenge.herokuapp.com/api/v1)

## API Documentation

[Postman Documentation](https://documenter.getpostman.com/view/2028908/T17Q6Qgi?version=latest)
