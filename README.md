# GLITTER
Link: [Glitter design doc](https://github.com/No-Woman-No-Work/flitter/blob/main/README.md)

Frontend: [Glitter frontend](https://github.com/No-Woman-No-Work/flitter)

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
# FLITTER
Link: [Flitter design doc](https://github.com/No-Woman-No-Work/flitter/blob/main/README.md)

Backend: [Flitter backend](https://github.com/No-Woman-No-Work/v1-Flitter-Back-)

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
Flitter is currently hosted on GitHub. The frontend of the project can be found at [this link](https://github.com/No-Woman-No-Work/flitter), and the backend can be found at [this link](https://github.com/No-Woman-No-Work/v1-Flitter-Back-).

If you want to follow the development of the Flitter frontend, you can download the source code via Git clone.

```
git clone + project link
```

## Installation



## Goals
Final Project for the Women in Tech Bootcamp.

The aim of this project is to apply all the acquired skills, simulating a real situation: the development of a project using iterations and making architectural decisions within a deadline, which is the reason why we decided to develop Flitter.

_Flitter is a micro-content platform created with the following objectives:_ 

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
Flitter is a web application developed with a cutting-edge technology stack. It consists of a backend built with Node.js, Express, and MongoDB, and a frontend developed with Javascript and the Vue 3 framework.

Flitter's frontend has been built with Vue Composition API and styled with Bootstrap. The connection with the backend has been made via Axios, while Vuex has been used as a state handler. In addition, adaptations (transpilers) to older Javascript engines, such as Babel and Webpack, have been implemented to ensure cross-browser compatibility.

The Flitter backend uses Mongoose to connect to the noSQL MongoDB database. It has an authentication system based on Json Web Token and a mailing system implemented with MailJet. In addition, internal development testing tools, such as Postman, have been used to ensure the quality and stability of the application.

In short, Flitter is a powerful and versatile web application, built with the latest technologies and adapted to work on all devices thanks to its responsive design.

![input](https://user-images.githubusercontent.com/50715363/218560841-5ae5c39a-f3d8-4b0e-aab0-e9fe8a2cf7b6.png)

## Considerations
- Scalability: the application must be scalable to handle an increasing amount of users and data. It is important to consider how scalability mechanisms will be implemented from the beginning.

- Compatibility with different browsers and devices: the application should be compatible with a wide range of browsers and devices, including mobile devices. It is important to consider how compatibility will be ensured throughout development.


## Downloading
Glitter actualmente está alojado en GitHub. El frontend del proyecto se puede encontrar en [este enlace](https://github.com/No-Woman-No-Work/flitter), y el backend en [este enlace](https://github.com/No-Woman-No-Work/v1-Flitter-Back-)

Si deseas seguir el desarrollo del backend de Glitter, puedes descargar el código fuente a través de Git clone.

```
git clone + enlace del proyecto
```

Install mongoDB

```
brew tap mongodb/brew
```

```
brew update
```

```
brew install mongodb-community@6.0
```

Start mongoDB

```
brew services start mongodb/brew/mongodb-community
```

Create Express project

```
npm init
```

```
npm install express mongoose
```

Start the server

```
node app.js
```


## Goals
Proyecto final del Bootcamp Mujeres en Tech.

El objetivo de este proyecto es poner en práctica todos los conocimientos adquiridos, simulando una situación real: desarrollo de un proyecto utilizando iteraciones, tomando decisiones de arquitectura y con una fecha límite de entrega, por ello hemos tomado la decisión de desarrollar Glitter.

_Glitter será una plataforma que permita la publicación de mini contenidos con los siguientes objetivos:_

- Proporcionar una interfaz sencilla y amigable que facilite la navegación e interacción con la aplicación.

- Ofrecer un proceso de registro en el sistema amigable, que permita realizar funciones como miembro de la plataforma indicando nombre de
usuario, dirección de e-mail y contraseña de acceso, y garantizar la seguridad de los datos implementando mecanismos sólidos de autenticación y autorización.

![input](https://user-images.githubusercontent.com/50715363/215982356-72e9a497-cc91-4109-97d7-595d5b2a9f19.png)

- Permitir hacer login en la plataforma para acceder a la zona privada y así poder acceder a todas las funcionalidades de la misma.

![input](https://user-images.githubusercontent.com/50715363/215983030-9a6ed6fd-03b7-47e8-82d6-545bbcdab9a0.png)

- Crear publicaciones a través de un formulario fácil de usar donde sea posible rellenar todos los campos que forman una publicación.

![input](https://user-images.githubusercontent.com/50715363/216117628-caad82ab-c973-4f93-89fa-94ebc7c9faa5.png)

- Acceder a un listado de últimas publicaciones de manera rápida, con dos vistas posibles: Pública y Privada. Esto dependerá de la opción de seguir a usuarios para acceder a sus publicaciones en un feed personalizado.

![input](https://user-images.githubusercontent.com/50715363/216122456-a706d9cc-5c74-4b36-ab57-6801f8742725.png)

## Background
Es un buen momento para crear una plataforma alternativa a Twitter debido a la situación que atraviesa dicha plataforma, y asimismo consideramos que se trata de un proyecto ideal para potenciar nuestros conocimientos tanto de backend, como de frontend, para cubrir las necesidades y aportar valor.

## Design and Architecture
Glitter es una aplicación web desarrollada con un stack tecnológico de vanguardia. Se compone de un backend construido con Node.js, Express y MongoDB, y un frontend desarrollado con Javascript y el framework Vue 3.

El frontend de Glitter está construido con Vue Composition API y estilado con Bootstrap. La conexión con el backend se realiza a través de Axios, y se ha utilizado Vuex como manejador de estados. Además, se han implementado adaptaciones (transpiladores) a motores más antiguos de Javascript, como Babel y Webpack, para asegurar la compatibilidad con todos los navegadores.

El backend de Glitter utiliza Mongoose para conectarse a la base de datos noSQL MongoDB, y cuenta con un sistema de autenticación basado en Json Web Token y un sistema de mailing implementado con MailJet. Además, se han utilizado herramientas de pruebas internas de desarrollo, como Postman, para garantizar la calidad y estabilidad de la aplicación.

En resumen, Glitter es una aplicación web potente y versátil, construida con las tecnologías más modernas y adaptada para funcionar en todos los dispositivos con diseño responsive.

![input](https://user-images.githubusercontent.com/50715363/218560841-5ae5c39a-f3d8-4b0e-aab0-e9fe8a2cf7b6.png)

## Considerations
- Escalabilidad: La aplicación debe ser escalable para manejar una creciente cantidad de usuarios y datos. Es importante considerar cómo se implementarán mecanismos de escalabilidad desde el principio.

- Compatibilidad con diferentes navegadores y dispositivos: La aplicación debe ser compatible con una amplia gama de navegadores y dispositivos, incluyendo dispositivos móviles. Es importante considerar cómo se asegurará la compatibilidad a lo largo del desarrollo.

