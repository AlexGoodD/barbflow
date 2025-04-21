import { APP_URL } from "./config.js";
import { cita } from "./app.js";
import { mostrarAlerta } from "./utils.js";
import { agregarBotonesReservar } from "./cliente.js";

export function mostrarResumen() {
  const e = document.querySelector(".contenido-resumen");
  while (e.firstChild) e.removeChild(e.firstChild);

  /*  if (Object.values(cita).includes("") || cita.servicios.length === 0) {
    return mostrarAlerta(
      "Necesitas completar los pasos anteriores para ver un resumen de tu cita.",
      "resumen-error",
      ".contenido-resumen",
      false
    );
  } */

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
  const { nombre: t, fecha: o, hora: a } = cita;

  const tituloResumen = document.createElement("P");
  tituloResumen.textContent = "Detalles de tu cita";
  tituloResumen.classList.add("encabezado-resumen");
  contenedor.appendChild(tituloResumen);

  // Crear contenedor para la información adicional
  const contenedorInfo = document.createElement("DIV");
  contenedorInfo.classList.add("contenedor-resumen-info");

  // Cliente
  const cliente = document.createElement("P");
  cliente.innerHTML = `<span class="info-resumen">Cliente: </span><span class="resumen-info-valor">${t}</span>`;
  contenedorInfo.appendChild(cliente);

  // Fecha
  const s = new Date(o);
  const m = s.toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const fecha = document.createElement("P");
  fecha.innerHTML = `<span class="info-resumen">Fecha: </span><span class="resumen-info-valor">${m}</span>`;
  contenedorInfo.appendChild(fecha);

  // Hora
  const hora = document.createElement("P");
  hora.innerHTML = `<span class="info-resumen">Hora: </span><span class="resumen-info-valor">${a} Horas</span>`;
  contenedorInfo.appendChild(hora);

  // Agregar contenedor de información al contenedor principal
  contenedor.appendChild(contenedorInfo);
}

export async function reservarCita() {
  const { nombre: e, fecha: t, hora: o, servicios: a, id: n } = cita,
    c = a.map((e) => e.id),
    r = new FormData();
  r.append("fecha", t),
    r.append("hora", o),
    r.append("usuarioId", n),
    r.append("servicios", c);
  try {
    const e = `${APP_URL}/api/citas`,
      t = await fetch(e, { method: "POST", body: r }),
      o = await t.json();
    console.log(o),
      o.resultado &&
        mostrarAlerta(
          "¡Reservación creada con éxito!",
          "Tu cita ha sido confirmada con éxito. Te esperamos en la fecha y hora acordadas para brindarte el mejor servicio. Si llegara a surgir algún inconveniente con tu reservación, nos pondremos en contacto contigo para mantenerte informado."
        );

    if (o.resultado) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  } catch (e) {
    mostrarAlerta(
      "Hubo un error al reservar la cita.",
      "Por favor, intenta nuevamente más tarde."
    );
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
