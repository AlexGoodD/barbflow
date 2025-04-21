# Proyecto Barbflow

Este proyecto es una aplicación web para la gestión de citas y servicios de una barbería. A continuación, se describen los pasos necesarios para configurar y ejecutar el proyecto en un entorno local utilizando **XAMPP**.

---

## Requisitos previos

1. **XAMPP** instalado en tu máquina. Puedes descargarlo desde [Apache Friends](https://www.apachefriends.org/).
2. **Composer** instalado. Puedes descargarlo desde [Composer](https://getcomposer.org/).
3. **Node.js** instalado (opcional, si necesitas compilar recursos frontend). Puedes descargarlo desde [Node.js](https://nodejs.org/).

---

## Pasos para ejecutar el proyecto

### 1. Clonar el repositorio

Clona este repositorio en el directorio `htdocs` de tu instalación de XAMPP:

```bash
cd /path/to/xampp/htdocs
git clone <URL_DEL_REPOSITORIO> refact_barbflow
cd refact_barbflow
```

### 2. Configurar el archivo .env

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

APP_URL=http://localhost:####
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=nombre_base_datos

MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=4ec54dfb980a42
MAIL_PASSWORD=ae938c99960f22
MAIL_FROM_ADDRESS=correo@appsalon.com
MAIL_FROM_NAME=AppSalon.com

- APP_URL: Cambia la URL base según tu puerto
- DB_USER y DB_PASS: Configura el usuario y contraseña de tu base de datos MySQL.
- DB_NAME: Crea una base de datos en phpMyAdmin y coloca su nombre aquí.

¡También es importante cambiar la APP_URL en el archivo config.js!

### 3. Instalar dependencias de PHP

Ejecuta el siguiente comando para instalar las dependencias de PHP:

```bash
composer install
```

### 4. Configurar la base de datos 

1. Abre phpMyAdmin desde http://localhost/phpmyadmin.
2. Crea una nueva base de datos con el nombre que especificaste en el archivo .env.
3. Importa el archivo SQL que contiene la estructura de la base de datos. Este archivo debería estar en el proyecto (barbflow.sql)

### 5. Configurar XAMPP 
1. Asegúrate de que los servicios de Apache y MySQL estén corriendo en el panel de control de XAMPP.
2. Verifica que el archivo .htaccess en el directorio public/ esté configurado correctamente para redirigir todas las solicitudes a index.php.
3. Configura el document root para que acceda a refact_barbflow/public

### 6. Ejecutar el proyecto

Abre tu navegador y accede a la URL: 
http://localhost:####

