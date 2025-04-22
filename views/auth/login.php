<h1 class="nombre-pagina">Inicio de sesión</h1>

<form class="formulario" method="POST" action="/">
    <div class="campo">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" placeholder="Ingresa tu correo electrónico" name="email" />
    </div>

    <div class="campo">
        <label for="password">Contraseña</label>
        <input type="password" id="password" placeholder="Ingresa tu contraseña" name="password" />
    </div>

    <input type="submit" class="boton-login" value="Iniciar Sesión">
</form>

<div class="acciones">
    <a href="/crear-cuenta" class="crear-cuenta">¿Aún no tienes una cuenta? Regístrate</a>
    <a href="/olvide" class="olvide-contraseña">¿Olvidaste tu contraseña?</a>
</div>

<?php if (!empty($alertas)) : ?>
<script>
window.erroresLogin = <?php echo json_encode($alertas); ?>;
window.alertasGlobales = <?php echo json_encode($alertas); ?>;
</script>
<?php endif; ?>

<script type="module" src="/build/js/formErrores.js"></script>
<script type="module" src="/build/js/globalAlertas.js"></script>