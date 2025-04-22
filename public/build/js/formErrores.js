import { mostrarHelperAlerta } from "./utils.js";
console.log("Cargando helper errores...");

document.addEventListener("DOMContentLoaded", () => {
  const posiblesErrores = [
    { key: "erroresLogin", campos: { email: "#email", password: "#password" } },
    {
      key: "erroresRegistro",
      campos: {
        nombre: "#nombre",
        apellido: "#apellido",
        telefono: "#telefono",
        email: "#email",
        password: "#password",
      },
    },
    { key: "erroresOlvide", campos: { email: "#email" } },
    { key: "erroresRecuperar", campos: { password: "#password" } },
  ];

  posiblesErrores.forEach(({ key, campos }) => {
    const errores = window[key];
    if (!errores) return;

    for (const campo in errores) {
      errores[campo].forEach((mensaje) => {
        const selector = campos[campo];
        if (!selector) return;
        mostrarHelperAlerta(mensaje, "error", selector, true);
      });
    }
  });
});
