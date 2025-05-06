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

function iniciarApp() {
  mostrarSeccion(),
    tabs(),
    botonesPaginador(),
    paginaSiguiente(),
    paginaAnterior(),
    actualizarTituloPaso();
  consultarAPI(), idCliente(), nombreCliente(), mostrarResumen();
  agregarBotonesReservar();
}
export let paso = 1;

export function setPaso(nuevoPaso) {
  paso = nuevoPaso;
}

export const cita = { id: "", nombre: "", fecha: "", hora: "", servicios: [] };
document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});
