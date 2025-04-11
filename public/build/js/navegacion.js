export function mostrarSeccion() {
  const e = document.querySelector(".mostrar");
  e && e.classList.remove("mostrar");
  const t = `#paso-${paso}`;
  document.querySelector(t).classList.add("mostrar");
  const o = document.querySelector(".actual");
  o && o.classList.remove("actual");
  document.querySelector(`[data-paso="${paso}"]`).classList.add("actual");
}

export function tabs() {
  document.querySelectorAll(".tabs button").forEach((e) => {
    e.addEventListener("click", function (e) {
      e.preventDefault();
      paso = parseInt(e.target.dataset.paso);
      mostrarSeccion();
      botonesPaginador();
      actualizarTituloPaso();
    });
  });
}

function botonesPaginador() {
  const botonAnterior = document.querySelector(".step-move #anterior");
  const botonSiguiente = document.querySelector(".step-move #siguiente");

  if (paso === 1) {
    botonAnterior.classList.add("ocultar");
    botonSiguiente.classList.remove("ocultar");
  } else if (paso === 4) {
    botonAnterior.classList.remove("ocultar");
    botonSiguiente.classList.add("ocultar");
    mostrarResumen();
  } else {
    botonAnterior.classList.remove("ocultar");
    botonSiguiente.classList.remove("ocultar");
  }

  mostrarSeccion();
  actualizarTituloPaso();
}

export function paginaAnterior() {
  const botonAnterior = document.querySelector(".step-move #anterior");
  botonAnterior.addEventListener("click", function () {
    if (paso > 1) {
      paso--;
      botonesPaginador();
    }
  });
}

export function paginaSiguiente() {
  const botonSiguiente = document.querySelector(".step-move #siguiente");
  botonSiguiente.addEventListener("click", function () {
    if (paso < 4) {
      paso++;
      botonesPaginador();
    }
  });
}

export function actualizarTituloPaso() {
  const titulo = document.querySelector(".nombre-pagina");

  const titulos = {
    1: "Escoge el servicio",
    2: "Escoge una fecha",
    3: "Confirmación de datos",
    4: "Resumen de cita",
  };

  if (titulo) {
    titulo.textContent = titulos[paso] || "Paso desconocido";
  }
}
