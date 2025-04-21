import { cita } from "./app.js";
import {
  mostrarHelperAlerta,
  mostrarAlerta,
  mostrarAlertaConfirmacion,
} from "./utils.js";
import { reservarCita } from "./resumen.js";

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
        mostrarHelperAlerta("Fines de semana no permitidos", "error", "#fecha"))
      : (cita.fecha = e.target.value);
  });
}

export function seleccionarHora() {
  document.querySelector("#hora").addEventListener("input", function (e) {
    const t = e.target.value.split(":")[0];
    t < 10 || t > 18
      ? ((e.target.value = ""),
        mostrarHelperAlerta(
          "Fuera del horario del establecimiento",
          "error",
          "#hora"
        ))
      : (cita.hora = e.target.value);
  });
}

export function agregarBotonesReservar() {
  const contenedorApp = document.querySelector("#paso-4"); // Seleccionar el contenedor principal

  // Verificar si ya existe el contenedor de botones
  if (contenedorApp.querySelector(".cancelar-reservar")) {
    return; // Si ya existe, no agregar otro
  }

  // Crear el contenedor para los botones
  const contenedorBotones = document.createElement("DIV");
  contenedorBotones.classList.add("cancelar-reservar");

  // Crear el botón de reservar
  const botonReservar = document.createElement("BUTTON");
  botonReservar.textContent = "Confirmar";
  botonReservar.classList.add("btn", "btn-reservar");

  // Agregar evento al botón de reservar
  botonReservar.addEventListener("click", () => {
    reservarCita(cita);
  });

  // Crear el botón de cancelar
  const botonCancelar = document.createElement("BUTTON");
  botonCancelar.textContent = "Cancelar";
  botonCancelar.classList.add("btn", "btn-cancelar");

  // Agregar evento al botón de cancelar
  botonCancelar.addEventListener("click", async () => {
    const confirmado = await mostrarAlertaConfirmacion(
      "¿Estás seguro de cancelar la reservación?",
      "Al hacerlo, deberás completar nuevamente todos los datos, y no podemos garantizar que el horario que deseas esté disponible."
    );

    if (confirmado) {
      setTimeout(() => {
        mostrarAlerta(
          "Reservación cancelada",
          "Tu reservación ha sido cancelada exitosamente."
        );

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }, 300);
    }
  });

  // Agregar los botones al contenedor
  contenedorBotones.appendChild(botonCancelar);
  contenedorBotones.appendChild(botonReservar);

  // Agregar el contenedor de botones al contenedor principal
  contenedorApp.appendChild(contenedorBotones);
}
