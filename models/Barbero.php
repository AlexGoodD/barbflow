<?php 

namespace Model;

class Barbero extends ActiveRecord {
    // Base de datos
    protected static $tabla = 'barberos';
    protected static $columnasDB = ['id', 'nombre', 'especialidad'];

    public $id;
    public $nombre;
    public $especialidad;


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->especialidad = $args['especialidad'] ?? '';

    }

    public function validar() {
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El nombre del barbero es obligatorio';
        }
        if(!$this->especialidad) {
            self::$alertas['error'][] = 'La especialidad del barbero es obligatoria';
        }

        return self::$alertas;
    }
}