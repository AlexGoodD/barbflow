export function mostrarAlerta(titulo, mensaje, tipo = "primary", contenedor = ".contenedor-app", autoCerrar = true) {
  // Eliminar cualquier alerta y backdrop anteriores
  const alertaExistente = document.querySelector(".alerta-backdrop");
  if (alertaExistente) alertaExistente.remove();

  // Crear backdrop (fondo oscuro con blur)
  const backdrop = document.createElement("div");
  backdrop.classList.add("alerta-backdrop");

  // Crear alerta con Shoelace
  const alerta = document.createElement("sl-alert");
  alerta.classList.add("alerta");
  alerta.variant = tipo === "error" ? "danger" : tipo;
  alerta.duration = autoCerrar ? 3000 : Infinity;
  alerta.innerHTML = `
    <sl-icon slot="icon" name="${tipo === "error" ? "exclamation-triangle" : "info-circle"}"></sl-icon>
    <strong>${titulo}</strong><br>
    ${mensaje}
  `;

  // Agregar la alerta al backdrop
  backdrop.appendChild(alerta);

  // Insertar el backdrop en el contenedor
  const contenedorDestino = document.querySelector(contenedor);
  contenedorDestino.appendChild(backdrop);

  // Mostrar la alerta
  alerta.toast();
  alerta.show();

  // Remover después del tiempo si autoCerrar
  if (autoCerrar) {
    setTimeout(() => backdrop.remove(), 3000);
  }
}

export function mostrarHelperAlerta(e, t, o, a = !0) {
  // Verificar si ya existe una alerta para el mismo input
  const alertaExistente = document.querySelector(`${o} ~ .helper-alerta`);
  if (alertaExistente) return; // Si ya existe, no crear otra

  const input = document.querySelector(o); // Seleccionar el input específico
  if (!input) return; // Si no se encuentra el input, salir de la función

  const c = document.createElement("DIV");
  c.textContent = e;
  c.classList.add("helper-alerta", t);

  // Insertar el mensaje justo debajo del input
  input.insertAdjacentElement("afterend", c);

  // Remover el mensaje después de 3 segundos si autoCerrar es true
  if (a) {
    setTimeout(() => {
      c.classList.add("fade-out"); // Agregar clase para animación
      c.addEventListener("animationend", () => c.remove()); // Eliminar después de la animación
    }, 3000);
  }
}