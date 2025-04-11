export function mostrarAlerta(e, t, o, a = !0) {
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
