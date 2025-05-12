<div class="campo">
    <label for="nombre">Nombre</label>
    <input type="text" id="nombre" placeholder="Nombre de barbero" name="nombre"
        value="<?php echo $barbero->nombre; ?>" />
</div>

<div class="campo">
    <label for="descripcion">Especialidad</label>
    <input type="text" id="especialidad" placeholder="Especialidad barbero" name="especialidad"
        value="<?php echo $barbero->especialidad; ?>" />
</div>


<?php
    $script = "<script type='module'>
    import { validarFormularioServicios } from '/build/js/utils.js';
    validarFormularioServicios();
    </script>";
?>