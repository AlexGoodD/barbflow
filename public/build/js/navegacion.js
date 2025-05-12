import { paso, setPaso } from "./app.js";
import { mostrarResumen } from "./resumen.js";

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
      setPaso(parseInt(e.target.dataset.paso));
      mostrarSeccion();
      botonesPaginador();
      actualizarTituloPaso();
    });
  });
}

export function botonesPaginador() {
  const botonAnterior = document.querySelector(".step-move #anterior");
  const botonSiguiente = document.querySelector(".step-move #siguiente");

  if (paso === 1) {
    botonAnterior.classList.add("ocultar");
    botonSiguiente.classList.remove("ocultar");
  } else if (paso === 5) {
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
  botonAnterior.removeEventListener("click", handlePaginaAnterior); // Elimina cualquier evento previo
  botonAnterior.addEventListener("click", handlePaginaAnterior); // Registra el evento
}

function handlePaginaAnterior() {
  if (paso > 1) {
    setPaso(paso - 1);
    botonesPaginador();
  }
}

export function paginaSiguiente() {
  const botonSiguiente = document.querySelector(".step-move #siguiente");
  botonSiguiente.removeEventListener("click", handlePaginaSiguiente); // Elimina cualquier evento previo
  botonSiguiente.addEventListener("click", handlePaginaSiguiente); // Registra el evento
}

function handlePaginaSiguiente() {
  if (paso < 5) {
    setPaso(paso + 1);
    botonesPaginador();
  }
}

export function actualizarTituloPaso() {
  const titulo = document.querySelector(".nombre-pagina");

  const titulos = {
    1: "Escoge el servicio",
    2: "Selecciona un barbero",
    3: "Escoge una fecha",
    4: "Confirmación de datos",
    5: "Resumen de cita",
  };

  if (titulo) {
    titulo.textContent = titulos[paso] || "Paso desconocido";
  }
}
