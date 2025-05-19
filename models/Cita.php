<?php

namespace Model;

class Cita extends ActiveRecord {
    // Base de datos
    protected static $tabla = 'citas';
    protected static $columnasDB = ['id', 'fecha', 'horaInicio', 'horaFin', 'usuarioId', 'barberoId'];

    public $id;
    public $fecha;
    public $horaInicio;
    public $horaFin;
    public $usuarioId;
    public $barberoId;
    public $email;
    public $nombre;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->fecha = $args['fecha'] ?? '';
        $this->horaInicio = $args['horaInicio'] ?? '';
        $this->horaFin = $args['horaFin'] ?? '';
        $this->nombre = $args['nombre'] ?? '';
        $this->usuarioId = $args['usuarioId'] ?? '';
        $this->barberoId = $args['barberoId'] ?? '';
    }
}