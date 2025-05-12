<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;
use Model\Usuario;
use Classes\Email;
use DateTimeImmutable;

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

    public static function obtenerBarberos() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
        // Obtener la conexión a la base de datos desde ActiveRecord
        $db = \Model\ActiveRecord::getDB();
    
        $query = "SELECT id, nombre, especialidad FROM barberos";
        $resultado = $db->query($query);
    
        $barberos = [];
        while ($row = $resultado->fetch_assoc()) {
            $barberos[] = $row;
        }
    
        echo json_encode($barberos);
    }

    public static function guardar() {
        $fecha = $_POST['fecha'];
        $hora = $_POST['hora'];
        $usuarioId = $_POST['usuarioId'];
        $barberoId = $_POST['barberoId'];
    
        // Obtener email y nombre del usuario
        $usuario = Usuario::find($usuarioId);
        if (!$usuario) {
            echo json_encode([
                'resultado' => false,
                'mensaje' => 'Usuario no encontrado.'
            ]);
            return;
        }
    
        // Crear y guardar la cita
        $cita = new Cita([
            'fecha' => $fecha,
            'hora' => $hora,
            'usuarioId' => $usuarioId,
            'barberoId' => $barberoId, // Guardar el barberoId
            'nombre' => $_POST['nombre'] ?? '',
            'email' => $_POST['email'] ?? ''
        ]);
        $resultado = $cita->guardar();
        $id = $resultado['id'];
    
        // Guardar servicios
        $idServicios = explode(",", $_POST['servicios']);
        foreach ($idServicios as $idServicio) {
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }
    
        // Enviar correo de confirmación
        $emailObj = new Email($usuario->email, $usuario->nombre, '');
        $emailEnviado = $emailObj->enviarAlertaCita($fecha, $hora);
    
        if (!$emailEnviado) {
            echo json_encode(['resultado' => false, 'mensaje' => 'No se pudo enviar el correo de confirmación.']);
            return;
        }
    
        echo json_encode(['resultado' => $resultado]);
    }

    public static function eliminar() {
        header('Content-Type: application/json');

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = $_POST['id'];
            $cita = Cita::find($id);
        
            if (!$cita) {
                http_response_code(400);
                echo json_encode(['mensaje' => 'Cita no encontrada.']);
                return;
            }
        
            $fechaHoraCita = strtotime($cita->fecha . ' ' . $cita->hora);
            $fechaHoraActual = time();
        
            if (empty($cita->email) || empty($cita->nombre)) {
                $usuario = Usuario::find($cita->usuarioId);
                if ($usuario) {
                    $cita->email = $usuario->email;
                    $cita->nombre = $usuario->nombre;
                }
            }
        
            if ($fechaHoraCita < $fechaHoraActual) {
                $cita->eliminar();
                echo json_encode(['mensaje' => 'Cita pasada eliminada sin notificación.']);
                return;
            }
        
            $emailObj = new Email($cita->email, $cita->nombre, '');
            $emailEnviado = $emailObj->enviarAlertaCancelación($cita->fecha, $cita->hora);
        
            if (!$emailEnviado) {
                http_response_code(500);
                echo json_encode(['mensaje' => 'No se pudo enviar el correo de cancelación.']);
                return;
            }
        
            $cita->eliminar();
            echo json_encode(['mensaje' => 'Cita eliminada y se notificó al cliente.']);
        }
    }

    public static function enviarMensaje() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Leer el cuerpo JSON
            $input = json_decode(file_get_contents('php://input'), true);
    
            $nombre = $input['nombre'] ?? '';
            $email = $input['email'] ?? '';
            $mensaje = $input['mensaje'] ?? '';
    
            // Validación
            if (empty($nombre) || empty($email) || empty($mensaje)) {
                echo json_encode(['resultado' => 'error', 'mensaje' => 'Todos los campos son obligatorios']);
                return;
            }
    
            // Enviar correo
            $contenido = "<p><strong>Nombre:</strong> {$nombre}</p>";
            $contenido .= "<p><strong>Email:</strong> {$email}</p>";
            $contenido .= "<p><strong>Mensaje:</strong> {$mensaje}</p>";
    
            $emailObj = new \Classes\Email($email, $nombre, '');
            $resultado = $emailObj->enviarMensajeContacto($contenido);
    
            // SOLO UN ECHO
            echo json_encode([
                'resultado' => $resultado ? 'exito' : 'error',
                'mensaje' => $resultado
                    ? 'El mensaje se ha enviado correctamente'
                    : 'No se pudo enviar el mensaje'
            ]);
        }
    }

    public static function verificarDisponibilidad() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            header('Content-Type: application/json');
    
            $input = json_decode(file_get_contents('php://input'), true);
            $fecha = $input['fecha'] ?? null;
            $hora = $input['hora'] ?? null;
            $barberoId = $input['barberoId'] ?? null;
    
            $db = Cita::getDB();
    
            // ✅ Caso 1: Verificar una fecha y hora específicos para un barbero
            if ($fecha && $hora && $barberoId) {
                $stmt = $db->prepare("SELECT id FROM citas WHERE fecha = ? AND hora = ? AND barberoId = ? LIMIT 1");
                $stmt->bind_param("ssi", $fecha, $hora, $barberoId);
                $stmt->execute();
                $stmt->store_result();
    
                echo json_encode(['disponible' => $stmt->num_rows === 0]);
                return;
            }
    
            // ✅ Caso 2: Obtener todas las citas ocupadas para un barbero específico en los próximos 7 días
            $diaActual = new \DateTime();
            $diaActual->modify('+1 day');
            $fechas = [];
    
            for ($i = 0; $i < 7; $i++) {
                $fechas[] = $diaActual->format('Y-m-d');
                $diaActual->modify('+1 day');
            }
    
            if (empty($fechas)) {
                echo json_encode([]);
                return;
            }
    
            $fechasIn = "'" . implode("','", $fechas) . "'";
            $query = "SELECT fecha, hora FROM citas WHERE fecha IN ($fechasIn)";
            
            // ✅ Aplicar filtro de barbero si se envió
            if ($barberoId) {
                $query .= " AND barberoId = " . intval($barberoId);
            }
    
            $resultado = [];
            $consulta = $db->query($query);
    
            if ($consulta) {
                while ($fila = $consulta->fetch_assoc()) {
                    $fila['hora'] = substr($fila['hora'], 0, 5); // recortar segundos
                    $resultado[] = $fila;
                }
            }
    
            echo json_encode($resultado);
        }
    }
}