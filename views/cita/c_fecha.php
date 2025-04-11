<?php include __DIR__ . '/../templates/wizard.php'; ?>

<form class="formulario">
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
