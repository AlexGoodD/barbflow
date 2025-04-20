<div class="header-pagina-servicios">
    <a href="/admin/servicios"><i class="fas fa-arrow-left"></i></a>
    <h1 class="nombre-pagina">Actualizar servicio</h1>
</div>
<?php
    include_once __DIR__ . '/../templates/alertas.php';
?>

<form method="POST" class="formulario">
    <?php include_once __DIR__ . '/formulario.php'; ?>
    <input type="submit" class="boton-actualizar" value="Actualizar">
</form>