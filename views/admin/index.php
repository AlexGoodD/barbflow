<h1 class="nombre-pagina">Panel de administración</h1>

<div id="admin-section-selector">
    <button id="btn-citas" class="boton">Citas</button>
    <button id="btn-servicios" class="boton">Servicios</button>
</div>

<div id="admin-citas-section">
    <?php
        include __DIR__ . '/a_citas.php';
    ?>
</div>

<div id="admin-servicios-section">
    <?php
        include __DIR__ . '/a_servicios.php';
    ?>
</div>

<?php
    $script = "<script src='/build/js/buscador.js'></script>";
    $script .= "<script src='/build/js/admin-selector.js'></script>";
    $script .= "<script src='/build/js/verMasCitas.js'></script>";
    $script .= "<script src='/build/js/EliminarCitas.js'></script>";
    $script .= "<script src='/build/js/validarFormulario.js'></script>";
?>