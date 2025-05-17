<nav class="navbar">
    <div class="navbar-inner">
        <div class="navbar-section navbar-left">
            <a href="/home#inicio" class="navbar-item">Inicio</a>
            <a href="/home#nosotros" class="navbar-item">Nosotros</a>
            <a href="/home#servicios" class="navbar-item">Servicios</a>
        </div>

        <div class="navbar-logo-wrapper">
            <img src="/build/img/Bandera.svg" alt="Bandera">
        </div>

        <div class="navbar-section navbar-right">
            <a href="/home#precios" class="navbar-item">Precios</a>
            <a href="/home#contacto" class="navbar-item">Contáctanos</a>
            <a href="/" class="navbar-item cta">Reserva tu cita</a>
        </div>
    </div>
    <div
        class="<?= $claseLogout = (isset($_SESSION['login']) && $_SESSION['login'] === true) ? 'logout-navbar-item' : 'logout-navbar-item hidden' ?>">
        <a href="/logout" class="navbar-item">
            <i class="fa-solid fa-right-from-bracket"></i>
        </a>
    </div>
</nav>