import { cita } from "./app.js";

import {
  mostrarHelperAlerta,
  mostrarAlerta,
  mostrarAlertaConfirmacion,
} from "./utils.js";

import { reservarCita } from "./resumen.js";

export function idCliente() {
  const input = document.querySelector("#id");
  if (input) {
    cita.id = input.value;
  }
}

export function nombreCliente() {
  cita.nombre = document.querySelector("#nombre").value;
}

export function agregarBotonesReservar() {
  const contenedorApp = document.querySelector("#paso-5"); // Seleccionar el contenedor principal

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

export async function mostrarTablaHorarios() {
  const contenedor = document.querySelector("#contenedor-horarios");
  contenedor.innerHTML = "";

  const fechas = generarFechas();
  const horarios = generarHorarios();
  const mapaOcupados = await obtenerHorariosOcupados(fechas);

  const tabla = crearTablaHorarios(fechas, horarios, mapaOcupados);
  contenedor.appendChild(tabla);

  asignarEventosHorarios(tabla);
}

// 🧩 Generar fechas siguientes (7 días desde mañana)
function generarFechas() {
  const fechas = [];
  const opciones = { weekday: "long", day: "numeric" };
  let actual = new Date();
  actual.setDate(actual.getDate() + 1);

  for (let i = 0; i < 7; i++) {
    const copia = new Date(actual); // clona para evitar modificar el original
    const fechaISO = formatoLocalFechaISO(copia);
    const etiqueta = copia.toLocaleDateString("es-ES", opciones);
    fechas.push({ fecha: fechaISO, etiqueta });
    actual.setDate(actual.getDate() + 1); // modifica solo "actual", no las fechas ya guardadas
  }

  return fechas;
}

function formatoLocalFechaISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 🧩 Generar horarios en bloques de 30 minutos
function generarHorarios() {
  const horarios = [];
  for (let h = 8; h <= 20; h++) {
    horarios.push(`${String(h).padStart(2, "0")}:00`);
    if (h !== 20) horarios.push(`${String(h).padStart(2, "0")}:30`);
  }
  return horarios;
}

// 🧩 Obtener horarios ocupados desde la API
async function obtenerHorariosOcupados(fechas) {
  const barberoId = cita.barberoSeleccionado?.id;

  if (!barberoId) {
    return {};
  }

  const res = await fetch("/api/verificar-disponibilidad", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ barberoId }), // Enviamos el barberoId
  });

  const ocupados = await res.json();
  console.error("Ocupados:", ocupados);
  const mapaOcupados = {};

  ocupados.forEach(({ fecha, hora }) => {
    if (!mapaOcupados[fecha]) mapaOcupados[fecha] = {};
    mapaOcupados[fecha][hora] = true;
  });

  return mapaOcupados;
}

// 🧩 Crear la tabla HTML de horarios
function crearTablaHorarios(fechas, horarios, mapaOcupados) {
  const tabla = document.createElement("TABLE");
  tabla.classList.add("tabla-horarios");

  // Encabezado
  const thead = document.createElement("THEAD");
  const trHead = document.createElement("TR");
  fechas.forEach((dia) => {
    const th = document.createElement("TH");
    th.textContent =
      dia.etiqueta.charAt(0).toUpperCase() + dia.etiqueta.slice(1);
    th.classList.add("horario-encabezado");
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  tabla.appendChild(thead);

  // Cuerpo
  const tbody = document.createElement("TBODY");
  horarios.forEach((hora) => {
    const fila = document.createElement("TR");
    fechas.forEach(({ fecha }) => {
      const td = document.createElement("TD");
      td.classList.add("horario-celda");

      const ocupado = mapaOcupados[fecha]?.[hora];
      const boton = document.createElement("BUTTON");
      boton.textContent = hora;
      boton.type = "button";
      boton.classList.add("boton-horario");

      if (ocupado) {
        boton.classList.add("ocupado");
        boton.disabled = true;
      }

      boton.dataset.fecha = fecha;
      boton.dataset.hora = hora;
      td.appendChild(boton);
      fila.appendChild(td);
    });
    tbody.appendChild(fila);
  });

  tabla.appendChild(tbody);
  return tabla;
}

// 🧩 Agregar interactividad a los botones
function asignarEventosHorarios(tabla) {
  const botones = tabla.querySelectorAll(".boton-horario");

  botones.forEach((boton) => {
    if (boton.disabled) return;

    boton.addEventListener("click", () => {
      if (boton.classList.contains("seleccionado")) {
        boton.classList.remove("seleccionado");
        cita.fecha = "";
        cita.hora = "";
        return;
      }

      botones.forEach((b) => b.classList.remove("seleccionado"));

      boton.classList.add("seleccionado");
      cita.fecha = boton.dataset.fecha;
      cita.hora = boton.dataset.hora;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  idCliente();
  nombreCliente();
  mostrarTablaHorarios();
});
