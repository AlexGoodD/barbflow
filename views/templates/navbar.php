<nav class="navbar">
  <ul class="navbar-menu">
    <div class="navbar-first">
    <li class="navbar-item" id="navbar-item-inicio">
      <a href="/home#inicio">Inicio</a>
    </li>
    <li class="navbar-item" id="navbar-item-nosotros">
      <a href="/home#nosotros">Nosotros</a>
    </li>
    <li class="navbar-item" id="navbar-item-servicios">
      <a href="/home#servicios">Servicios</a>
    </li>
    </div>
    <li class="navbar-item navbar-flag-item">
      <img src="/build/img/Bandera.svg" alt="Bandera" class="navbar-flag">
    </li>
    <div class="navbar-second">
    <li class="navbar-item" id="navbar-item-precios">
      <a href="/home#precios">Precios</a>
    </li>
    <li class="navbar-item" id="navbar-item-contacto">
      <a href="/home#contacto">Contacto</a>
    </li>
    <li class="navbar-item" id="navbar-item-reservacion">
      <a href="/">Reserva tu cita</a>
    </li>
    <?php if (isset($_SESSION['login']) && $_SESSION['login'] === true): ?>
        <li class="navbar-item">
          <a href="/logout">Cerrar sesión</a>
        </li>
      <?php endif; ?>
  </ul>
</nav>