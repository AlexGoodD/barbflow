<div class="campo">
    <label for="nombre">Nombre</label>
    <input type="text" id="nombre" placeholder="Nombre Servicio" name="nombre"
        value="<?php echo $servicio->nombre; ?>" />
</div>

<div class="campo">
    <label for="descripcion">Descripción</label>
    <input type="text" id="descripcion" placeholder="Descripción Servicio" name="descripcion"
        value="<?php echo $servicio->descripcion; ?>" />
</div>

<div class="campos-numericos">
    <div class="campo">
        <label for="duracion">Duración</label>
        <input type="number" id="duracion" placeholder="Duración Servicio" name="duracion"
            value="<?php echo $servicio->duracion; ?>" />
    </div>

    <div class="campo">
        <label for="precio">Precio</label>
        <input type="number" id="precio" placeholder="Precio Servicio" name="precio"
            value="<?php echo $servicio->precio; ?>" />
    </div>
</div>

<?php
    $script =  "<script type='module' src='/build/js/validarFormulario.js'></script>";
?>