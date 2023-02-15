# GLITTER FRONTEND
Link: [Glitter design doc](https://github.com/No-Woman-No-Work/Glitter-Vue#readme)

Frontend: [Glitter frontend](https://github.com/No-Woman-No-Work/Glitter-Vue)

Author(s): Andrea Ares Fernandez, Emma Alonso McCoy, Nelanyi Ruiz Contreras, Silvia Pescador López, Mariana Antoniol.

Status: [Draft]

Last updated: 13/02/2023

## Contenido
- Downloading
- Installation
- Goals
- Background
- Design and Architecture
- Considerations
# GLITTER BACKEND
Link: [Glitter design doc](https://github.com/No-Woman-No-Work/Glitter-api/blob/main/README.md)

Backend: [Glitter backend](https://github.com/No-Woman-No-Work/Glitter-api/blob/main/README.md)

Author(s): Andrea Ares Fernandez, Emma Alonso McCoy, Nelanyi Ruiz Contreras, Silvia Pescador López, Mariana Antoniol.

Status: [Draft]

Last update: 15/02/2023

## Content
- Downloading
- Installation
- Goals
- Background
- Design and Architecture
- Considerations


## Downloading
Glitter is currently hosted on GitHub. The frontend of the project can be found at [this link](https://github.com/No-Woman-No-Work/Glitter-Vue), and the backend can be found at [this link](https://github.com/No-Woman-No-Work/Glitter-api).

If you want to follow the development of the Glitter frontend, you can download the source code via Git clone.

```
git clone + project link
```

## Installation

Project setup

```
npm install
```

Initialise a new database with the default injected data in the glitter collection

```
node init-db.js  // npm run init-db
```

Start the server

```
node app.js      //   npm start
```

## Endpoints

URL base = http://localhost:3000

### User register
**POST /auth/register**
Register a new user.

### User login
**POST /auth/login**
Log in a user and return a JSON Web Token.

### Verify token
**GET /auth/verify-token**
Verify if the token is correct.

### Forgot password
**POST /auth/forgot-password**
Create a recoverPasswordToken and send an email to the user.

### Reset password
**POST /auth/reset-password**
Reset a user's password once the recoverPasswordToken has been confirmed.

### List glits
- For the public zone: **GET /glits/** 
- For the private zone: **GET /glits/private** 

### Create new glit
**POST /glits/**
Optional image upload.

### Delete glit
**DELETE /glits/:glitId**
Only delete glit of logged author.

### Give kudos to a glit
**POST /:glitId/kudos**

### Delete kudos to a glit
**DELETE /glits/:glitId/kudos**

### Follow new user
**POST /users/:userId/follow**
User logged cannot follow himself.
### Unfollow new user
**DELETE /users/:userId/follow**


## Goals
Final Project for the Women in Tech Bootcamp.

The aim of this project is to apply all the acquired skills, simulating a real situation: the development of a project using iterations and making architectural decisions within a deadline, which is the reason why we decided to develop Glitter.

_Glitter is a micro-content platform created with the following objectives:_ 

- To provide a user-friendly interface that provides a simple navigation and interaction with the application.

- To offer an easy registration process to the system, allowing to perform functions as a member of the platform by indicating user name, e-mail address and password while guaranteeing data security by strong authentication and authorisation mechanisms.

![input](https://user-images.githubusercontent.com/50715363/215982356-72e9a497-cc91-4109-97d7-595d5b2a9f19.png)

- To allow logging into the platform's private area and being able to access all the platform's functionalities.

![input](https://user-images.githubusercontent.com/50715363/215983030-9a6ed6fd-03b7-47e8-82d6-545bbcdab9a0.png)

- Create publications through a user-friendly form where all the fields that make up a publication can be filled in.

![input](https://user-images.githubusercontent.com/50715363/216117628-caad82ab-c973-4f93-89fa-94ebc7c9faa5.png)

- To easily access a list of the latest publications, with two possible views: Public and Private. This last view will depend on the option to follow users and access their posts in a personalised feed.

![input](https://user-images.githubusercontent.com/50715363/216122456-a706d9cc-5c74-4b36-ab57-6801f8742725.png)

## Background
It is a good time to create an alternative platform to Twitter given the situation that Twitter is going through. We believe that this is an ideal project to boost our backend and frontend skills to meet the needs and provide value.

## Design and Architecture
Glitter is a web application developed with a cutting-edge technology stack. It consists of a backend built with Node.js, Express, and MongoDB, and a frontend developed with Javascript and the Vue 3 framework.

Glitter's frontend has been built with Vue Composition API and styled with Bootstrap. The connection with the backend has been made via Axios, while Vuex has been used as a state handler. In addition, adaptations (transpilers) to older Javascript engines, such as Babel and Webpack, have been implemented to ensure cross-browser compatibility.

The Glitter backend uses Mongoose to connect to the noSQL MongoDB database. It has an authentication system based on Json Web Token and a mailing system implemented with MailJet. In addition, internal development testing tools, such as Postman, have been used to ensure the quality and stability of the application.

In short, Glitter is a powerful and versatile web application, built with the latest technologies and adapted to work on all devices thanks to its responsive design.

![input](https://user-images.githubusercontent.com/50715363/218560841-5ae5c39a-f3d8-4b0e-aab0-e9fe8a2cf7b6.png)

## Considerations
- Scalability: the application must be scalable to handle an increasing amount of users and data. It is important to consider how scalability mechanisms will be implemented from the beginning.

- Compatibility with different browsers and devices: the application should be compatible with a wide range of browsers and devices, including mobile devices. It is important to consider how compatibility will be ensured throughout development.

