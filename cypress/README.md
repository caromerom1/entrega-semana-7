# Cypress
*Nota: La variable de entorno ```ghostUrl``` está configurada en el repositorio para apuntar a la dirección http://localhost:2368*
## Aplicación Objetivo de pruebas

- Ghost version: 3.41.1

- Ghost version: 5.47.1

## Tecnologías utilizadas

- Node v14.21.3 & Node 16.20.0 Node v18.16.0

- cypress v12.11.0

## Funcionalidades probadas

- Crear cuenta nueva

- Inicio de sesión

- Crear Post nuevo

- Editar Post

- Editar información del usuario

- Modal de búsqueda

## Guía para la ejecución de pruebas con Cypress

1. En la raíz del repositorio correr ```npm install```

1. Correr el comando ```npm run cypress:open``` el cual abrirá un navegador de chrome.

1. Dar click en el menú E2E testing

1. Dar click en Start E2E Testing in Chrome (esto abrirá cypress en el proyecto)

1. En el menú de Specs se encuentran las funcionalidades con sus pruebas correspondientes (cada escenario de prueba está definido por separado en el código)

1. Ejecutar la versión de ghost a probar de forma local en el puerto 2368 (si se quiere otro puerto o la url de ghost es distinta, modificar el valor en el archivo ```cypress.config.js```)

1. Es importante tener en cuenta que, para el correcto funcionamiento de las pruebas, no se debe tener creado ningún usuario. Para esto, se puede ejecutar el siguiente comando desde el directorio de la aplicación ghost ```rm content/data/ghost-local.db```

1. Por último, es importante seleccionar primero los escenarios de pruebas de creación (create) para que los demás escenarios se ejecuten de forma exitosa, de lo contrario, es necesario ejecutar el comando del punto anterior seguido del comando ```ghost restart```

