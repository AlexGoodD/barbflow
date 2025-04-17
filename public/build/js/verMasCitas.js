const botonesVerMas = document.querySelectorAll('.boton-ver-mas');

botonesVerMas.forEach(boton => {
    boton.addEventListener('click', () => {
        const citasInfo = document.getElementById('citas');
        const serviciosInfo = document.getElementById('servicios');
        if (serviciosInfo.style.display === 'none' || serviciosInfo.style.display === '') {
            serviciosInfo.style.display = 'block';
            citasInfo.style.display = 'none';
        } else {
            serviciosInfo.style.display = 'none';
            citasInfo.style.display = 'block';
        }
    });
});