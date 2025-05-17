<?php 


require_once __DIR__ . '/../includes/app.php';

date_default_timezone_set($_ENV['APP_TIMEZONE'] ?? 'UTC');

use Controllers\AdminController;
use Controllers\APIController;
use Controllers\CitaController;
use Controllers\LoginController;
use Controllers\ServicioController;
use Controllers\BarberoController;
use Controllers\HomeController;
use MVC\Router;
$router = new Router();

// Inicio
$router->get('/home', [HomeController::class, 'index']);

// Mensaje de contacto (Inicio)
$router->post('/api/enviar-mensaje', [APIController::class, 'enviarMensaje']);

// Iniciar Sesión
$router->get('/', [LoginController::class, 'login']);
$router->post('/', [LoginController::class, 'login']);
$router->get('/logout', [LoginController::class, 'logout']);

// Recuperar Password
$router->get('/olvide', [LoginController::class, 'olvide']);
$router->post('/olvide', [LoginController::class, 'olvide']);
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);

// Crear Cuenta
$router->get('/crear-cuenta', [LoginController::class, 'crear']);
$router->post('/crear-cuenta', [LoginController::class, 'crear']);

// Confirmar cuenta
$router->get('/confirmar-cuenta', [LoginController::class, 'confirmar']);
$router->get('/mensaje', [LoginController::class, 'mensaje']);

// Area de usuario
$router->get('/cita', [CitaController::class, 'index']);

// Area de administración
$router->get('/admin/citas', [AdminController::class, 'index']);

// CRUD de Servicios
$router->get('/admin/servicios', [ServicioController::class, 'index']);
$router->get('/admin/servicios/crear', [ServicioController::class, 'crear']);
$router->post('/admin/servicios/crear', [ServicioController::class, 'crear']);
$router->get('/admin/servicios/actualizar', [ServicioController::class, 'actualizar']);
$router->post('/admin/servicios/actualizar', [ServicioController::class, 'actualizar']);
$router->post('/admin/servicios/eliminar', [ServicioController::class, 'eliminar']);

// CRUD de Barberos
$router->get('/admin/barberos', [BarberoController::class, 'index']);
$router->get('/admin/barberos/crear', [BarberoController::class, 'crear']);
$router->post('/admin/barberos/crear', [BarberoController::class, 'crear']);
$router->get('/admin/barberos/actualizar', [BarberoController::class, 'actualizar']);
$router->post('/admin/barberos/actualizar', [BarberoController::class, 'actualizar']);
$router->post('/admin/barberos/eliminar', [BarberoController::class, 'eliminar']);

// API de Citas
$router->get('/api/servicios', [APIController::class, 'index']);
$router->get('/api/barberos', [APIController::class, 'obtenerBarberos']);
$router->post('/api/citas', [APIController::class, 'guardar']);
$router->post('/api/eliminar', [APIController::class, 'eliminar']);
$router->post('/api/verificar-disponibilidad', [APIController::class, 'verificarDisponibilidad']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();