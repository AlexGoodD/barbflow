<?php

namespace Model;

class Cita extends ActiveRecord {
    // Base de datos
    protected static $tabla = 'citas';
    protected static $columnasDB = ['id', 'fecha', 'hora', 'usuarioId', 'barberoId'];

    public $id;
    public $fecha;
    public $hora;
    public $usuarioId;
    public $barberoId;
    public $email;
    public $nombre;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->fecha = $args['fecha'] ?? '';
        $this->hora = $args['hora'] ?? '';
        $this->nombre = $args['nombre'] ?? '';
        $this->usuarioId = $args['usuarioId'] ?? '';
        $this->barberoId = $args['barberoId'] ?? '';
    }
}