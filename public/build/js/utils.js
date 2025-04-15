export function mostrarAlerta(
  titulo,
  mensaje,
  tipo = "primary",
  contenedor = ".contenedor-app",
  autoCerrar = true
) {
  // Eliminar cualquier alerta y backdrop anteriores
  const alertaExistente = document.querySelector(".alerta-backdrop");
  if (alertaExistente) alertaExistente.remove();

  // Crear backdrop (fondo oscuro con blur)
  const backdrop = document.createElement("div");
  backdrop.classList.add("alerta-backdrop");

  // Crear alerta con Shoelace
  const alerta = document.createElement("sl-alert");
  alerta.classList.add("alerta");
  alerta.duration = autoCerrar ? 3000 : Infinity;
  alerta.innerHTML = `
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
  if (alertaExistente) return;

  const input = document.querySelector(o);
  if (!input) return;

  const c = document.createElement("DIV");
  c.textContent = e;
  c.classList.add("helper-alerta", t);

  input.insertAdjacentElement("afterend", c);

  // Remover el mensaje después de 3 segundos si autoCerrar es true
  if (a) {
    setTimeout(() => {
      c.classList.add("fade-out");
      c.addEventListener("animationend", () => c.remove());
    }, 3000);
  }
}

export function mostrarAlertaConfirmacion(
  titulo,
  mensaje,
  tipo = "primary",
  contenedor = ".contenedor-app"
) {
  return new Promise((resolve) => {
    const alertaExistente = document.querySelector(".alerta-backdrop");
    if (alertaExistente) alertaExistente.remove();

    const backdrop = document.createElement("div");
    backdrop.classList.add("alerta-backdrop");

    const alerta = document.createElement("sl-alert");
    alerta.classList.add("alerta-confirmacion");
    alerta.variant = tipo === "error" ? "danger" : tipo;
    alerta.duration = Infinity;

    const strong = document.createElement("strong");
    strong.textContent = titulo;

    const mensajeTexto = document.createElement("div");
    mensajeTexto.innerHTML = `${mensaje}<br><br>`;

    const botonesDiv = document.createElement("div");
    botonesDiv.classList.add("alerta-confirmacion-botones");

    const btnConfirmar = document.createElement("sl-button");
    btnConfirmar.setAttribute("variant", "danger");
    btnConfirmar.setAttribute("size", "small");
    btnConfirmar.id = "confirmar";
    btnConfirmar.textContent = "Sí, cancelar";

    const btnCancelar = document.createElement("sl-button");
    btnCancelar.setAttribute("variant", "primary");
    btnCancelar.setAttribute("size", "small");
    btnCancelar.id = "cancelar";
    btnCancelar.textContent = "No, continuar";

    botonesDiv.appendChild(btnConfirmar);
    botonesDiv.appendChild(btnCancelar);

    alerta.appendChild(strong);
    alerta.appendChild(mensajeTexto);
    alerta.appendChild(botonesDiv);

    backdrop.appendChild(alerta);
    const contenedorDestino = document.querySelector(contenedor);
    contenedorDestino.appendChild(backdrop);

    alerta.toast();
    alerta.show();

    btnConfirmar.addEventListener("click", () => {
      console.log("Botón confirmar presionado");
      alerta.hide();
      backdrop.remove();
      resolve(true);
    });

    btnCancelar.addEventListener("click", () => {
      console.log("Botón cancelar presionado");
      alerta.hide();
      backdrop.remove();
      resolve(false);
    });
  });
}