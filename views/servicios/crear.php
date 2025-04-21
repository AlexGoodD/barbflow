<div class="header-pagina-servicios">
    <a href="/admin/servicios"><i class="fas fa-arrow-left"></i></a>
    <h1 class="nombre-pagina">Nuevo servicio</h1>
</div><?php
    include_once __DIR__ . '/../templates/alertas.php';
?>

<form action="/admin/servicios/crear" method="POST" class="formulario" id="form-servicio">
    <?php include_once __DIR__ . '/formulario.php'; ?>
    <input type="submit" class="boton-crear-servicio" value="Crear servicio">
</form>