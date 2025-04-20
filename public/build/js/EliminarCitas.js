document.addEventListener('DOMContentLoaded', () => {
    const eliminarIconos = document.querySelectorAll('.eliminar-icono');

    eliminarIconos.forEach(icono => {
        icono.addEventListener('click', (e) => {
            e.preventDefault();
            const form = icono.closest('.form-eliminar');
            if (form) {
                form.submit();
            }
        });
    });
});