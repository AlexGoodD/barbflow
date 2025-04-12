<h1 class="nombre-pagina">Inicio de sesión</h1>
<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form class="formulario" method="POST" action="/">
    <div class="campo">
        <label for="email">Correo electrónico</label>
        <input
            type="email"
            id="email"
            placeholder="Ingresa tu correo electrónico"
            name="email"
        />
    </div>

    <div class="campo">
        <label for="password">Contraseña</label>
        <input 
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            name="password"
        />
    </div>

    <input type="submit" class="boton-login" value="Iniciar Sesión">
</form>

<div class="acciones">
    <a href="/crear-cuenta" class="crear-cuenta">¿Aún no tienes una cuenta? Regístrate</a>
    <a href="/olvide" class="olvide-contraseña">¿Olvidaste tu contraseña?</a>
</div>