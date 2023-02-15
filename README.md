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

