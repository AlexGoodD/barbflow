<div id="app">
   
    <div id="paso-1" class="seccion">
        <?php include __DIR__ . '/c_servicio.php'; ?>
    </div>
    <div id="paso-2" class="seccion">
        <?php include __DIR__ . '/c_fecha.php'; ?>
    </div>
    <div id="paso-3" class="seccion">
        <?php include __DIR__ . '/c_resumen.php'; ?>
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
<script src='" . appjs('/build/js/app.js') . "'></script>
";
?>