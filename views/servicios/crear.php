<div class="header-pagina-servicios">
    <a href="/admin/servicios"><i class="fas fa-arrow-left"></i></a>
    <h1 class="nombre-pagina">Nuevo servicio</h1>

    <form action="/admin/servicios/crear" method="POST" class="formulario" id="form-servicio">
        <?php include_once __DIR__ . '/formulario.php'; ?>
        <input type="submit" class="boton-crear-servicio" value="Crear servicio">
    </form>

    <?php if (!empty($alertas)) : ?>
    <script>
    window.erroresLogin = <?php echo json_encode($alertas); ?>;
    window.alertasGlobales = <?php echo json_encode($alertas); ?>;
    </script>
    <?php endif; ?>

    <script type="module" src="/build/js/formErrores.js"></script>
    <script type="module" src="/build/js/globalAlertas.js"></script>