<div class="header-pagina-barberos">
    <a href="/admin/barberos"><i class="fas fa-arrow-left"></i></a>
    <h1 class="nombre-pagina">Nuevo barbero</h1>
</div>
<form action="/admin/barberos/crear" method="POST" class="formulario" id="form-barbero">
    <?php include_once __DIR__ . '/formulario.php'; ?>
    <input type="submit" class="boton-crear" value="Crear barbero">
</form>

<?php if (!empty($alertas)) : ?>
<script>
window.erroresLogin = <?php echo json_encode($alertas); ?>;
window.alertasGlobales = <?php echo json_encode($alertas); ?>;
</script>
<?php endif; ?>

<script type="module" src="/build/js/formErrores.js"></script>
<script type="module" src="/build/js/globalAlertas.js"></script>