// TODO Cambia esta constante según tu entorno 
const APP_URL = "http://localhost:8888"

let paso = 1;
const pasoInicial = 1,
  pasoFinal = 4,
  cita = { id: "", nombre: "", fecha: "", hora: "", servicios: [] };

  function iniciarApp() {
  mostrarSeccion(),
    tabs(),
    botonesPaginador(),
    paginaSiguiente(),
    paginaAnterior(),
    consultarAPI(),
    idCliente(),
    nombreCliente(),
    seleccionarFecha(),
    seleccionarHora(),
    mostrarResumen();
    actualizarTituloPaso();
}

function mostrarSeccion() {
  const e = document.querySelector(".mostrar");
  e && e.classList.remove("mostrar");
  const t = `#paso-${paso}`;
  document.querySelector(t).classList.add("mostrar");
  const o = document.querySelector(".actual");
  o && o.classList.remove("actual");
  document.querySelector(`[data-paso="${paso}"]`).classList.add("actual");
}

function tabs() {
  document.querySelectorAll(".tabs button").forEach((e) => {
    e.addEventListener("click", function (e) {
      e.preventDefault();
      paso = parseInt(e.target.dataset.paso);
      mostrarSeccion();
      botonesPaginador();
      actualizarTituloPaso(); 
    });
  });
}

function botonesPaginador() {
  const botonAnterior = document.querySelector(".step-move #anterior");
  const botonSiguiente = document.querySelector(".step-move #siguiente");

  if (paso === 1) {
    botonAnterior.classList.add("ocultar");
    botonSiguiente.classList.remove("ocultar");
  } else if (paso === 4) {
    botonAnterior.classList.remove("ocultar");
    botonSiguiente.classList.add("ocultar");
    mostrarResumen();
  } else {
    botonAnterior.classList.remove("ocultar");
    botonSiguiente.classList.remove("ocultar");
  }

  mostrarSeccion();
  actualizarTituloPaso();
}

function paginaAnterior() {
  const botonAnterior = document.querySelector(".step-move #anterior");
  botonAnterior.addEventListener("click", function () {
    if (paso > 1) {
      paso--;
      botonesPaginador();
    }
  });
}

function paginaSiguiente() {
  const botonSiguiente = document.querySelector(".step-move #siguiente");
  botonSiguiente.addEventListener("click", function () {
    if (paso < 4) {
      paso++;
      botonesPaginador();
    }
  });
}

function actualizarTituloPaso() {
  const titulo = document.querySelector(".nombre-pagina");

  const titulos = {
    1: "Escoge el servicio",
    2: "Escoge una fecha",
    3: "Confirmación de datos",
    4: "Resumen de cita"
  };

  if (titulo) {
    titulo.textContent = titulos[paso] || "Paso desconocido";
  }
}

async function consultarAPI() {
  try {
    const e = `${APP_URL}/api/servicios`,
      t = await fetch(e);
    mostrarServicios(await t.json());
  } catch (e) {
    console.log(e);
  }
}

function mostrarServicios(e) {
  const tabla = document.createElement("TABLE");
  tabla.classList.add("tabla-servicios");

  const encabezado = document.createElement("THEAD");
  encabezado.innerHTML = `
    <tr>
      <th>Servicio</th>
      <th>Duración</th>
      <th>Precio</th>
      <th></th>
    </tr>
  `;
  tabla.appendChild(encabezado);

  const cuerpo = document.createElement("TBODY");

  e.forEach((servicio) => {
    const { id, nombre, duracion, precio } = servicio;

    const fila = document.createElement("TR");
    fila.dataset.idServicio = id;

    const celdaNombre = document.createElement("TD");
    celdaNombre.textContent = nombre;

    const celdaDuracion = document.createElement("TD");
    celdaDuracion.textContent = `${duracion} minutos`;

    const celdaPrecio = document.createElement("TD");
    celdaPrecio.textContent = `$${precio} MXN`;

    const celdaAccion = document.createElement("TD");
    const botonAñadir = document.createElement("BUTTON");
    botonAñadir.textContent = "Añadir";
    botonAñadir.classList.add("boton", "boton-añadir");
    botonAñadir.onclick = function () {
      seleccionarServicio(servicio);
    };
    celdaAccion.appendChild(botonAñadir);

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaDuracion);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaAccion);
    cuerpo.appendChild(fila);
  });

  tabla.appendChild(cuerpo);
  document.querySelector("#servicios").appendChild(tabla);
}

function seleccionarServicio(e) {
  const { id: t } = e,
    { servicios: o } = cita,
    a = document.querySelector(`[data-id-servicio="${t}"]`);
  const botonAñadir = a.querySelector(".boton-añadir");

  if (o.some((e) => e.id === t)) {
    // Si el servicio ya está seleccionado, lo eliminamos
    cita.servicios = o.filter((e) => e.id !== t);
    a.classList.remove("seleccionado");
    botonAñadir.textContent = "Añadir";
    botonAñadir.classList.remove("boton-añadido");
  } else {
    // Si el servicio no está seleccionado, lo añadimos
    cita.servicios = [...o, e];
    a.classList.add("seleccionado");
    botonAñadir.textContent = "Añadido";
    botonAñadir.classList.add("boton-añadido");
  }
}

function idCliente() {
  cita.id = document.querySelector("#id").value;
}

function nombreCliente() {
  cita.nombre = document.querySelector("#nombre").value;
}

function seleccionarFecha() {
  document.querySelector("#fecha").addEventListener("input", function (e) {
    const t = new Date(e.target.value).getUTCDay();
    [6, 0].includes(t)
      ? ((e.target.value = ""),
        mostrarAlerta("Fines de semana no permitidos", "error", ".formulario"))
      : (cita.fecha = e.target.value);
  });
}

function seleccionarHora() {
  document.querySelector("#hora").addEventListener("input", function (e) {
    const t = e.target.value.split(":")[0];
    t < 10 || t > 18
      ? ((e.target.value = ""),
        mostrarAlerta("Hora No Válida", "error", ".formulario"))
      : (cita.hora = e.target.value);
  });
}

function mostrarAlerta(e, t, o, a = !0) {
  const n = document.querySelector(".alerta");
  n && n.remove();
  const c = document.createElement("DIV");
  (c.textContent = e), c.classList.add("alerta"), c.classList.add(t);
  document.querySelector(o).appendChild(c),
    a &&
      setTimeout(() => {
        c.remove();
      }, 3e3);
}

function mostrarResumen() {
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

async function reservarCita() {
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

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});
