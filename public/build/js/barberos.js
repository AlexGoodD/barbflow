import { APP_URL } from "./config.js";
import { cita } from "./app.js";
import { mostrarTablaHorarios } from "./cliente.js";

export async function consultarBarberos() {
  try {
    const url = `${APP_URL}/api/barberos`;
    const response = await fetch(url);
    const barberos = await response.json();
    mostrarBarberos(barberos);
  } catch (error) {
    console.error("Error al cargar los barberos:", error);
  }
}

export function mostrarBarberos(barberos) {
  const contenedorBarberos = document.querySelector("#barberos");

  // Limpiar contenido previo
  contenedorBarberos.innerHTML = "";
  const tabla = document.createElement("TABLE");
  tabla.classList.add("tabla-barberos");

  const encabezado = document.createElement("THEAD");
  encabezado.innerHTML = `
      <tr>
        <th>Barbero</th>
        <th>Especialidad</th>
        <th></th>
      </tr>
    `;
  tabla.appendChild(encabezado);

  const cuerpo = document.createElement("TBODY");

  barberos.forEach((barbero) => {
    const { id, nombre, especialidad } = barbero;

    const fila = document.createElement("TR");
    fila.dataset.idBarbero = id;

    const celdaNombre = document.createElement("TD");
    celdaNombre.textContent = nombre;

    const celdaEspecialidad = document.createElement("TD");
    celdaEspecialidad.textContent = especialidad;

    const celdaAccion = document.createElement("TD");
    const botonAñadir = document.createElement("BUTTON");
    botonAñadir.textContent = "Añadir";
    botonAñadir.classList.add("boton", "boton-añadir");
    botonAñadir.onclick = function () {
      seleccionarBarbero(barbero);
    };
    celdaAccion.appendChild(botonAñadir);

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaEspecialidad);
    fila.appendChild(celdaAccion);
    cuerpo.appendChild(fila);
  });

  tabla.appendChild(cuerpo);
  contenedorBarberos.appendChild(tabla);
}

export function seleccionarBarbero(barbero) {
  const { id } = barbero;
  const { barberoSeleccionado } = cita;
  const fila = document.querySelector(`[data-id-barbero="${id}"]`);
  const botonAñadir = fila.querySelector(".boton-añadir");

  // Si ya estaba seleccionado, deseleccionarlo
  if (barberoSeleccionado && barberoSeleccionado.id === id) {
    cita.barberoSeleccionado = null;
    fila.classList.remove("seleccionado");
    botonAñadir.textContent = "Añadir";
    botonAñadir.classList.remove("boton-añadido");

    // Limpiar horarios si se deselecciona
    const contenedorHorarios = document.querySelector("#contenedor-horarios");
    if (contenedorHorarios) contenedorHorarios.innerHTML = "";
    return;
  }

  // Si hay un barbero seleccionado diferente, desmarcarlo
  if (barberoSeleccionado) {
    const filaAnterior = document.querySelector(
      `[data-id-barbero="${barberoSeleccionado.id}"]`
    );
    if (filaAnterior) {
      filaAnterior.classList.remove("seleccionado");
      const botonAnterior = filaAnterior.querySelector(".boton-añadir");
      botonAnterior.textContent = "Añadir";
      botonAnterior.classList.remove("boton-añadido");
    }
  }

  // Marcar el nuevo barbero
  cita.barberoSeleccionado = barbero;
  fila.classList.add("seleccionado");
  botonAñadir.textContent = "Añadido";
  botonAñadir.classList.add("boton-añadido");

  // 🔁 Cargar horarios disponibles para el barbero seleccionado
  mostrarTablaHorarios();
}
