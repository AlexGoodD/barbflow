<nav class="tabs">
    <button 
        class="<?= $pasoActual === 1 ? 'actual' : ($pasoActual > 1 ? 'completado' : '') ?>" 
        type="button" 
        data-paso="1">
    </button>
    <button 
        class="<?= $pasoActual === 2 ? 'actual' : ($pasoActual > 2 ? 'completado' : '') ?>" 
        type="button" 
        data-paso="2">
    </button>
    <button 
        class="<?= $pasoActual === 3 ? 'actual' : ($pasoActual > 3 ? 'completado' : '') ?>" 
        type="button" 
        data-paso="3">
    </button>
</nav>