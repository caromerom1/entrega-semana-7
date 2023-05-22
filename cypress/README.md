# Cypress
*Nota: La variable de entorno ```ghostUrl``` está configurada en el repositorio para apuntar a la dirección http://localhost:2368*
## Aplicación Objetivo de pruebas

- Ghost version: 5.47.1

## Tecnologías utilizadas

- Node 16.20.0 Node v18.16.0

- cypress v12.11.0

## Funcionalidades probadas

- Crear cuenta nueva

- Inicio de sesión

- Crear Post nuevo

- Editar Post

- Editar información del usuario

- Modal de búsqueda

## Descripción de las estrategias usadas y cómo se integran estas estrategias en los escenarios de pruebas

Para la realización del ejercicio, se tuvieron en cuenta las 3 estrategias conocidas en clase:
* Pool de datos a priori: Para esta estrategia, se hizo uso del software [mockaroo](https://mockaroo.com/) para generar esquemas con la información necesaria y se descargó en formato JSON. Estos archivos JSON se pueden encontrar en la carpeta [aPrioriData](/cypress/aPrioriData) obteniendo 4 tipos de información diferentes para cada una de las pruebas para asegurarse de que las pruebas no pasen por casualidad. Para la realización de los ejercicios, se hace import de estos archivos y se accede a ellos como objetos de JavaScript (TypeScript en mi caso).
* Pool de datos (pseudo) aleatorio dinámico: Para esta estrategia, se hizo uso del software [mockaroo](https://mockaroo.com/). En este caso, se generaron varias APIs a partir de los esquemas realizados para el pool de datos a priori. Luego de esto, mockaroo genera una url según el nombre del esquema que se haya guardado a la que se le envía una `API_KEY` para obtener la información llamando al endpoint desde cypress.
* Escenario aleatorio: Para esta estrategia, se hizo uso de la librería [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) para generar datos aleatorios en cada una de las pruebas. Para la realización del ejercicio, en cada una de las pruebas que requieren input de datos, se agrega la llamada a la API de faker-js según el tipo de dato que se quiera enviar para hacer la prueba correspondiente.

## Guía para la ejecución de pruebas con Cypress

1. En la raíz del repositorio correr ```npm install```

1. Correr el comando ```npm run cypress:open``` el cual abrirá un navegador de chrome.

1. Dar click en el menú E2E testing

1. Dar click en Start E2E Testing in Chrome (esto abrirá cypress en el proyecto)

1. En el menú de Specs se encuentran las funcionalidades con sus pruebas correspondientes (cada escenario de prueba está definido por separado en el código)

1. Ejecutar la versión de ghost a probar de forma local en el puerto 2368 (si se quiere otro puerto o la url de ghost es distinta, modificar el valor en el archivo ```cypress.config.ts```)

1. Es importante tener en cuenta que, para el correcto funcionamiento de las pruebas, no se debe tener creado ningún usuario puesto que, al hacer login en todas, ghost impide realizar más de 100 inicios de sesión en una hora. Para esto, se puede ejecutar el siguiente comando desde el directorio de la aplicación ghost. ***Es importante ejecutarlo antes de cada escenario de pruebas para evitar el error*** ```rm content/data/ghost-local.db; ghost restart```

1. Por último, el orden para ejecutar los escenarios de forma exitosa es:
* Editar perfil (Edit profile)
* 
***Nota: NO olvidar ejecutar el comando del punto 7 antes de cada escenario***

## [Funcionalidades](https://github.com/caromerom1/entrega-semana-7/wiki/Funcionalidades)
