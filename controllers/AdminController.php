<?php 

namespace Controllers;

use Model\AdminCita;
use MVC\Router;

class AdminController {
    public static function index( Router $router ) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        isAdmin();

        $fecha = $_GET['fecha'] ?? date('Y-m-d');
        $fechas = explode('-', $fecha);

        if( !checkdate( $fechas[1], $fechas[2], $fechas[0]) ) {
            header('Location: /404');
        }

        // Consultar la base de datos
        $consulta = "SELECT citas.id, citas.horaInicio, CONCAT(usuarios.nombre, ' ', usuarios.apellido) as cliente, ";
        $consulta .= "usuarios.email, usuarios.telefono, servicios.nombre as servicio, servicios.precio ";
        $consulta .= "FROM citas ";
        $consulta .= "LEFT OUTER JOIN usuarios ON citas.usuarioId = usuarios.id ";
        $consulta .= "LEFT OUTER JOIN citasServicios ON citasServicios.citaId = citas.id ";
        $consulta .= "LEFT OUTER JOIN servicios ON servicios.id = citasServicios.servicioId ";
        $consulta .= "WHERE fecha = '{$fecha}'";

        $citas = AdminCita::SQL($consulta);

        $router->render('admin/a_citas', [
            'nombre' => $_SESSION['nombre'],
            'citas' => $citas, 
            'fecha' => $fecha
        ]);
    }
}