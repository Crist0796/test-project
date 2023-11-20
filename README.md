# PRUEBA TÉCNICA DESARROLLADOR BACK-END PHP

    Solución a prueba técnica para vacante de desarrollador Back End PHP.

    En la carpeta requerimientos se encuentra el documento
    donde se especifican cada uno de los requerimientos técnicos.

    En la carpeta documentación se encuentra el documento
    donde explico cómo resolví cada uno de los requerimientos.

    DESCRIPCIÓN GENERAL: realicé una SPA haciendo uso de la arquitectura por capas y MVC que provee Laravel.
    También utilicé React haciendo uso del Rooter y el gestor de estado que provee InertiaJS.


Utilicé el siguiente stack:

 - PHP 8.1.
 - Laravel 10.
 - MYSQL.
 - Breeze.
 - Inertiajs con React.
 - TailwindCSS.

# Instrucciones de configuración en entorno local:

Tener en cuenta que se debe tener instalado:

- **Servidor web (recomendado Apache o Nginx)**
- **PHP 8.1 o posterior y Composer 2.3 o posterior**
- **MySQL 5.7 o posterior**
- **NodeJS 16 o posterior y NPM (U otro gestor de paquetes)**

En Windows Recomiendo instalar un paquete que ya viene con estos servicios configurados:  **Xampp** o **Laragon**.

## Paso 1:
Instalar todas las dependecias de Composer: <br>
Abra una terminal, navegue hasta donde se encuentre el proyecto y ejecute:<br>

`composer install`

## Paso 2:
 Cree un archivo .env en el directorio raíz del proyecto y pegue en él, el contenido del archivo .env.example.<br>
 Modifique (en el archivo .env) los datos de la base de datos (DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD) de acuerdo a la configuración de su entorno. <br>
 Luego de que las depencias se hayan instalado y haya configurado el archivo .env ejecute: <br>

`php artisan key:generate`

 ## Paso 3:
 Correr las migraciones y seeders. <br>
 Una vez haya instalado todas las depencias de Composer y haya configurado la información de la base de datos en el archivo .env. <br>
 Ejecute: <br>

 `php artisan migrate`

 Si la base de datos que especificó en el archivo .env no existe, recibirá un mensaje diciendo que si desea crearla. <br>
 Teclee yes y presione enter. <br>

 Una vez las tablas se hayan creado, ejecute: <br>

 `php artisan db:seed --class=ProcessSeeder && php artisan db:seed --class=DocumentTypeSeeder`
 
 Eso generará los registros de los tipos de documentos y procesos. 
 Opcionalmente ejecute el siguiente comando para habilitar los mensajes de error y validación en español: <br>

`php artisan vendor:publish --provider="LaravelLatam\Spanish\SpanishServiceProvider" --tag="spanish"`

 ## Paso 4:

 Instale las dependecias para el Front End. <br>
 Ejecute: <br>
 `npm install`

 ## Paso 5:
 Correr servidor en entorno local.<br>
 En una terminal navegue a la raíz del proyecto y ejecute el siguiente comando (no cierre la terminal) :<br>
 `php artisan serve` <br>
En otra terminal navegue a la raíz del proyecto y ejecute (no cierre la terminal):<br>
`npm run dev`

Eso correra el proyecto en el localhost (por defecto en el puerto 8000).<br>
Abra el navegador y visite la url: http://localhost:8000/register para registrar un usuario y empezar a utilizar la App.



















