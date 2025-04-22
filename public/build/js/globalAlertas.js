import { mostrarAlerta } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const alertas = window.alertasGlobales;
  if (!alertas) return;

  for (const tipo in alertas) {
    if (tipo !== "error" && tipo !== "exito") continue;

    alertas[tipo].forEach((mensaje) => {
      const titulo = tipo === "error" ? "Error" : "Éxito";
      mostrarAlerta(titulo, mensaje, tipo);
    });
  }
});
