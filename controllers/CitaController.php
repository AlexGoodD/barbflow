<?php

namespace Controllers;

use MVC\Router;

class CitaController {
    public static function index( Router $router ) {

        session_start();

        isAuth();

        $router->render('cita/index', [
            'nombre' => $_SESSION['nombre'],
            'apellido' => $_SESSION['apellido'],
            'email' => $_SESSION['email'],
            'id' => $_SESSION['id']
        ]);
    }
}