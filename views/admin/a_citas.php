<h2 class="seccion-admin">Buscar citas</h2>
<div class="busqueda">
    <form class="formulario">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" id="fecha" name="fecha" value="<?php echo $fecha; ?>" />
        </div>
    </form>
</div>

<?php if (count($citas) === 0): ?>
<h2 class='helper-citas'>No se encuentra ninguna cita en esta fecha</h2>
<?php else: ?>
<div id="citas-admin">
    <?php
        $idCita = 0;
        foreach ($citas as $cita):
            if ($idCita !== $cita->id):
                $idCita = $cita->id;

                $serviciosCita = array_filter($citas, fn($item) => $item->id === $cita->id);
                $total = array_reduce($serviciosCita, fn($carry, $item) => $carry + $item->precio, 0);
        ?>
    <div class="cita-card">
        <div class="cita-info" id="citas-<?php echo $cita->id; ?>">
            <div class="header-card">
                <p>Cita <span>#<?php echo $cita->id; ?></span></p>
                <form action="/api/eliminar" method="POST" class="form-eliminar">
                    <input type="hidden" name="id" value="<?php echo $cita->id; ?>">
                    <i class="fa-solid fa-trash"></i>
                </form>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-calendar-days"></i>
                <p><?php echo date('d/m/Y', strtotime($fecha)); ?></p>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-clock"></i>
                <p><?php echo date('h:i a', strtotime($cita->hora)); ?></p>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-user"></i>
                <p><?php echo $cita->cliente; ?></p>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-envelope"></i>
                <p><?php echo $cita->email; ?></p>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-phone"></i>
                <p><?php echo $cita->telefono; ?></p>
            </div>
            <div class="btn-bottom-card">
                <button class="boton-ver-mas" data-id="<?php echo $cita->id; ?>">Ver resumen</button>
            </div>
        </div>
        <div class="servicios-info" id="servicios-<?php echo $cita->id; ?>" style="display: none;">
            <div class="header-card">
                <p>Cita <span>#<?php echo $cita->id; ?></span></p>
                <form action="/api/eliminar" method="POST" class="form-eliminar">
                    <input type="hidden" name="id" value="<?php echo $cita->id; ?>">
                    <i class="fa-solid fa-trash"></i>
                </form>
            </div>
            <div class="header-servicios-card">
            <p>Servicios</p>
            <p>Precios</p>
            </div>
            <ul>
                <?php foreach ($serviciosCita as $servicio): ?>
                <li>
                    <p><?php echo $servicio->servicio; ?></p>
                    <p>$<?php echo number_format($servicio->precio ?? 0, 2); ?> MXN</p>
                </li>
                <?php endforeach; ?>
            </ul>
            <div class="bottom-servicios-card">
            <p>Total</p>
            <p>$<?php echo number_format($total, 2); ?> MXN</p>
            </div>
            <div class="btn-bottom-card">
                <button class="boton-ver-mas" data-id="<?php echo $cita->id; ?>">Ver detalles</button>
            </div>
        </div>
    </div>
    <?php 
            endif;
        endforeach; 
        ?>
</div>
<?php endif; ?>