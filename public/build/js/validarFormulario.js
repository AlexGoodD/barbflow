import { mostrarHelperAlerta } from "./utils.js";

console.log("Hola");

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

validarFormularioServicios();
