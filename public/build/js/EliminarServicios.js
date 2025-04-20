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
