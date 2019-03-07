[![Build Status](https://travis-ci.org/murediane/EPIC-mail.svg?branch=develop)](https://travis-ci.org/murediane/EPIC-mail)

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
