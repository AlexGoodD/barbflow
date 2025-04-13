import { APP_URL } from "./config.js";
import { cita } from "./app.js";

export async function consultarAPI() {
  try {
    const e = `${APP_URL}/api/servicios`,
    t = await fetch(e);
    mostrarServicios(await t.json());
  } catch (e) {
    console.log(e);
  }
}

export function mostrarServicios(e) {
  const contenedorServicios = document.querySelector("#servicios");
  
  // Limpiar contenido previo
  contenedorServicios.innerHTML = "";

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
  contenedorServicios.appendChild(tabla);

}

export function seleccionarServicio(e) {
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

  // Mostrar alerta de Shoelace
  const alerta = document.querySelector("#alerta-seleccion");
  alerta.textContent = `Hola, seleccionaste el servicio: ${e.nombre}`;
  alerta.show();
}

export async function mostrarPrecios() {
  try {
    const response = await fetch(`${APP_URL}/api/servicios`);
    const servicios = await response.json();

    const contenedorPrecios = document.querySelector(".precios .info-left");

    // Limpiar contenido previo
    contenedorPrecios.innerHTML = "";

    servicios.forEach((servicio, index) => {
      const { nombre, descripcion, precio } = servicio;
    
      // Crear el contenedor del servicio
      const divServicio = document.createElement("div");
      divServicio.classList.add(`precio-item-${index + 1}`);
    
      // Crear y agregar el nombre del servicio
      const pNombre = document.createElement("p");
      pNombre.classList.add("servicio-nombre");
      pNombre.textContent = nombre;
    
      // Crear y agregar el precio del servicio
      const pPrecio = document.createElement("p");
      pPrecio.classList.add("servicio-precio");
      pPrecio.textContent = `$${precio} MXN`;
    
      // Crear el contenedor del encabezado (nombre y precio)
      const divHeaderPrecio = document.createElement("div");
      divHeaderPrecio.classList.add("headerPrecio");
      divHeaderPrecio.appendChild(pNombre);
      divHeaderPrecio.appendChild(pPrecio);
    
      // Agregar el encabezado al contenedor del servicio
      divServicio.appendChild(divHeaderPrecio);
    
      // Crear y agregar la descripción del servicio
      const pDescripcion = document.createElement("p");
      pDescripcion.classList.add("servicio-descripcion");
      pDescripcion.textContent = descripcion;
      divServicio.appendChild(pDescripcion);
    
      // Agregar el servicio al contenedor principal
      contenedorPrecios.appendChild(divServicio);
    });
  } catch (error) {
    console.error("Error al cargar los precios:", error);
  }
}