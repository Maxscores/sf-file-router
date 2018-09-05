# sf-file-router
A lightweight express application for interacting with the salesforce API


## Installation

Make sure you have [Node](https://nodejs.org/en/) installed

Clone the repo to your local machine:
`git clone https://github.com/Maxscores/sf-file-router.git`

Move to the directory:
`cd sf-file-router`

Run npm Install:
`npm install`

Start the app:
`node app.js`

In a web browser visit:
`https://localhost:3000/[yourSFlogin@example.org.com]/[yourPasswordAndSecurityToken]/[sfParentObject]/[filename]`

** Note - the file must be in same directory as the project

You should see a JSON response with the first 10 accounts returned


## Key Libraries
[JSForce](https://jsforce.github.io/)
[Express](https://expressjs.com)
