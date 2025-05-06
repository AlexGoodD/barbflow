<?php
$pasoActual = 1; 
?>
<div id="app">
    <div class="step-move">
        <button id="anterior" class="boton">
            <i class="fas fa-chevron-left"></i>
        </button>
        <h1 class="nombre-pagina">Escoge el servicio</h1>
        <button id="siguiente" class="boton">
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>

    <div id="paso-1" class="seccion">
        <?php $pasoActual = 1; include __DIR__ . '/c_servicio.php'; ?>
    </div>
    <div id="paso-2" class="seccion">
        <?php $pasoActual = 2; include __DIR__ . '/c_fecha.php'; ?>
    </div>
    <div id="paso-3" class="seccion">
        <?php $pasoActual = 3; include __DIR__ . '/c_barbero.php'; ?>
    </div>
    <div id="paso-4" class="seccion">
        <?php $pasoActual = 4; include __DIR__ . '/c_contacto.php'; ?>
    </div>
    <div id="paso-5" class="seccion">
        <?php $pasoActual = 5; include __DIR__ . '/c_resumen.php'; ?>
    </div>
</div>

<?php 

function appjs($path)
{
    $fullPath = $_SERVER['DOCUMENT_ROOT'] . $path;
    if (file_exists($fullPath)) {
        return $path . '?v=' . filemtime($fullPath);
    }
    return $path;
}

$script = "
<script src='//cdn.jsdelivr.net/npm/sweetalert2@11'></script>
<script type='module' src='" . appjs('/build/js/app.js') . "'></script>
";
?>