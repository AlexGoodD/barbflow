<?php
    $pasoActual = 1; // Define el paso actual para este archivo
?>
<div class="step-move">
    <button id="anterior" class="boton">
        <i class="fas fa-chevron-left"></i>
    </button>
    <h1 class="nombre-pagina">Escoge el servicio</h1>
    <button id="siguiente" class="boton">
        <i class="fas fa-chevron-right"></i>
    </button>
</div>
<?php include __DIR__ . '/../templates/wizard.php'; ?>
<div id="servicios" class="listado-servicios"></div>
