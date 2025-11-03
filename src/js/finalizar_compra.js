// === FINALIZAR COMPRA ===

// Recupera todos los productos guardados en el localStorage y los devuelve como un array.
//Obtiene todas las claves guardadas en localStorage.
// Recorre cada clave y verifica si corresponde a un producto válido.
function obtenerCarrito() {
    const keys = Object.keys(localStorage);
    const carrito = [];

    keys.forEach((key) => {
        const prod = JSON.parse(localStorage.getItem(key));
        if (prod && prod.id) {
            carrito.push(prod);
        }
    });

    return carrito;
}

// Muestra en pantalla los productos guardados en el carrito
// y calcula el total de la compra.
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

document.addEventListener("DOMContentLoaded", () => {
    renderListaCarrito();

    const form = document.querySelector("#formCompra");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validar inputs
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const direccion = form.direccion.value.trim();
        const telefono = form.telefono.value.trim();

        if (!nombre || !email || !direccion || !telefono ) {
            alert("Por favor, completá todos los campos.");
            return;
        }

        // Vaciar carrito
        const carrito = obtenerCarrito();
        carrito.forEach((item) => localStorage.removeItem(item.id));

        alert("Su pedido se realizó con éxito. ¡Gracias por su compra!");

        // Redirigir al inicio
        window.location.href = "../../index.html";
    });
});
