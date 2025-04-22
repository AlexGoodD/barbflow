<h1 class="nombre-pagina">Registro</h1>

<form class="formulario" method="POST" action="/crear-cuenta">

    <div class="campo">
        <label for="nombre">Nombre(s)</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu Nombre"
            value="<?php echo s($usuario->nombre); ?>" />
    </div>

    <div class="campo">
        <label for="apellido">Apellido(s)</label>
        <input type="text" id="apellido" name="apellido" placeholder="Tu Apellido"
            value="<?php echo s($usuario->apellido); ?>" />
    </div>

    <div class="campo">
        <label for="telefono">Teléfono</label>
        <input type="tel" id="telefono" name="telefono" placeholder="Tu Teléfono"
            value="<?php echo s($usuario->telefono); ?>" />
    </div>

    <div class="campo">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" name="email" placeholder="Tu E-mail" value="<?php echo s($usuario->email); ?>" />
    </div>

    <div class="campo">
        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password" placeholder="Tu Password" />
    </div>

    <input type="submit" value="Registrarme" class="boton-registro">
</form>

<div class="acciones">
    <a href="/" class="iniciar-sesion">¿Ya tienes una cuenta? Inicia sesión</a>
    <a href="/olvide" class="olvide-contraseña">¿Olvidaste tu contraseña?</a>
</div>

<?php if (!empty($alertas)) : ?>
<script>
window.erroresRegistro = <?php echo json_encode($alertas); ?>;
window.alertasGlobales = <?php echo json_encode($alertas); ?>;
</script>
<?php endif; ?>

<script type="module" src="/build/js/formErrores.js"></script>
<script type="module" src="/build/js/globalAlertas.js"></script>