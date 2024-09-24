# Documentación Server Backend

Este proyecto es una API RESTful diseñada para gestionar la autenticación y el manejo de usuarios y publicaciones. Implementa un sistema de registro, inicio de sesión y creación de publicaciones, utilizando un enfoque modular basado en la arquitectura limpia (Clean Architecture).

# indice

- [Tecnicas Utilizadas](#tecnologías-utilizadas)
- [Instalacion](#instalación)
  - [Ejecucion](#ejecución)
- [EndPoints](#endpoints-disponibles)
  - [POST /user (Registrar usuario)](#post-user-registrar-un-nuevo-usuario)
  - [GET /user/:id (Obtener usuario)](#get-userid--obtener-información-de-un-usuario-por-su-id)
  - [POST /auth/login (Iniciar sesion)](#post-authlogin-iniciar-sesión-y-obtener-un-json-web-token-jwt)
  - [POST /posts (Crear post)](#post-posts-crear-un-post-incluyendo-los-datos-del-usuario-que-lo-creó)
  - [GET /posts?search= (Obtener post)](#get-posts-obtener-posts-filtrados-por-título-utilizando-el-query-search)
  - [PATCH /posts/:id (Editar un post)](#patch-postsid-editar-un-post-buscándolo-por-su-id)
  - [DELETE /posts/:id (Eliminar post)](#delete-postsid-eliminar-un-post-por-su-id)
  - [PATCH posts/:id/comments (Agregar reactions al Post)](#patch-postsidcomments-agregar-un-reactions-al-post)
  - [PATCH posts/:id/reactions (Agregar comments al Post)](#patch-postsidreactions-agregar-comments-al-post)

## Tecnologías Utilizadas

- **NodeJS**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para construir aplicaciones web y API.
- **MongoDB**: Base de datos NoSQL.
- **Mongoose**: ODM para MongoDB, utilizado para definir modelos de datos.
- **JWT (JSON Web Token)**: Autenticación y autorización de usuarios.
- **http-errors**: Manejo de errores HTTP personalizados.
- **bcryptjs**: Librería para hashing de contraseñas.
- **dotenv**: Gestión de variables de entorno.
- **Clean Architecture**: Arquitectura de software para organizar el código de manera modular y mantenible.

## Instalación

1. Haz un [**fork**](https://github.com/ManuelFloresDEV/server_backend/fork) de este repositorio.

2. Clona tu fork del repositorio:

   ```bash
   git clone git@github.com:tu-usuario/server_backend.git
   ```

3. Navega al directorio del proyecto:

   ```bash
   cd server_backend
   ```

4. Instala las dependencias:

   ```bash
   npm install
   ```

5. Configura las variables de entorno (crea un archivo `.env` tomando como referencia el archivo `EXAMPLE.env`):
   ```
   DB_USER=EJmiusuario
   DB_PASSWORD=EJmipassword
   DB_HOST=EJ.mongodb.net
   DB_NAME=EJnameDB
   JWT_SECRET=asddesd
   ```

## Ejecución

Para iniciar el servidor en modo desarrollador:

```bash
npm run dev
```

El servidor estará disponible en **http://localhost:8080**.

## Endpoints Disponibles

- ### **POST /user**: Registrar un nuevo usuario.

  Thunder Client

  ```Thunder Client
  http://localhost:8080/user/
  ```

  formato del **Body** de la solicitud

  ```json
  {
    "password": "PASS123",
    "email": "email@123.com",
    "profilePic": "img.pic.com",
    "name": "josafat"
  }
  ```

  Respuesta Exitosa

  ```json
  {
    "success": true,
    "message": "user created",
    "data": {
      "user": {
        "user": {
          "name": "josafat",
          "profilePic": "img.pic.com",
          "email": "email@123.com",
          "password": "$2a$10$BXF071jA3/O5I9tT5XkvVeSUrmfGab9FSnOI7MCv6J8tObCRmMtNK",
          "_id": "66bd8b25fe14b443ee934c9d",
          "createdAt": "2024-08-15T04:59:17.139Z",
          "updatedAt": "2024-08-15T04:59:17.139Z",
          "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWU1YWFmMDY0NzlmODU1YTZlOGNmOSIsImlhdCI6MTcyNjg5NjgxNSwiZXhwIjoxNzI3NTAxNjE1fQ.nvSrtXfDqUrRlPYMZqDTErfEWJze87aYR7CnidBscpA"
      }
    }
  }
  ```

  Respuesta si el **email** ya existe, el servidor respondera

  ```json
  {
    "success": false,
    "message": "user already exists"
  }
  ```

  Respuesta si falta **password**

  ```json
  {
    "success": false,
    "message": "password is required"
  }
  ```

  Respuesta si fala algun otro dato

  ```json
  {
    "success": false,
    "message": "users validation failed: email: is required, profilePic: is required, name: is required"
  }
  ```

- ### **GET /user/:id** Obtener información de un usuario por su ID.

  Thunder Client

  el ID es introducido directo en el url

  ```
  http://localhost:8080/user/id_del_usuario
  ```

  Respuesta Exitosa

  ```json
  {
    "success": true,
    "message": "user By Id",
    "data": {
      "user": {
        "_id": "66bd8b25fe14b443ee934c9d",
        "name": "josafat",
        "profilePic": "img.pic.com",
        "email": "email@123.com",
        "createdAt": "2024-08-15T04:59:17.139Z",
        "updatedAt": "2024-08-15T04:59:17.139Z",
        "__v": 0
      }
    }
  }
  ```

  Respuesta si el **ID** tiene un formato invalido

  ```json
  {
    "success": false,
    "message": "Invalid ID format"
  }
  ```

  Respuesta si el usuario no se encuentra

  ```json
  {
    "success": false,
    "message": "user not found"
  }
  ```

  Respuesta si no intruduces un valor

  ```json
  {
    "success": false,
    "message": "User ID is required"
  }
  ```

- ### **POST /auth/login**: Iniciar sesión y obtener un Json Web Token (JWT).

  Thunder Client

  ```
  http://localhost:8080/auth/login
  ```

  Formato del **Body** de la solicitud

  ```json
  {
    "password": "PASS123",
    "email": "email@123.com"
  }
  ```

  Respuesta Exitosa

  te entrega un **(TOKEN)**

  ```json
  {
    "success": true,
    "message": "user logged in",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmQ4YjI1ZmUxNGI0NDNlZTkzNGM5ZCIsImlhdCI6MTcyMzY5ODkyOCwiZXhwIjoxNzI0MzAzNzI4fQ.2g4R_LE0mGzGqQxp-SHKcImzLGC5G_cJQvddDDpT-Rg"
    }
  }
  ```

  Respuesta si falta **email**

  ```json
  {
    "success": false,
    "message": "required email"
  }
  ```

  Respuesta si falta **password**

  ```json
  {
    "success": false,
    "message": "required password"
  }
  ```

  respuesta si los datos son incorrectos

  ```json
  {
    "success": false,
    "message": "invalid credential"
  }
  ```

- ### **POST /posts**: Crear un post, incluyendo los datos del usuario que lo creó.

  Thunder Client

  ```
  http://localhost:8080/posts/
  ```

  **Configurar** Thunder Client  
   en `Headers` crea un nuevo Header llamado `Authorization` y asignale el valor `Bearer + TOKEN`, para continuar con la solicitud  
   ejemplo

  ```
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  ```

  Formato del **Body** de la solicitud

  ```json
  {
    "tags": "py js css ruby ",
    "title": "test titulo",
    "image": "tests.img",
    "body": "description del test"
  }
  ```

  Respuesta Exitosa

  ```json
  {
    "success": true,
    "message": "post created",
    "data": {
      "post": {
        "user": {
          "_id": "66bd8b25fe14b443ee934c9d",
          "name": "josafat",
          "profilePic": "img.pic.com",
          "email": "email@123.com",
          "createdAt": "2024-08-15T04:59:17.139Z",
          "updatedAt": "2024-08-15T04:59:17.139Z",
          "__v": 0
        },
        "title": "test titulo",
        "image": "tests.img",
        "body": "description del test",
        "tags": ["py", "js", "css", "ruby"],
        "_id": "66bd937dc2075503454f32fc",
        "createdAt": "2024-08-15T05:34:53.520Z",
        "updatedAt": "2024-08-15T05:34:53.520Z",
        "__v": 0
      }
    }
  }
  ```

  Respuesta si tiene un **TOKEN** invalido

  ```json
  {
    "success": false,
    "message": "invalid token"
  }
  ```

  Respuesta si el **token** tiene una firma invalida

  ```json
  {
    "success": false,
    "message": "invalid signature"
  }
  ```

  Respuesta si faltan **tags** en la solicitud  
   solo puede tener maximo 4 t**ags**

  ```json
  {
    "success": false,
    "message": "tags is required"
  }
  ```

  Respuesta si hay mas de 4 **tags**

  ```json
  {
    "success": false,
    "message": "only 4 tags are allowed"
  }
  ```

  Respuesta si falta **title** en la solicitud

  ```json
  {
    "success": false,
    "message": "title is required"
  }
  ```

  Respuesta si falta **image** en la solicitud

  ```json
  {
    "success": false,
    "message": "image is required"
  }
  ```

  Respuesta si falta **Body** en la solicitud

  ```json
  {
    "success": false,
    "message": "body is required"
  }
  ```

- ### **GET /posts**: Obtener posts filtrados por título utilizando el query `search`.

  Thunder Client

  ```url
  http://localhost:8080/posts?search=html
  ```

  Respuesta Exitosa

  ```json
  {
    "success": true,
    "message": "all Posts",
    "data": {
      "posts": [
        {
          "_id": "66bd9e14c2075503454f3314",
          "user": {
            "_id": "66bd8b25fe14b443ee934c9d",
            "name": "josafat",
            "profilePic": "img.pic.com",
            "email": "email@123.com",
            "createdAt": "2024-08-15T04:59:17.139Z",
            "updatedAt": "2024-08-15T04:59:17.139Z",
            "__v": 0
          },
          "title": "Modernización de HTML y CSS",
          "image": "html-css-modern.jpg",
          "body": "Explora las nuevas características de HTML5 y CSS3 para crear páginas web modernas y visualmente atractivas.",
          "tags": ["html5", "css3"],
          "createdAt": "2024-08-15T06:20:04.245Z",
          "updatedAt": "2024-08-15T06:20:04.245Z",
          "__v": 0
        }
      ]
    }
  }
  ```

  Respuesta si no encuentran considencias

  ```json
  {
    "success": false,
    "message": "no matches found"
  }
  ```

  Respuesta si no introducen un valor

  ```json
  {
    "success": true,
    "message": "Posts found by title",
    "data": {
      "posts": [{"return all posts"}]
    }
  }
  ```

- ### **PATCH /posts/:id** Editar un post buscándolo por su ID.

  puedes editar solo una propiedad del post o todas las que tenga

  Thunder Client

  ```
  http://localhost:8080/posts/ID_del_Post
  ```

  Formato del **Body** de la solicitud

  ```json
  {
    "tags": "edit editado",
    "title": "editado"
  }
  ```

  Respuesta Exitosa

  ```json
  {
    "success": true,
    "message": "post updated",
    "data": {
      "post": {
        "_id": "66bd9e07c2075503454f330c",
        "user": "66bd8b25fe14b443ee934c9d",
        "title": "editado",
        "image": "angular-rxjs.png",
        "body": "Explora cómo integrar RxJS con Angular para manejar datos asincrónicos y mejorar la reactividad en tus aplicaciones web.",
        "tags": ["edit editado"],
        "createdAt": "2024-08-15T06:19:51.080Z",
        "updatedAt": "2024-08-15T06:37:56.756Z",
        "__v": 0
      }
    }
  }
  ```

  Respuesta si no se introducen datos

  ```json
  {
    "success": false,
    "message": "There is no data to update"
  }
  ```

- ### **DELETE /posts/:id**: Eliminar un post por su ID.

  Thunder Client

  ```
  http://localhost:8080/posts/ID_Del_Post
  ```

  Respuesta Exitosa

  ```json
  {
    "success": true,
    "message": "post Deleted",
    "data": {
      "Post": {
        "_id": "66bd9e07c2075503454f330c",
        "user": "66bd8b25fe14b443ee934c9d",
        "title": "editado",
        "image": "angular-rxjs.png",
        "body": "Explora cómo integrar RxJS con Angular para manejar datos asincrónicos y mejorar la reactividad en tus aplicaciones web.",
        "tags": ["edit editado"],
        "createdAt": "2024-08-15T06:19:51.080Z",
        "updatedAt": "2024-08-15T06:37:56.756Z",
        "__v": 0
      },
      "id": "66bd9e07c2075503454f330c"
    }
  }
  ```

  Respuesta si el **Post** no se encuentra

  ```json
  {
    "success": false,
    "message": "post not found"
  }
  ```

  Respuesta si no Tienes un **Token**

  ```json
  {
    "success": false,
    "message": "you need to log in"
  }
  ```

  Respuesta si no eres el propietario del Post

  ```json
  {
    "success": false,
    "message": "You don't have permission to delete this post."
  }
  ```

- ### PATCH posts/:id/comments agregar un reactions al post

  **Configurar** Thunder Client  
   en `Headers` crea un nuevo Header llamado `Authorization` y asignale el valor `Bearer + TOKEN`, para continuar con la solicitud  
   ejemplo

  ```
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  ```

  emojis aceptados `"👍", "❤️", "😂", "😮", "😢" `
  un suario solo puede reaccionar una ves por emoji en cada post

  Thunder Client

  ```

  http://localhost:8080/posts/id del post/reactions

  ```

  Formato del **Body** de la solicitud

  ```json
  {
    "reaction": "😮"
  }
  ```

  Respuesta Exitosa

  ```json
  {
    "succes": true,
    "message": "add reaction",
    "data": {
      "reactions": [
        {
          "reaction": "😢",
          "count": 1,
          "users": ["id del usuario que reacciono"],
          "_id": "66f23a7f9343dea63b24bf80"
        }
      ]
    }
  }
  ```

  Respuesta si el usuario ya reacciono con ese emoji

  ```json
  {
    "success": false,
    "message": "user has already reacted with this emoji"
  }
  ```

- ### PATCH posts/:id/reactions agregar comments al post

  **Configurar** Thunder Client  
   en `Headers` crea un nuevo Header llamado `Authorization` y asignale el valor `Bearer + TOKEN`, para continuar con la solicitud  
   ejemplo

  ```
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  ```

  Thunder Client

  ```
  http://localhost:8080/posts/id del post/comments
  ```

  Formato del **Body** de la solicitud

  ```json
  {
    "comments": "aqui el comentario"
  }
  ```

  Respuesta Exitosa

  ```json
  {
    "succes": true,
    "message": "add comment",
    "data": {
      "comments": [
        {
          "comment": "aqui el comentario",
          "user": "id del usuario que comento",
          "_id": "66f23baf9343dea63b24bf8d"
        }
      ]
    }
  }
  ```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE) en este repositorio.
