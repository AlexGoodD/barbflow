<?php
$pasoActual = 2; // Define el paso actual para este archivo
?>
<div class="step-move">
    <button id="anterior" class="boton">
        <i class="fas fa-chevron-left"></i>
    </button>
    <h1 class="nombre-pagina">Escoge una fecha</h1>
    <button id="siguiente" class="boton">
        <i class="fas fa-chevron-right"></i>
    </button>
</div><?php include __DIR__ . '/../templates/wizard.php'; ?>

<form class="formulario">
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input
            id="nombre"
            type="text"
            placeholder="Tu Nombre"
            value="<?php echo $nombre; ?>"
            disabled
        />
    </div>

    <div class="campo">
        <label for="fecha">Fecha</label>
        <input
            id="fecha"
            type="date"
            min="<?php echo date('Y-m-d', strtotime('+1 day') ); ?>"
        />
    </div>

    <div class="campo">
        <label for="hora">Hora</label>
        <input
            id="hora"
            type="time"
        />
    </div>
    <input type="hidden" id="id" value="<?php echo $id; ?>" >
</form>