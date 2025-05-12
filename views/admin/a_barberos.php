<h1 class="nombre-pagina">Panel de administración</h1>

<div id="admin-section-selector">
    <button id="btn-citas" class="boton">Citas</button>
    <button id="btn-barberos" class="boton">Barberos</button>
    <button id="btn-servicios" class="boton">Servicios</button>
</div>

<div class="top-servicios-admin">
    <h2 class="seccion-admin">Listado de barberos</h2>
    <a class="boton" href="/admin/barberos/crear">Nuevo barbero</a>
</div>

<ul class="barberos">
    <?php foreach($barberos as $barbero) { ?>
    <div class="barberos-card">
        <li>
            <div class="barbero-info">
                <div class="header-barbero-info">
                    <p><?php echo $barbero->nombre; ?></p>
                    <div class="barbero-acciones">
                        <!-- Icono para actualizar -->
                        <a href="/admin/barberos/actualizar?id=<?php echo $barbero->id; ?>">
                            <i class="fa-solid fa-pencil editar-icono"></i>
                        </a>
                        <!-- Icono para eliminar -->
                        <form action="/admin/barberos/eliminar" method="POST" class="btn-eliminar-barbero">
                            <input type="hidden" name="id" value="<?php echo $barbero->id; ?>">
                            <button type="submit" class="icono-eliminar"><i
                                    class="fa-solid fa-trash eliminar-icono"></i></button>
                        </form>
                    </div>
                </div>
                <p><?php echo $barbero->especialidad; ?></p>

            </div>
        </li>
    </div>
    <?php } ?>
</ul>

<?php
    $script = "<script type='module'>
    import { adminSelectorSeccion, buttonVerMas } from '/build/js/utils.js';
    adminSelectorSeccion();
    buttonVerMas();
</script>";
?>