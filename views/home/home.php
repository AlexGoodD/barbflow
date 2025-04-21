<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/build/css/base.css">
    <link rel="stylesheet" href="/build/css/typography.css">
    <link rel="stylesheet" href="/build/css/landing.css">
    <link rel="stylesheet" href="/build/css/utilities.css">
    <link rel="stylesheet" href="/build/css/components.css">
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/shoelace.js">
    </script>
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/themes/light.css">

    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
    <script type='module'>
    import {
        carruselFotos,
        navbarScrolling,
        formularioContactoHandler
    } from '/build/js/utils.js';
    carruselFotos();
    navbarScrolling();
    formularioContactoHandler();
    </script>

    <script type='module'>
    import {
        mostrarPrecios
    } from '/build/js/servicios.js';
    mostrarPrecios();
    </script>

    <title>Barbflow</title>
</head>

<body>

    <?php include __DIR__ . '/../templates/navbar.php'; ?>

    <div class="contenedor-app"></div>


    <div class="helper" id="inicio"></div>

    <!-- 🟣 SECCIÓN 1: Hero -->
    <section class="hero">
        <div class="container">
        </div>
    </section>

    <div class="helper" id="nosotros"></div>

    <!-- 🟠 SECCIÓN 2: Nosotros -->
    <section class="nosotros">
        <div class="container">
            <div class="container-intern">
                <div class="info-left">
                    <h2>Confía en nuestros resultados</h2>
                    <p>Somos una barbería enfocada en nuestros clientes. Procuramos conseguir el corte que esperas y no
                        decepcionarte. Respetando como máxima tu criterio, gustos y preferencia ante todo.</p>
                </div>
                <div class="carousel-about">
                    <div class="carousel-item-1"></div>
                    <div class="carousel-item-2"></div>
                    <div class="carousel-item-3"></div>
                    <div class="carousel-item-4"></div>
                    <div class="carousel-item-5"></div>
                </div>
            </div>
        </div>
    </section>

    <div class="helper" id="servicios"></div>

    <!-- 🟡 SECCIÓN 3: Servicio -->
    <section class="servicios">
        <div class="container">
            <div class="container-intern">
                <div class="lista-servicios">
                    <div class="servicio-1">
                        <div class="servicio-img-1"></div>
                        <p class="servicio-titulo">Corte de cabello personalizado</p>
                        <p class="servicio-descripcion">Servicio clásico con opciones de estilo moderno o tradicional,
                            adaptado a las preferencias del cliente.</p>
                    </div>
                    <div class="servicio-2">
                        <div class="servicio-img-2"></div>
                        <p class="servicio-titulo">Afeitado y perfilado de barba</p>
                        <p class="servicio-descripcion">Tratamiento profesional que incluye el delineado de la barba,
                            afeitado con navaja y aplicación de productos especiales para el cuidado facial.</p>
                    </div>
                    <div class="servicio-3">
                        <div class="servicio-img-3"></div>
                        <p class="servicio-titulo">Mascarilla facial para hombres</p>
                        <p class="servicio-descripcion">Servicio de limpieza profunda con mascarilla que ayuda a
                            eliminar impurezas, relajar la piel y mejorar la apariencia del rostro.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="helper" id="precios"></div>


    <!-- 🟢 SECCIÓN 4: precios -->
    <section class="precios">
        <div class="container">
            <div class="container-intern">
                <div class="info-left">

                </div>
                <div class="info-right">
                    <h2>Porque lo barato también puede ser bueno</h2>
                    <p>Nos enfocamos en ofrecerte el corte que realmente quieres, sin complicaciones ni sorpresas.
                        Escuchamos tus gustos, respetamos tus decisiones y trabajamos con detalle para que salgas
                        conforme. Porque creemos que verse bien no tiene que costar de más…<strong
                            class="precios-bold-info"> lo barato también puede ser bueno.</strong></p>
                </div>
            </div>
        </div>
    </section>

    <div class="helper" id="contacto"></div>


    <!-- 🔵 SECCIÓN 5: Contacto -->
    <section class="contacto">
        <div class="container">
            <div class="container-intern">
                <div class="info-left">
                    <h2>Estamos dispuestos a resolverte cualquier duda</h2>
                    <div class="contacto-info">
                        <p class="tipo">Número de telefono:</p>
                        <p class="valor">81-####-####</p>
                    </div>
                    <div class="contacto-info">
                        <p class="tipo">Correo electrónico:</p>
                        <p class="valor">8thebarbers@gmail.com</p>
                    </div>
                    <div class="contacto-info">
                        <p class="tipo">Dirección:</p>
                        <p class="valor">Calle #, Colonia, Estado, País</p>
                    </div>
                </div>
                <div class="info-right">
                    <form class="formulario" action="/api/enviar-mensaje" method="post" id="form-contacto">
                        <div class="contacto-inf">
                            <label for="nombre">Nombre completo</label>
                            <input type="text" name="nombre">
                        </div>
                        <div class="contacto-inf">
                            <label for="email">Correo electrónico</label>
                            <input type="email" name="email">
                        </div>
                        <div class="contacto-inf">
                            <label for="email">Mensaje</label>
                            <textarea name="mensaje"></textarea>
                        </div>
                        <input type="submit" value="Enviar mensaje" class="btn-enviar-msj">
                    </form>
                </div>
            </div>
        </div>
    </section>

</body>

</html>