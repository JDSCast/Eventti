# Eventti - Gestor de eventos

## Descripción
**Eventti** es una aplicación web desarrollada con el stack MERN (MongoDB, Express, React, Node.js) que permite a los usuarios ver y publicar sus eventos u ocasiones especiales. La aplicación cuenta con las siguientes características:

- CRUD completo para la creación de eventos.
- Registro y autenticación de usuarios, con mantenimiento de sesión.
- Acceso restringido mediante rutas protegidas por la autenticación.
- Diseño atractivo y responsive utilizando la librería Material UI.
- Dos vistas para los eventos: versión en tarjetas y estilo tablas.
- Filtros para la búsqueda de eventos (por ubicación, fecha, palabra, etc.)
- Tema de diseño oscuro y claro.

## Características Planeadas
Estamos trabajando en las siguientes características adicionales:
- Implementación del acceso por roles.
- Subida de imágenes para los eventos y avatars de usuarios.
- CRUD de usuarios (endpoints listos en backend, falta la interfaz en frontend)

## Tecnologías Utilizadas
- [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL
- [Express](https://expressjs.com/) - Framework para Node.js
- [React](https://reactjs.org/) - Biblioteca para construir interfaces de usuario
- [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript
- [Material UI](https://material-ui.com/) - Librería de componentes para React
- [JWT](https://jwt.io/) - Autenticación basada en JSON Web Tokens

## Requisitos
Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JDSCast/Eventti.git
   cd eventti

2. Configura las variables de entorno: Crea los archivos `.env` en las carpetas backend y frontend del proyecto y define las siguientes variables (los valores de las variables son ejemplos):

   => Backend

   ```bash
    PORT = 5001
    NODE_ENV= develop
    MONGO_URI = Url_de_tu_base_de_datos_Mongodb
    JWT_SECRET = clave_segura_para_jwt
    URL_CLIENT = http://localhost:5173
   ```


    => Frontend

    ```bash
      VITE_URL_SERVER= http://localhost:5001/api
      ```
    **Nota:** El proyecto utiliza el puerto predeterminado por VITE que es el 5173, pero puedes cambiarlo en el archivo `vite.config.js`
3. Instala las dependencias del backend y frontend, ejecuta el siguiente comando en ambas carpetas:

   ```bash
   npm install
   ```
## Ejecución

1. Inicia el servidor en la carpeta Backend:

```bash
cd backend
npm run dev
```
2. Inicia el cliente en la carpeta Frontend:

```bash
cd frontend
npm run dev
```

## Evidencias de Funcionamiento

![Demostración de la interfaz visual](/evidencias/Collage.png)

**Nota:** las imágenes se encuentran con mayor resolución en la carpeta de evidencias.

## Créditos

Este proyecto utiliza imágenes e íconos que son propiedad de sus respectivos creadores. A continuación se enumeran los recursos utilizados:

- [Iconos de SVGrepo](https://www.svgrepo.com/) - Utilizados para algunos de los iconos de la interfaz de usuario.
- [Imágenes de Pixabay](https://pixabay.com/) - Fotografías utilizadas en la página de inicio.
- [Imágenes de Unsplash](https://pixabay.com/) - Fotografías utilizadas en las vistas de eventos, mediante  [Lorem Picsum](https://picsum.photos/).
