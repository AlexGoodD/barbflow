<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nueva contraseña a continuación</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<?php if($error) return; ?>
<form class="formulario" method="POST">
    <div class="campo">
        <label for="password">Nueva contraseña</label>
        <input
            type="password"
            id="password"
            name="password"
            placeholder="Tu Nuevo Password"
        />
    </div>
    <input type="submit" class="boton-recuperar" value="Reestablecer contraseña">

</form>

<div class="acciones">
    <a href="/crear-cuenta" class="crear-cuenta">¿Aún no tienes una cuenta? Regístrate</a>
    <a href="/login" class="iniciar-sesion">¿Ya tienes una cuenta? Inicia sesión</a>
</div>