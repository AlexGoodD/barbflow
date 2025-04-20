<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;

class APIController {
    public static function index() {

        // TODO Eliminar headers para produccion
        header("Access-Control-Allow-Origin: *");

        // Opcionalmente, permite ciertos métodos HTTP
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

        // Permite ciertos headers (si usas JSON, tokens, etc.)
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        $servicios = Servicio::all();
        echo json_encode($servicios);
    }

    public static function guardar() {
        
        // Almacena la Cita y devuelve el ID
        $cita = new Cita($_POST);
        $resultado = $cita->guardar();

        $id = $resultado['id'];

        // Almacena la Cita y el Servicio

        // Almacena los Servicios con el ID de la Cita
        $idServicios = explode(",", $_POST['servicios']);
        foreach($idServicios as $idServicio) {
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }

        echo json_encode(['resultado' => $resultado]);
    }

    public static function eliminar() {
        
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = $_POST['id'];
            $cita = Cita::find($id);
            $cita->eliminar();
            header('Location:' . $_SERVER['HTTP_REFERER']);
        }
    }

    public static function enviarMensaje() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nombre = $_POST['nombre'] ?? '';
            $email = $_POST['email'] ?? '';
            $mensaje = $_POST['mensaje'] ?? '';
    
            // Validar los campos
            if (empty($nombre) || empty($email) || empty($mensaje)) {
                echo json_encode(['resultado' => 'error', 'mensaje' => 'Todos los campos son obligatorios']);
                return;
            }
    
            // Crear el contenido del correo
            $contenido = "<p><strong>Nombre:</strong> {$nombre}</p>";
            $contenido .= "<p><strong>Email:</strong> {$email}</p>";
            $contenido .= "<p><strong>Mensaje:</strong> {$mensaje}</p>";
    
            // Enviar el correo
            $emailObj = new \Classes\Email($email, $nombre, '');
            $resultado = $emailObj->enviarMensajeContacto($contenido);
    
            echo json_encode(['resultado' => $resultado ? 'exito' : 'error']);
        }
    }
}