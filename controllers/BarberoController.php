<?php

namespace Controllers;

use Model\Barbero;
use MVC\Router;

class BarberoController {
public static function index(Router $router) {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    isAdmin();

    $barberos = Barbero::all();

    $router->render('admin/a_barberos', [
        'nombre' => $_SESSION['nombre'],
        'barberos' => $barberos 
    ]);
}

    public static function crear(Router $router) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        isAdmin();
        $barbero = new Barbero;
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $barbero->sincronizar($_POST);
            
            $alertas = $barbero->validar();

            if(empty($alertas)) {
                $barbero->guardar();
                header('Location: /admin/barberos');
            }
        }

        $router->render('barberos/crear', [
            'nombre' => $_SESSION['nombre'],
            'barbero' => $barbero,
            'especialidad' => $barbero,
            'alertas' => $alertas
        ]);
    }

    public static function actualizar(Router $router) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        isAdmin();

        if(!is_numeric($_GET['id'])) return;

        $barbero = Barbero::find($_GET['id']);
        $alertas = [];

        
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $barbero->sincronizar($_POST);

            $alertas = $barbero->validar();

            if(empty($alertas)) {
                $barbero->guardar();
                header('Location: /admin/barberos');
            }
        }

        $router->render('/barberos/actualizar', [
            'nombre' => $_SESSION['nombre'],
            'barbero' => $barbero,
            'especialidad' => $barbero,
            'alertas' => $alertas
        ]);
    }

    public static function eliminar() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        isAdmin();
        
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = $_POST['id'];
            $barbero = Barbero::find($id);
            $barbero->eliminar();
            header('Location: /admin/barberos');
        }
    }
}