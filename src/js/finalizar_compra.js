function obtenerCarrito() {
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
}

function renderListaCarrito() {
    const contenedor = document.querySelector("#listaCarrito");
    const totalEl = document.querySelector("#totalCompra");
    const carrito = obtenerCarrito();

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalEl.textContent = "";
        return;
    }

    let total = 0;
    carrito.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
      <span>${item.nombre}</span>
      <span>x${item.cantidad}</span>
      <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
    `;
        contenedor.appendChild(div);
        total += item.precio * item.cantidad;
    });

    totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

function mostrarCartelExito() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay-exito");

    overlay.innerHTML = `
    <div class="cartel-exito">
      <h2>¡Compra realizada con éxito!</h2>
      <p>Gracias por tu compra en <strong>Punto y Coma</strong>.</p>
      <p>Serás redirigido al inicio en unos segundos...</p>
    </div>
  `;

    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.classList.add("mostrar");
    }, 100);

    // Redirige luego de 4 segundos
    setTimeout(() => {
        window.location.href = "../../index.html";
    }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
    renderListaCarrito();

    const form = document.querySelector("#formCompra");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const direccion = form.direccion.value.trim();

        if (!nombre || !email || !direccion) {
            alert("Por favor, completá todos los campos.");
            return;
        }

        // Vaciar carrito
        localStorage.removeItem("carrito");

        // Mostrar cartel animado
        mostrarCartelExito();
    });
});
