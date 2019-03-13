[![Build Status](https://travis-ci.org/murediane/EPIC-mail.svg?branch=develop)](https://travis-ci.org/murediane/EPIC-mail)
[![Coverage Status](https://coveralls.io/repos/github/murediane/EPIC-mail/badge.svg?branch=bg-test-endpoints-164432374)](https://coveralls.io/github/murediane/EPIC-mail?branch=bg-test-endpoints-164432374)
[![Maintainability](https://api.codeclimate.com/v1/badges/32af42942c13104511d7/maintainability)](https://codeclimate.com/github/murediane/EPIC-mail/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/32af42942c13104511d7/test_coverage)](https://codeclimate.com/github/murediane/EPIC-mail/test_coverage)

# Epic-Mail

is a messaging platform that allows people to send simple messages to individuals and groups

# Technologies used are :

Node js/Express
ESLint
moocha and chai for testing

#What is the structure of epic mail
Epic mail has UI folder that contains the front end that means it includes
-pages
-css
-javascript
-and images
It also has a Server folder that contains the endpoints
the servers subfolder are
-config
it contains the general configuration
-controller
contains handle functions
-helpers
contains validation of the objects
-midleware
contains error handling,api route configuration and header configuration
-models
contains database or data structure containing data
-routes
contains all URL to the endpoints

to test if the enpoint works make sure you have node js installed and run npm run server command

there is another folder called test
it contains all the test for the apis
| api number | Urls |
| ---------- : |:-----------------: |
| 1 | POST API/V1/auth/signup |
| 2 | POST api/v1/auth/login |  
| 3 | POST api/v1/messages |  
| 4 | Get api/v1/messages |
| 5 |GET api/v1/messages/:Id |
| 6 |GET api/v1/messages/sent |
| 7 |GET api/v1/messages/unread|
| 8 |delete api/v1/messages/:id|

# to test the project clone it and install package.json,after run npm run server

for TDD run npm run test
