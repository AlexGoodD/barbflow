<h1 class="nombre-pagina">Olvidé mi contraseña</h1>

<p class="descripcion-pagina">Coloca tu correo electrónico y te enviaremos las instrucciones para restablecer tu
    contraseña</p>

<form class="formulario" action="/olvide" method="POST">
    <div class="campo">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" name="email" placeholder="Tu correo electrónico" />
    </div>

    <input type="submit" class="boton-instrucciones" value="Enviar Instrucciones">
</form>

<div class="acciones">
    <a href="/crear-cuenta" class="crear-cuenta">¿Aún no tienes una cuenta? Regístrate</a>
    <a href="/" class="iniciar-sesion">¿Ya tienes una cuenta? Inicia sesión</a>
</div>

<?php if (!empty($alertas)) : ?>
<script>
window.erroresOlvide = <?php echo json_encode($alertas); ?>;
window.alertasGlobales = <?php echo json_encode($alertas); ?>;
</script>
<?php endif; ?>

<script type="module" src="/build/js/formErrores.js"></script>
<script type="module" src="/build/js/globalAlertas.js"></script>