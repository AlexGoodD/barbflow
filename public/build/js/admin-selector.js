document.addEventListener('DOMContentLoaded', function () {
    const btnCitas = document.getElementById('btn-citas');
    const btnServicios = document.getElementById('btn-servicios');
    const citasSection = document.getElementById('admin-citas-section');
    const serviciosSection = document.getElementById('admin-servicios-section');

    btnCitas.classList.add('active');

    function toggleActiveButton(activeButton, inactiveButton) {
        activeButton.classList.add('active');
        inactiveButton.classList.remove('active');
    }

    btnCitas.addEventListener('click', function () {
        citasSection.style.display = 'block';
        serviciosSection.style.display = 'none';
        toggleActiveButton(btnCitas, btnServicios);
    });

    btnServicios.addEventListener('click', function () {
        citasSection.style.display = 'none';
        serviciosSection.style.display = 'block';
        toggleActiveButton(btnServicios, btnCitas);
    });
});