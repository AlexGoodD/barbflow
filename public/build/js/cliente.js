import { cita } from "./app.js";

export function idCliente() {
  cita.id = document.querySelector("#id").value;
}

export function nombreCliente() {
  cita.nombre = document.querySelector("#nombre").value;
}

export function seleccionarFecha() {
  document.querySelector("#fecha").addEventListener("input", function (e) {
    const t = new Date(e.target.value).getUTCDay();
    [6, 0].includes(t)
      ? ((e.target.value = ""),
        mostrarAlerta("Fines de semana no permitidos", "error", ".formulario"))
      : (cita.fecha = e.target.value);
  });
}

export function seleccionarHora() {
  document.querySelector("#hora").addEventListener("input", function (e) {
    const t = e.target.value.split(":")[0];
    t < 10 || t > 18
      ? ((e.target.value = ""),
        mostrarAlerta("Hora No Válida", "error", ".formulario"))
      : (cita.hora = e.target.value);
  });
}
