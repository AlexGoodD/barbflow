<?php include __DIR__ . '/../templates/wizard.php'; ?>
<div class="campos-contacto">
    <div class="nombre-completo">
        <div class="campo">
                <label for="nombres">Nombre(s)</label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Nombre(s)"
                    value="<?php echo $nombre; ?>"
                    disabled
                /></div>
        <div class="campo">
        <label for="apellidos">Apellido(s)</label>
        <input
            id="apellido"
            type="text"
            placeholder="Apellido(s)"
            value="<?php echo $apellido; ?>"
            disabled
        />
        </div>
    </div>
    <div class="campo">
        <label for="email">Email</label>
        <input
            id="email"
            type="email"
            placeholder="Email"
            value="<?php echo $email; ?>"
            disabled
        />
    </div>
</div>