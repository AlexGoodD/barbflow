const botonesVerMas = document.querySelectorAll('.boton-ver-mas');

botonesVerMas.forEach(boton => {
    boton.addEventListener('click', () => {
        const citaId = boton.getAttribute('data-id');
        const citasInfo = document.getElementById(`citas-${citaId}`);
        const serviciosInfo = document.getElementById(`servicios-${citaId}`);
        
        if (serviciosInfo.style.display === 'none' || serviciosInfo.style.display === '') {
            serviciosInfo.style.display = 'block';
            citasInfo.style.display = 'none';
        } else {
            serviciosInfo.style.display = 'none';
            citasInfo.style.display = 'block';
        }
    });
});