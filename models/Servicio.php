<?php 

namespace Model;

class Servicio extends ActiveRecord {
    // Base de datos
    protected static $tabla = 'servicios';
    protected static $columnasDB = ['id', 'nombre', 'precio', 'duracion', 'descripcion'];

    public $id;
    public $nombre;
    public $precio;
    public $duracion;
    public $descripcion;


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->precio = $args['precio'] ?? '';
        $this->duracion = $args['duracion'] ?? '';
        $this->descripcion = $args['descripcion'] ?? '';

    }

    public function validar() {
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre del Servicio es Obligatorio';
        }
        if(!$this->precio) {
            self::$alertas['error'][] = 'El Precio del Servicio es Obligatorio';
        }
        if(!is_numeric($this->precio)) {
            self::$alertas['error'][] = 'El precio no es válido';
        }
        if(!is_numeric($this->duracion)) {
            self::$alertas['error'][] = 'La duración no es válida';
        }
        if(!$this->descripcion) {
            self::$alertas['error'][] = 'La descripcion del Servicio es Obligatorio';
        }

        return self::$alertas;
    }
}