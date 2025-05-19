import {
  mostrarSeccion,
  tabs,
  botonesPaginador,
  paginaSiguiente,
  paginaAnterior,
  actualizarTituloPaso,
} from "./navegacion.js";

import { idCliente, nombreCliente, agregarBotonesReservar } from "./cliente.js";

import { mostrarResumen } from "./resumen.js";

import { consultarAPI } from "./servicios.js";

import { consultarBarberos } from "./barberos.js";

function iniciarApp() {
  mostrarSeccion(),
    tabs(),
    botonesPaginador(),
    paginaSiguiente(),
    paginaAnterior(),
    actualizarTituloPaso();
  consultarAPI(),
    consultarBarberos(),
    idCliente(),
    nombreCliente(),
    mostrarResumen();
  agregarBotonesReservar();
}
export let paso = 1;

export function setPaso(nuevoPaso) {
  paso = nuevoPaso;
}

export const cita = {
  id: "",
  nombre: "",
  fecha: "",
  horaInicio: "",
  horaFin: "",
  servicios: [],
  barberoSeleccionado: null,
};
document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});
