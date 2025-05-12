<h1 class="nombre-pagina">Panel de administración</h1>

<div id="admin-section-selector">
    <button id="btn-citas" class="boton">Citas</button>
    <button id="btn-barberos" class="boton">Barberos</button>
    <button id="btn-servicios" class="boton">Servicios</button>
</div>

<div class="top-servicios-admin">
    <h2 class="seccion-admin">Listado de servicios</h2>
    <a class="boton" href="/admin/servicios/crear">Nuevo servicio</a>
</div>

<ul class="servicios">
    <?php foreach($servicios as $servicio) { ?>
    <div class="servicios-card">
        <li>
            <div class="servicio-info">
                <div class="header-servicio-info">
                    <p><?php echo $servicio->nombre; ?> </p>
                    <div class="servicio-acciones">
                        <!-- Icono para actualizar -->
                        <a href="/admin/servicios/actualizar?id=<?php echo $servicio->id; ?>">
                            <i class="fa-solid fa-pencil editar-icono"></i>
                        </a>

                        <!-- Icono para eliminar -->
                        <form action="/admin/servicios/eliminar" method="POST" class="btn-eliminar-servicio">
                            <input type="hidden" name="id" value="<?php echo $servicio->id; ?>">
                            <button type="submit" class="icono-eliminar"><i
                                    class="fa-solid fa-trash eliminar-icono"></i></button>
                        </form>
                    </div>
                </div>
                <p><?php echo $servicio->descripcion; ?></p>
                <div class="bottom-servicio-info">
                    <div class="servicio-item-info-card">
                        <p>$</p>
                        <p><?php echo $servicio->precio; ?> MXN</p>
                    </div>
                    <div class="servicio-item-info-card" id="duracion-item-info">
                        <i class="fa-solid fa-clock"></i>
                        <p><?php echo $servicio->duracion; ?> min</p>
                    </div>
                </div>
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