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

export function validarFormularioServicios() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-servicio");
    if (!form) return; // Asegúrate de que el formulario exista
    console.log("Se encontro formulario", form);
    form.addEventListener("submit", (e) => {
      // Evita el envío por defecto
      e.preventDefault();

      // Obtener los valores de los campos
      const nombreInput = document.querySelector("#nombre");
      const descripcionInput = document.querySelector("#descripcion");
      const precioInput = document.querySelector("#precio");

      const nombreValor = nombreInput.value.trim();
      const descripcionValor = descripcionInput.value.trim();
      const precioValor = parseFloat(precioInput.value);

      // Validar longitud máxima

      if (nombreValor.length > 60) {
        mostrarHelperAlerta(
          "La longitud del nombre no debe exceder 60 caracteres",
          "error",
          "#nombre"
        );
        return; // Evita continuar si hay error
      }

      if (descripcionValor.length > 500) {
        mostrarHelperAlerta(
          "La longitud de descripción no debe exceder 500 caracteres",
          "error", // clase opcional para estilo
          "#descripcion"
        );
        return; // Evita continuar si hay error
      }

      if (isNaN(precioValor)) {
        mostrarHelperAlerta(
          "El precio debe ser un número válido",
          "error",
          "#precio"
        );
        return;
      }

      if (precioValor < 0 || precioValor > 99999.99) {
        mostrarHelperAlerta(
          "El precio debe estar entre 0.00 y 999.99",
          "error",
          "#precio"
        );
        return;
      }

      // Si pasa la validación, ahora sí puedes enviar el formulario
      form.submit();
    });
  });
}

export function buttonVerMas() {
  const botonesVerMas = document.querySelectorAll(".boton-ver-mas");

  botonesVerMas.forEach((boton) => {
    boton.addEventListener("click", () => {
      const citaId = boton.getAttribute("data-id");
      const citasInfo = document.getElementById(`citas-${citaId}`);
      const serviciosInfo = document.getElementById(`servicios-${citaId}`);

      if (
        serviciosInfo.style.display === "none" ||
        serviciosInfo.style.display === ""
      ) {
        serviciosInfo.style.display = "block";
        citasInfo.style.display = "none";
      } else {
        serviciosInfo.style.display = "none";
        citasInfo.style.display = "block";
      }
    });
  });
}

export function buttonEliminarCitas() {
  document.addEventListener("DOMContentLoaded", () => {
    const eliminarIconos = document.querySelectorAll(".eliminar-icono");

    eliminarIconos.forEach((icono) => {
      icono.addEventListener("click", (e) => {
        e.preventDefault();
        const form = icono.closest(".form-eliminar");
        if (form) {
          form.submit();
        }
      });
    });
  });
}

export function buttonEliminarServicios() {
  document.addEventListener("DOMContentLoaded", () => {
    const eliminarIconos = document.querySelectorAll(".eliminar-icono");

    eliminarIconos.forEach((icono) => {
      icono.addEventListener("click", (e) => {
        const id = e.target.dataset.id;

        if (confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
          fetch("/admin/servicios/eliminar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert("Servicio eliminado correctamente");
                // Opcional: Eliminar el servicio del DOM
                icono.closest(".servicios-card").remove();
              } else {
                alert("Hubo un error al eliminar el servicio");
              }
            })
            .catch((error) => console.error("Error:", error));
        }
      });
    });
  });
}

export function buscadorCitas() {
  document.querySelector("#fecha").addEventListener("input", function (n) {
    const e = n.target.value;
    window.location = `?fecha=${e}`;
  });
}

export function carruselFotos() {
  document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-about");
    const items = document.querySelectorAll(
      ".carousel-item-1, .carousel-item-2, .carousel-item-3, .carousel-item-4, .carousel-item-5"
    );

    if (!carousel) return;

    const updateFocusedItem = () => {
      const carouselRect = carousel.getBoundingClientRect();
      const carouselCenter = carouselRect.left + carouselRect.width / 2;

      let closestItem = null;
      let closestDistance = Infinity;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(carouselCenter - itemCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestItem = item;
        }
      });

      items.forEach((item) => item.classList.remove("focused"));
      if (closestItem) {
        closestItem.classList.add("focused");
      }
    };

    // Focus inicial
    updateFocusedItem();

    // Focus al hacer scroll
    carousel.addEventListener("scroll", () => {
      updateFocusedItem();
    });

    // Opcional: si cambia el tamaño de la ventana
    window.addEventListener("resize", () => {
      updateFocusedItem();
    });
  });
}

export function adminSelectorSeccion() {
  document.addEventListener("DOMContentLoaded", function () {
    const btnCitas = document.getElementById("btn-citas");
    const btnServicios = document.getElementById("btn-servicios");

    function toggleActiveButton(activeButton, inactiveButton) {
      activeButton.classList.add("active");
      inactiveButton.classList.remove("active");
    }

    // Detectar la URL actual y activar el botón correspondiente
    const currentPath = window.location.pathname;
    if (currentPath.includes("/admin/citas")) {
      toggleActiveButton(btnCitas, btnServicios);
    } else if (currentPath.includes("/admin/servicios")) {
      toggleActiveButton(btnServicios, btnCitas);
    }

    btnCitas.addEventListener("click", function () {
      toggleActiveButton(btnCitas, btnServicios);
      window.location.href = "/admin/citas";
    });

    btnServicios.addEventListener("click", function () {
      toggleActiveButton(btnServicios, btnCitas);
      window.location.href = "/admin/servicios";
    });
  });
}

export function navbarScrolling() {
  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".helper");
    const navLinks = document.querySelectorAll(".navbar-item a");

    const setActiveLink = () => {
      let index = sections.length;

      while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    };

    setActiveLink();
    window.addEventListener("scroll", setActiveLink);
  });
}

export function formularioContactoHandler() {
  document
    .getElementById("form-contacto")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(this.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.resultado === "exito") {
          mostrarAlerta("Éxito", result.mensaje, "success");
          this.reset();
        } else {
          mostrarAlerta("Error", result.mensaje, "danger");
          this.reset();
        }
      } catch (error) {
        mostrarAlerta(
          "Error",
          "Hubo un problema al enviar el mensaje",
          "danger"
        );
        console.error(error);
      }
    });
}
