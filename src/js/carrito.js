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
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "6px";

    // Info del producto
    const info = document.createElement("span");
    info.textContent = `${item.nombre} - $${item.precio * item.cantidad}`;

    // Controles de cantidad
    const controles = document.createElement("div");
    controles.style.display = "flex";
    controles.style.alignItems = "center";
    controles.style.gap = "6px";

    // Botón ➖
    const btnMenos = document.createElement("button");
    btnMenos.textContent = "−";
    btnMenos.style.padding = "2px 6px";
    btnMenos.style.cursor = "pointer";
    btnMenos.addEventListener("click", () => {
      if (item.cantidad > 1) {
        item.cantidad -= 1;
        localStorage.setItem(item.id, JSON.stringify(item));
        renderCarrito();
      }
    });

    // Cantidad
    const cantidadEl = document.createElement("span");
    cantidadEl.textContent = item.cantidad;

    // Botón ➕
    const btnMas = document.createElement("button");
    btnMas.textContent = "+";
    btnMas.style.padding = "2px 6px";
    btnMas.style.cursor = "pointer";
    btnMas.addEventListener("click", () => {
      item.cantidad += 1;
      localStorage.setItem(item.id, JSON.stringify(item));
      renderCarrito();
    });

    // Botón eliminar ❌
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.addEventListener("click", () => eliminarDelCarrito(item.id));

    // Armar estructura
    controles.appendChild(btnMenos);
    controles.appendChild(cantidadEl);
    controles.appendChild(btnMas);
    controles.appendChild(btnEliminar);

    li.appendChild(info);
    li.appendChild(controles);
    lista.appendChild(li);

    total += item.precio * item.cantidad;
    totalItems += item.cantidad;
  });

  if (carrito.length > 0) {
    dropdown.appendChild(lista);

    const totalEl = document.createElement("p");
    totalEl.textContent = `Total: $${total}`;
    totalEl.style.marginTop = "10px";
    dropdown.appendChild(totalEl);

    // === Botón Vaciar Carrito ===
    const btnVaciar = document.createElement("button");
    btnVaciar.textContent = "🗑️ Vaciar carrito";
    btnVaciar.style.marginTop = "8px";
    btnVaciar.style.padding = "6px 10px";
    btnVaciar.style.cursor = "pointer";
    btnVaciar.style.background = "#f44336";
    btnVaciar.style.color = "#fff";
    btnVaciar.style.border = "none";
    btnVaciar.style.borderRadius = "6px";

    btnVaciar.addEventListener("click", () => {
      vaciarCarrito();
    });

    // === Botón Finalizar Compra ===
    const btnFinalizar = document.createElement("button");
    btnFinalizar.textContent = "Finalizar compra";
    btnFinalizar.style.marginTop = "8px";
    btnFinalizar.style.marginLeft = "8px";
    btnFinalizar.style.padding = "6px 10px";
    btnFinalizar.style.cursor = "pointer";
    btnFinalizar.style.background = "#4CAF50";
    btnFinalizar.style.color = "#fff";
    btnFinalizar.style.border = "none";
    btnFinalizar.style.borderRadius = "6px";

    // Redirige a la página de finalización
    btnFinalizar.addEventListener("click", () => {
      window.location.href = "./src/pages/final_compra.html";
    });

    dropdown.appendChild(btnVaciar);
    dropdown.appendChild(btnFinalizar);
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

// Eliminar producto individual
function eliminarDelCarrito(id) {
  localStorage.removeItem(id);
  renderCarrito();
}

// Vaciar carrito completo
function vaciarCarrito() {
  const carrito = obtenerCarrito();
  carrito.forEach((item) => localStorage.removeItem(item.id));
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
  if (
    e.target.closest(".producto") &&
    !e.target.classList.contains("addCardBtn")
  ) {
    const id = e.target.closest(".producto").dataset.id;
    if (
      window.location.pathname.includes("index") ||
      window.location.pathname === "/" ||
      window.location.pathname.trim() === ""
    ) {
      window.location.href = `./src/pages/producto.html?id=${id}`;
      return;
    }
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
