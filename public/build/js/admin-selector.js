document.addEventListener('DOMContentLoaded', function () {
    const btnCitas = document.getElementById('btn-citas');
    const btnServicios = document.getElementById('btn-servicios');
    const citasSection = document.getElementById('admin-citas-section');
    const serviciosSection = document.getElementById('admin-servicios-section');

    function toggleActiveButton(activeButton, inactiveButton) {
        activeButton.classList.add('active');
        inactiveButton.classList.remove('active');
    }

    // Detectar la URL actual y activar el botón correspondiente
    const currentPath = window.location.pathname;
    if (currentPath.includes('/admin/citas')) {
        toggleActiveButton(btnCitas, btnServicios);
    } else if (currentPath.includes('/admin/servicios')) {
        toggleActiveButton(btnServicios, btnCitas);
    }

    btnCitas.addEventListener('click', function () {
        toggleActiveButton(btnCitas, btnServicios);
        window.location.href = '/admin/citas';
    });

    btnServicios.addEventListener('click', function () {
        toggleActiveButton(btnServicios, btnCitas);
        window.location.href = '/admin/servicios';
    });
});