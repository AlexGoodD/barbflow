import {
  mostrarSeccion,
  tabs,
  botonesPaginador,
  paginaSiguiente,
  paginaAnterior,
} from "./navegacion.js";
import {
  idCliente,
  nombreCliente,
  seleccionarFecha,
  seleccionarHora,
} from "./cliente.js";
import { mostrarResumen } from "./resumen.js";
import { consultarAPI } from "./servicios.js";
function iniciarApp() {
  mostrarSeccion(),
    tabs(),
    botonesPaginador(),
    paginaSiguiente(),
    paginaAnterior(),
    actualizarTituloPaso();
  consultarAPI(),
    idCliente(),
    nombreCliente(),
    seleccionarFecha(),
    seleccionarHora(),
    mostrarResumen();
}
export let paso = 1;
export const pasoInicial = 1,
  pasoFinal = 4;
export const cita = { id: "", nombre: "", fecha: "", hora: "", servicios: [] };
document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});
