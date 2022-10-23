# Notifier - Backend API that handles different message channels of notifications 

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).
The main intention is to demonstrate my skills in the backend side including the knowledge that I have as a cloud engineer

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

This service contains three lambda functions triggered by an HTTP request made on the provisioned API Gateway REST API `/categories` and `/notifications` route with `GET` method and `/notifications` also with `POST` method. 

For the `notifications` `POST` method the request body must be provided as `application/json`.

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. One missing step that should be included is to protect this endpoint with the authentication method of my choice, which probably could be cognito.

### Remotely

Go to these urls to see the different endpoints responses
```
curl --location --request POST 'https://myApiEndpoint/dev/hello' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Frederic"
}'
```

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `lambdas` - containing code base and configuration for my lambda functions
- `resources` - containing shared code base between your lambdas

```
.
├── src
│   ├── lambdas                     # Lambda configuration and source code folder
│   │   ├── category                # Logic to get the categories availables in the database
│   │   │   ├── serverless          # Files related with lambda, roles & policies required to configure the endpoint
│   │   │   │   ├── function.ts     # Define the api gateway route, role assignation & the http verb
│   │   │   │   └── resource.ts     # Define the role and policies of the lambda
│   │   │   │
│   │   │   └── src                 # File structure to handle a MVC pattern 
│   │   │       ├── Category.ts     # Lambda handler (front controller)
│   │   │       ├── Contract        # Folder to handle all the different interfaces required for the lambda
│   │   │       ├── Model           # Folder to define the business representation logic
│   │   │       ├── Repository      # Folder to handle the connection to the database
│   │   │       └── Service         # Folder to handle the main transformation logic to create the API's response
│   │   │
│   │   ├── notification            # Logic to represent the business world of notify the messages
│   │   │
│   │   └── user                    # Logic to handle the different actions of the users
│   │   
│   └── resources                   # Lambda shared code
│       └── dynamodb           # Folder that keep the file that creates each of the required dynamo db tables
│       └── policy             # Folder that keep the files that creates each generic policy 
│       └── role               # Folder that keep the file that creates the generic role
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
└── tsconfig.paths.json         # Typescript paths
```