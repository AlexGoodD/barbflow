export function mostrarResumen() {
  const e = document.querySelector(".contenido-resumen");
  while (e.firstChild) e.removeChild(e.firstChild);

  if (Object.values(cita).includes("") || cita.servicios.length === 0) {
    return mostrarAlerta(
      "Necesitas completar los pasos anteriores para ver un resumen de tu cita.",
      "resumen-error",
      ".contenido-resumen",
      false
    );
  }

  const { nombre: t, fecha: o, hora: a, servicios: n } = cita;

  // Crear encabezado "Resumen de Servicios"
  const c = document.createElement("H3");
  c.textContent = "Resumen de Servicios";
  e.appendChild(c);

  // Crear tabla para servicios
  const tabla = document.createElement("TABLE");
  tabla.classList.add("tabla-servicios");

  // Encabezado de la tabla
  const encabezado = document.createElement("THEAD");
  encabezado.innerHTML = `
      <tr>
        <th>Servicio</th>
        <th>Precio</th>
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

    const celdaPrecio = document.createElement("TD");
    celdaPrecio.textContent = `$${precio} MXN`;

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
  e.appendChild(tabla);

  // Crear encabezado "Resumen de Cita"
  const r = document.createElement("H3");
  r.textContent = "Resumen de Cita";
  e.appendChild(r);

  // Información de la cita
  const i = document.createElement("P");
  i.innerHTML = `<span>Nombre:</span> ${t}`;
  const s = new Date(o);
  const m = s.toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const p = document.createElement("P");
  p.innerHTML = `<span>Fecha:</span> ${m}`;
  const v = document.createElement("P");
  v.innerHTML = `<span>Hora:</span> ${a} Horas`;

  // Botón para reservar cita
  const h = document.createElement("BUTTON");
  h.classList.add("boton");
  h.textContent = "Reservar Cita";
  h.onclick = reservarCita;

  e.appendChild(i);
  e.appendChild(p);
  e.appendChild(v);
  e.appendChild(h);
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
        Swal.fire({
          icon: "success",
          title: "Cita Creada",
          text: "Tu cita fue creada correctamente",
          button: "OK",
        }).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 3e3);
        });
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un error al guardar la cita",
    });
  }
}
