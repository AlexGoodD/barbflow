import { mostrarAlerta } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const iconosEliminar = document.querySelectorAll(".eliminar-icono");

  iconosEliminar.forEach((icono) => {
    icono.addEventListener("click", async () => {
      const id = icono.dataset.id;
      const confirmado = confirm(
        "¿Estás seguro de que deseas eliminar esta cita?"
      );

      if (!confirmado) return;

      try {
        const respuesta = await fetch("/api/eliminar", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ id }),
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
          mostrarAlerta("Éxito", data.mensaje, "exito");

          // Quitar del DOM visualmente
          const tarjeta = document.querySelector(`#citas-${id}`);
          if (tarjeta) tarjeta.closest(".cita-card").remove();
        } else {
          mostrarAlerta("Error", data.mensaje || "Ocurrió un error", "error");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        mostrarAlerta("Error", "No se pudo eliminar la cita.", "error");
      }
    });
  });
});
