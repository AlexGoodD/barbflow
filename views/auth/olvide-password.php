<h1 class="nombre-pagina">Olvidé mi contraseña</h1>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>
<p class="descripcion-pagina">Coloca tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña</p>
<form class="formulario" action="/olvide" method="POST">
    <div class="campo">
        <label for="email">Correo electrónico</label>
        <input 
            type="email"
            id="email"
            name="email"
            placeholder="Tu Email"
        />
    </div>

    <input type="submit" class="boton-instrucciones" value="Enviar Instrucciones">
</form>

<div class="acciones">
    <a href="/crear-cuenta" class="crear-cuenta">¿Aún no tienes una cuenta? Regístrate</a>
    <a href="/" class="iniciar-sesion">¿Ya tienes una cuenta? Inicia sesión</a>
</div>