# Hired

Hired is a Full Stack project in which this is the back-end repository. To check the front-end repository which is built on React.js click [HERE](https://github.com/patybn3/hired-client-react). This application used Heroku for version control which can be accessed [HERE](https://sleepy-coast-97158.herokuapp.com/) . The vision behind this application is to build a virtual "meet an hire" where an employer, or authenticated user can look for candidates. The first version of this app simply displays a list of the candidates. Second version will include pictures (app is already set up for AWS), posts and likes and the third version will allow a user to search for key words to find the candidates.

## express-api-template

A template for starting projects with `express` as an API. Includes
authentication and common middlewares. Access template page [HERE](https://git.generalassemb.ly/ga-wdi-boston/express-api-template)

## Installation

1. [Download](../../archive/master.zip) this template.
1. Move the .zip file to your `sei/projects/` directory and Unzip it (creating a
   folder) -- **NOTE:** if the folder was already unzipped, use the `mv` command
   line to move it to the `sei/projects/` directory.
1. Rename the directory from express-api-template -> your-app-name.
1. Empty [`README.md`](README.md) and fill with your own content.
1. Move into the new project and `git init`.
1. Replace all instances of `'express-api-template'` with your app name.
1. Install dependencies with `npm install`.
1. Ensure that you have `nodemon` installed by running `npm install -g nodemon`.
1. Ensure the API is functioning properly by running `npm run server`.
1. Once everything is working, make an initial commit.
1. Follow the steps in [express-api-deployment-guide](https://git.generalassemb.ly/ga-wdi-boston/express-api-deployment-guide)

## Structure

Dependencies are stored in [`package.json`](package.json).

The most important file for understanding the structure of the template is
`server.js`. This is where the actual Express `app` object is created, where
the middlewares and routes are registered, and more. To register a routefile,
follow the pattern established here with `exampleRoutes` and `userRoutes`. If
you want to add any middlewares to your app, do that here.

The `app` directory contains models and route files. Models are simply Mongoose
models. To create your own, follow the patterns established in
`app/models/example.js`. Route files are somewhat similar to controllers in
Rails, but they cover more functionality, including serialization and deciding
which HTTP verbs to accept and what to do with them.

The `config` directory holds just `db.js`, which is where you specify the name
and URL of your database.

The `lib` directory is for code that will be used in other places in the
application. The token authentication code is stored in `lib/auth.js`. The
other files in `lib` deal with error handling. `custom_errors.js` is where all
the different custom classes of errors are created. If you need some other kind
of error message, you can add it here. There are also some functions defined
here that are used elsewhere to check for errors. `lib/error_handler.js` is a
function that will be used in all your `.catch`es. It catches errors, and sets
the response status code based on what type of error got thrown.

You probably will only need to interact with files in `app/models`,
`app/routes`, and `server.js`. You'll need to edit `db/config.js` just once,
to change the name of your app.

## Requirements

Use the technologies of your choice for this project. The front and the back-end of this application are to be built individually. Both front-end and back-end are to be stored in a public GitHub account. The back-end of the web application also uses Heroku as the server. Changes made are to be commited and deployed often to both GitHub and Heroku to keep the records up to date. Application must be functional and follow the following MVP specifications:

Version Control Demonstrate using version control by:

Sharing your work through a git repository hosted on Github. Making frequent, cohesive commits dating back to the first day of the project week. 1 commit on the first day of project week on both repos. At least 1 commit every day during project week (not necessarily on both repos).

Signup with email, password, and password confirmation. Login with email and password. Logout when logged in. Change password with current and new password. Signup and Signin must only be available to not signed in users. Logout and Change password must only be available to signed in users. Give feedback to the user after each action's success or failure. All forms must clear after submit success and user sign-out (Optional) Reset form to initial state on failure Client Specifications Use a front-end Javascript app to communicate with your API (both read and write) and render data that it receives in the browser.
Create a joint table for a resource and allow the user to create, edit and delete resources.

Your app must not:

Rely on refreshing the page for any functionality. Have any user-facing bugs. Display non-functional buttons, nor buttons that do not successfully complete a task. Show actions at inappropriate times (example: change password form when a user is not signed in). Forms not clearing at appropriate times (example: sign up form not clearing after success). Use alerts for anything. Display errors or warnings in the console. Display debugging messages in the console.

## Technologies:

 - MongoDB NoSQL.
 - Express.js.
 - Mongoose.
 - GitHub.
 - Git.
 - Heroku.
 - JavaScript.
 - Node.js:
   - Passport (for authentication).
   - bcrypt (cryptography).
   - CORS.
   - dotenv (environment management).
   - jsonwebtoken.

   ## Planning

   ### User Stories

   1. Vesion 1:
     - As a user I would like to be able to sign up
     - As a user I would like to be able to sign in
     - As a user I would like to be able to change my password
     - As a user I would like to be able to select if I am a candidate or an employer
     - As a user I would like to be able to log out
     - As a user I would like to be have my own profile
     - As a user I would like to be to share a profile picture
     - As a user I would like to be able to edit my profile
     - As a user I would like to be able delete my profile
     - As a user I would like to be able create my profile
     - As a user I would like to be able to add my contact information

   2. Version 2:
     - As a user I would like to be able to have a contact form
     - As a user I would like to be able to see who contacted me
     - As a user I would like to be able to create posts
     - As a user I would like to be able to like posts and have my posts liked
     - As a user I would like to be able to comment on my posts and other post

   ### Schedule

   the following schedule was followed:

   Set Up
   API

    Download Express API Template or Download Rails API Template
    Create a Github Repository
    Deploy to Heroku with Express or Deploy to Heroku with Rails
   Client

    Download Browser Template or Download React Auth Template
    Create a Github Repository
    Deploy to Github Pages with Browser Template or Deploy to Github Pages with React Auth Template
   API
    Review express-api or rails-api
    Create your resource and end points
    Test your resource's end points with curl scripts
    Add the relationship to a User
    Add User ownership to resource controller
   Client
    Review jquery-ajax-token-auth or react-auth
    Sign Up (curl then web app)
    Sign In (curl then web app)
    Change Password (curl then web app)
    Sign Out (curl then web page)
    All API calls have success or failure messages
    Review jquery-ajax-crud or react-crud
    Create resource (curl then web app)
    Get all of their owned resources (curl then web app)
    Delete single resource (curl then web app)
    Update single resource (curl then web app)
   Final Touches
    README
    Troubleshoot/Debug
    Style

## ERD
<img width="561" alt="Screen Shot 2020-04-02 at 10 12 38 PM" src="https://user-images.githubusercontent.com/59259041/78317046-37e6b280-752f-11ea-8903-51b160435287.png">
<img width="634" alt="Screen Shot 2020-04-02 at 10 12 42 PM" src="https://user-images.githubusercontent.com/59259041/78317056-4208b100-752f-11ea-998a-3c075689ed0a.png">
