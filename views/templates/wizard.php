<nav class="tabs">
    <button class="<?= $pasoActual === 1 ? 'actual' : ($pasoActual > 1 ? 'completado' : '') ?>" type="button"
        data-paso="1">
    </button>
    <button class="<?= $pasoActual === 2 ? 'actual' : ($pasoActual > 2 ? 'completado' : '') ?>" type="button"
        data-paso="2">
    </button>
    <button class="<?= $pasoActual === 3 ? 'actual' : ($pasoActual > 3 ? 'completado' : '') ?>" type="button"
        data-paso="3">
    </button>
    <button class="<?= $pasoActual === 4 ? 'actual' : ($pasoActual > 4 ? 'completado' : '') ?>" type="button"
        data-paso="4">
    </button>
    <button class="<?= $pasoActual === 5 ? 'actual' : ($pasoActual > 5 ? 'completado' : '') ?>" type="button"
        data-paso="5">
    </button>
</nav>