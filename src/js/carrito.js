// === Carrito ===
// Función para renderizar el carrito dentro del dropdown
export function renderCarrito() {
  const dropdown = document.querySelector("#carritoDropdown");
  const btnCarrito = document.querySelector("#btnCarrito");
  dropdown.innerHTML = ""; // limpio

  const carrito = obtenerCarrito();
  const lista = document.createElement("ul");

  let total = 0;
  let totalItems = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;

    // Botón eliminar ❌
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.addEventListener("click", () => eliminarDelCarrito(item.id));

    li.appendChild(btnEliminar);
    lista.appendChild(li);

    total += item.precio * item.cantidad;
    totalItems += item.cantidad;
  });

  if (carrito.length > 0) {
    dropdown.appendChild(lista);

    const totalEl = document.createElement("p");
    totalEl.textContent = `Total: $${total}`;
    dropdown.appendChild(totalEl);
  } else {
    dropdown.innerHTML = "<p>Carrito vacío</p>";
  }

  // Actualizar el botón con la cantidad de items
  btnCarrito.textContent = `Carrito (${totalItems})`;
}

// Obtener carrito desde localStorage
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

// Guardar producto en localStorage
export function agregarAlCarrito(producto) {
  const prodExistente = localStorage.getItem(producto.id);

  if (prodExistente) {
    const prodParse = JSON.parse(prodExistente);
    prodParse.cantidad += 1;
    localStorage.setItem(producto.id, JSON.stringify(prodParse));
  } else {
    const nuevoProd = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    };
    localStorage.setItem(producto.id, JSON.stringify(nuevoProd));
  }

  renderCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
  localStorage.removeItem(id);
  renderCarrito();
}

// === Eventos globales ===
document.addEventListener("click", (e) => {
  // 1. Agregar al carrito
  if (e.target.classList.contains("addCardBtn")) {
    const productoEl = e.target.closest(".producto");

    const producto = {
      id: productoEl.dataset.id,
      nombre: productoEl.querySelector("h3").textContent,
      precio: parseInt(productoEl.dataset.precio),
    };

    agregarAlCarrito(producto);
    return; // salgo acá, así no dispara la lógica de detalle
  }

  // 2. Redirigir a detalle si hizo click en la tarjeta (excepto el botón)
  if (e.target.closest(".producto") && !e.target.classList.contains("addCardBtn")) {
    const id = e.target.closest(".producto").dataset.id;
    window.location.href = `../pages/producto.html?id=${id}`;
  }
});

// Toggle mostrar/ocultar carrito con animación
document.querySelector("#btnCarrito").addEventListener("click", () => {
  const dropdown = document.querySelector("#carritoDropdown");
  dropdown.classList.toggle("mostrar");
});

// Render inicial
renderCarrito();