## Funcionalidad 1: Creación de cuenta
![image](https://user-images.githubusercontent.com/123770672/236730675-2fce3999-95bf-4e99-8081-7d34c4675850.png)
### Escenario 1 (Negativo): Creación de cuenta con los datos vacíos
- Se ingresa a la página ```${ghostUrl}/ghost/#/setup/two```
- Se selecciona el botón para hacer submit al formulario sin llenar ninguno de los inputs

### Escenario 2 (Negativo): Creación de cuenta con email inválido
- Se ingresa a la página ```${ghostUrl}/ghost/#/setup/two```
- Se llenan los inputs del título del sitio, el nombre del usuario, el email con un email inválido y el de contraseña con una contraseña válida
- Se selecciona el botón para hacer submit al formulario

### Escenario 3 (Negativo): Creación de cuenta con contraseña de menos de 10 caracteres
- Se ingresa a la página ```${ghostUrl}/ghost/#/setup/two```
- Se llenan los inputs del título del sitio, el nombre del usuario, el email y el de contraseña con una contraseña de menos de 10 caracteres
- Se selecciona el botón para hacer submit al formulario

### Escenario 4 (Positivo): Creación de cuenta exitosa
- Se ingresa a la página ```${ghostUrl}/ghost/#/setup/two```
- Se llenan los inputs del título del sitio, el nombre del usuario, el email y el de contraseña con una contraseña vǻlida
- Se selecciona el botón para hacer submit al formulario
- Se da click al vínculo de saltar configuraciones
- Se cierra la sesión
- Se inicia la sesión nuevamente con el email y la contraseña registrados

## Funcionalidad 2: Creación de Posts
![image](https://user-images.githubusercontent.com/123770672/236731796-a1c30cc6-d672-403a-99f9-ed31c3272bcf.png)

### Escenario 5 (Positivo): Creación de post exitosa
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se da click al botón de crear posts
- Se llenan los textos para el título del post y el contenido del post
- Se da click al menú para Publicar el post
- Se da click en el botón para publicar el post

### Escenario 6 (Positivo): Creación de post exitosa sin título
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se da click al botón de crear posts
- Se llenan el contenido del post
- Se da click al menú para Publicar el post
- Se da click en el botón para publicar el post

### Escenario 7 (Negativo): Creación de post sin contenido
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se da click al botón de crear posts
- Se llena el titulo del post

### Escenario 8 (Positivo): Despublicar un post creado
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se da click al botón de crear posts
- Se llenan los textos para el título del post y el contenido del post
- Se da click al menú para Publicar el post
- Se da click en el botón para publicar el post

### Escenario 9 (Positivo): Creación de post exitosa con contenido exclusivo para envío por email
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se da click al botón de crear posts
- Se llenan el texto para el título del post
- Se da click al botón de + en el contenido del post
- Se da click en la opción de email

## Funcionalidad 3: Edición de Posts
![image](https://user-images.githubusercontent.com/123770672/236733166-8db7edda-9b7f-4dab-98c4-1422e2add1a9.png)

### Escenario 10 (Positivo): Edición de post exitosa (edición del título del post)
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se ingresa a la página ````${ghostUrl}/ghost/#/posts?type=draft````
- Se selecciona el primer post que esté creado
- Se modifica el título del post
- Se da click en el contenido
- Se da click al botón de volver al menú de posts

### Escenario 11 (Positivo): Edición de post exitosa (edición del contenido del post)
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se ingresa a la página ````${ghostUrl}/ghost/#/posts?type=draft````
- Se selecciona el primer post que esté creado
- Se vuelve a abrir el mismo post


### Escenario 12 (Positivo): Edición de post exitosa (edición del título del post a texto vacío)
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se ingresa a la página ````${ghostUrl}/ghost/#/posts?type=draft````
- Se selecciona el primer post que esté creado
- Se modifica el título del post para que quede vacío
- Se da click en el contenido

## Funcionalidad 4: Edición de Perfil
![image](https://user-images.githubusercontent.com/123770672/236733790-b1117b0e-62bf-4151-bb55-b77120444cab.png)

### Escenario 13 (Negativo): Edición del perfil con nombre de usuario vacío
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se ingresa a la página ````${ghostUrl}/ghost/#/staff/${userParam}```` donde la variable ```userParam``` se refiere a el primer valor del nombre del usuario en minúsculas (Si el usuario se llama John Doe, tendrá valor de ```john```)
- Se limpia el input del nombre del usuario
- Se da click al botón de guardar

### Escenario 14 (Positivo): Edición del perfil (modificación de la ubicación del usuario)
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se ingresa a la página ````${ghostUrl}/ghost/#/staff/${userParam}```` donde la variable ```userParam``` se refiere a el primer valor del nombre del usuario en minúsculas (Si el usuario se llama John Doe, tendrá valor de ```john```)
- Se llena el input de ubicación del usuario
- Se da click al botón de guardar

### Escenario 15 (Positivo): Edición del perfil (modificación del slug)
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se ingresa a la página ````${ghostUrl}/ghost/#/staff/${userParam}```` donde la variable ```userParam``` se refiere a el primer valor del nombre del usuario en minúsculas (Si el usuario se llama John Doe, tendrá valor de ```john```)
- Se limpia el input del slug
- Se da click en cualquier parte de la página para quitar el focus del input del slug

### Escenario 16 (Positivo): Edición del perfil (modificación del link de Facebook)
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se ingresa a la página ````${ghostUrl}/ghost/#/staff/${userParam}```` donde la variable ```userParam``` se refiere a el primer valor del nombre del usuario en minúsculas (Si el usuario se llama John Doe, tendrá valor de ```john```)
- Se esceibe un nombre de usuario de facebook
- Se da click en cualquier parte de la página para quitar el focus del input de facebook

## Funcionalidad 5: Barra de búsqueda
![image](https://user-images.githubusercontent.com/123770672/236734805-a5b28f68-5c47-4b70-a811-23a9964cece5.png)

### Escenario 17 (Positivo): Apertura de barra de búsqueda con atajo de teclado
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se ingresa Ctrl+k

### Escenario 18 (Positivo): Cerrado de barra de búsqueda
- Se ingresa a la página ````${ghostUrl}/ghost/#/signin````
- Se inicia sesión con el email y contraseña registrados en la funcionalidad anterior
- Se ingresa Ctrl+k
- Se ingresa Esc
