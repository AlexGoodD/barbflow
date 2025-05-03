<h1 class="nombre-pagina">Confirmación de cuneta</h1>

<div class="acciones">
    <a class="boton-login" href="/">Iniciar sesión</a>
</div>

<?php if (!empty($alertas)) : ?>
<script>
window.erroresLogin = <?php echo json_encode($alertas); ?>;
window.alertasGlobales = <?php echo json_encode($alertas); ?>;
</script>
<?php endif; ?>

<script type="module" src="/build/js/formErrores.js"></script>
<script type="module" src="/build/js/globalAlertas.js"></script>