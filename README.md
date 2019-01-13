[![Build Status](https://travis-ci.org/fuchodeveloper/population-management.svg?branch=master)](https://travis-ci.org/fuchodeveloper/population-management)
<a href='https://coveralls.io/github/fuchodeveloper/population-management?branch=master'><img src='https://coveralls.io/repos/github/fuchodeveloper/population-management/badge.svg?branch=master' alt='Coverage Status' /></a>


# population-management
A Population Management System that contains a list of locations and the total number of residents in each location broken down by gender.

## Install app dependencies
- Install command: `npm install`

## Running app
- Start command: `npm start`

## API Operations
- Create a location: http://localhost:8080/api/v1/locations/create (POST)
- Create a resident: http://localhost:8080/api/v1/residents/create (POST)
- Get all locations: http://localhost:8080/api/v1/locations/getAll (GET)
- Update a location: http://localhost:8080/api/v1/locations/update/:locationId (PUT)
- Delete a location: http://localhost:8080/api/v1/locations/delete/:locationId (DELETE)

## Author
- Fredrick Mgbeoma