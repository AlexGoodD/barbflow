import { APP_URL } from "./config.js";
import { cita } from "./app.js";
import { mostrarAlerta } from "./utils.js";
import { agregarBotonesReservar } from "./cliente.js";

export function mostrarResumen() {
  const e = document.querySelector(".contenido-resumen");
  while (e.firstChild) e.removeChild(e.firstChild);

  // Agregar botón de reservar dentro del contenedor .app
  agregarBotonesReservar();
  agregarBotonDesplazamientoResumen();

  mostrarResumenServicios(e);
  mostrarResumenDetalles(e);
}

function mostrarResumenServicios(contenedor) {
  const { servicios: n } = cita;

  // Crear tabla para servicios
  const tabla = document.createElement("TABLE");
  tabla.classList.add("tabla-servicios");
  tabla.id = "tabla-servicios-resumen";

  // Encabezado de la tabla
  const encabezado = document.createElement("THEAD");
  encabezado.innerHTML = `
      <tr>
    <th colspan="2" class="encabezado-tabla encabezado-resumen">Servicios seleccionados</th>
      </tr>
    `;
  tabla.appendChild(encabezado);

  // Cuerpo de la tabla
  const cuerpo = document.createElement("TBODY");
  let total = 0;

  n.forEach((servicio) => {
    const { nombre, precio } = servicio;
    total += parseFloat(precio);

    const fila = document.createElement("TR");

    const celdaNombre = document.createElement("TD");
    celdaNombre.textContent = nombre;
    celdaNombre.classList.add("columna-servicio");

    const celdaPrecio = document.createElement("TD");
    celdaPrecio.textContent = `$${precio} MXN`;
    celdaPrecio.classList.add("columna-precio");

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPrecio);
    cuerpo.appendChild(fila);
  });

  // Fila del total
  const filaTotal = document.createElement("TR");
  filaTotal.innerHTML = `
      <td><strong>Total</strong></td>
      <td><strong>$${total.toFixed(2)}</strong></td>
    `;
  cuerpo.appendChild(filaTotal);

  tabla.appendChild(cuerpo);
  contenedor.appendChild(tabla);

  filaTotal.classList.add("fila-total");
}

function mostrarResumenDetalles(contenedor) {
  const { nombre: cliente, fecha, hora, barberoSeleccionado } = cita;

  const tituloResumen = document.createElement("P");
  tituloResumen.textContent = "Detalles de tu cita";
  tituloResumen.classList.add("encabezado-resumen");
  contenedor.appendChild(tituloResumen);

  const contenedorInfo = document.createElement("DIV");
  contenedorInfo.classList.add("contenedor-resumen-info");

  // Cliente
  const clienteInfo = document.createElement("P");
  clienteInfo.innerHTML = `<span class="info-resumen">Cliente: </span><span class="resumen-info-valor">${cliente}</span>`;
  contenedorInfo.appendChild(clienteInfo);

  // Barbero
  const barberoInfo = document.createElement("P");
  barberoInfo.innerHTML = `<span class="info-resumen">Barbero: </span><span class="resumen-info-valor">${
    barberoSeleccionado?.nombre || "No seleccionado"
  }</span>`;
  contenedorInfo.appendChild(barberoInfo);

  // Fecha
  const fechaInfo = document.createElement("P");
  fechaInfo.innerHTML = `<span class="info-resumen">Fecha: </span><span class="resumen-info-valor">${fecha}</span>`;
  contenedorInfo.appendChild(fechaInfo);

  // Hora
  const horaInfo = document.createElement("P");
  horaInfo.innerHTML = `<span class="info-resumen">Hora: </span><span class="resumen-info-valor">${hora}</span>`;
  contenedorInfo.appendChild(horaInfo);

  contenedor.appendChild(contenedorInfo);
}

export async function reservarCita() {
  const { nombre, fecha, hora, servicios, id, email, barberoSeleccionado } =
    cita;
  const serviciosIds = servicios.map((servicio) => servicio.id);

  const formData = new FormData();
  formData.append("fecha", fecha);
  formData.append("hora", hora);
  formData.append("usuarioId", id);
  formData.append("email", email);
  formData.append("servicios", serviciosIds);
  formData.append("barberoId", barberoSeleccionado?.id || ""); // Agregar barberoId

  try {
    const url = `${APP_URL}/api/citas`;
    const response = await fetch(url, { method: "POST", body: formData });
    const data = await response.json();

    if (data.resultado) {
      mostrarAlerta(
        "Cita reservada con éxito",
        "Se te envió un correo con la fecha y hora de tu cita"
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  } catch (error) {
    mostrarAlerta(
      "Hubo un error al reservar la cita",
      "Por favor intenta de nuevo en un momento"
    );
    console.error("Error al reservar la cita:", error);
  }
}

function agregarBotonDesplazamientoResumen() {
  const contenedorResumen = document.querySelector(".contenedor-resumen");

  // Evitar múltiples botones
  if (document.querySelector(".boton-desplazar")) return;

  // Crear botón
  const botonDesplazar = document.createElement("BUTTON");
  botonDesplazar.innerHTML = `<span class="flecha">&#x2B07;</span>`;
  botonDesplazar.classList.add("boton-desplazar");
  contenedorResumen.appendChild(botonDesplazar);

  // Hacer scroll al fondo
  botonDesplazar.addEventListener("click", () => {
    contenedorResumen.scrollTo({
      top: contenedorResumen.scrollHeight,
      behavior: "smooth",
    });
  });

  // Mostrar/ocultar botón según la posición del scroll
  contenedorResumen.addEventListener("scroll", () => {
    const scrollTop = contenedorResumen.scrollTop;
    const scrollHeight = contenedorResumen.scrollHeight;
    const clientHeight = contenedorResumen.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      botonDesplazar.style.display = "none"; // Ocultar al llegar al fondo
    } else {
      botonDesplazar.style.display = "block"; // Mostrar en cualquier otra posición
    }
  });

  // Mostrar solo si hay scroll
  setTimeout(() => {
    const hayScroll =
      contenedorResumen.scrollHeight > contenedorResumen.clientHeight;
    if (hayScroll) {
      botonDesplazar.style.display = "block";
    }
  }, 100);
}
