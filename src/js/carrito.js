// === Carrito ===

// Obtener carrito desde localStorage
export function obtenerCarrito() {
  const data = localStorage.getItem("carrito");
  return data ? JSON.parse(data) : [];
}

// Guardar carrito actualizado
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función auxiliar para determinar la ruta correcta a final_compra.html
function getRutaFinalCompra() {
  const path = window.location.pathname;
  
  // Si estamos en index.html o raíz del proyecto
  if (path === "/" || path === "" || path.includes("index.html") || !path.includes("/pages/")) {
    return "./src/pages/final_compra.html";
  }
  
  // Si estamos dentro de la carpeta pages (catalogo.html, producto.html, contactos.html)
  if (path.includes("/pages/")) {
    return "./final_compra.html";
  }
  
  // Fallback por si hay otras rutas
  return "../pages/final_compra.html";
}

// Renderizar carrito dentro del dropdown
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
    li.className = "cart-item";

    // Info del producto
    const info = document.createElement("span");
    info.textContent = `${item.nombre} - $${item.precio * item.cantidad}`;

    // Controles de cantidad
    const controles = document.createElement("div");
    controles.className = "cart-controls";

    // Botón ➖
    const btnMenos = document.createElement("button");
    btnMenos.textContent = "−";
    btnMenos.className = "cart-btn";
    btnMenos.addEventListener("click", (e) => {
      e.stopPropagation();
      if (item.cantidad > 1) {
        item.cantidad -= 1;
      } else return;
      guardarCarrito(carrito);
      renderCarrito();
    });

    // Cantidad
    const cantidadEl = document.createElement("span");
    cantidadEl.textContent = item.cantidad;
    cantidadEl.className = "cart-qty";

    // Botón ➕
    const btnMas = document.createElement("button");
    btnMas.textContent = "+";
    btnMas.className = "cart-btn";
    btnMas.addEventListener("click", (e) => {
      e.stopPropagation();
      item.cantidad += 1;
      guardarCarrito(carrito);
      renderCarrito();
    });

    // Botón eliminar ❌
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.className = "cart-remove";
    btnEliminar.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = carrito.findIndex((p) => p.id === item.id);
      carrito.splice(index, 1);
      guardarCarrito(carrito);
      renderCarrito();
    });

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
    totalEl.className = "cart-total";
    dropdown.appendChild(totalEl);

    // Botón Vaciar carrito 🗑️
    const btnVaciar = document.createElement("button");
    btnVaciar.textContent = "🗑️ Vaciar carrito";
    btnVaciar.className = "btn-vaciar";
    btnVaciar.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("¿Seguro que querés vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        renderCarrito();
      }
    });

    // Botón Finalizar Compra 
    const btnFinalizar = document.createElement("button");
    btnFinalizar.textContent = "Finalizar compra";
    btnFinalizar.classList.add("btnFinalizar");

    // Redirige a la página de finalización
    btnFinalizar.addEventListener("click", (e) => {
      e.stopPropagation();
      const rutaCorrecta = getRutaFinalCompra();
      console.log(`Navegando a: ${rutaCorrecta} desde: ${window.location.pathname}`); // Para debug
      window.location.href = rutaCorrecta;
    });

    dropdown.appendChild(btnVaciar);
    dropdown.appendChild(btnFinalizar);
  } else {
    dropdown.innerHTML = "<p class='cart-empty'>Carrito vacío</p>";
  }

  // Actualizar número en el botón del carrito
  btnCarrito.innerHTML = `<span class="cart-count">${totalItems}</span>`;
}

// Agregar producto al carrito
export function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();
  const prodExistente = carrito.find((p) => p.id === producto.id);

  if (prodExistente) {
    prodExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
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
    return;
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
const btnCarritoEl = document.querySelector("#btnCarrito");
if (btnCarritoEl) {
  btnCarritoEl.addEventListener("click", (e) => {
    e.stopPropagation();
    const dropdown = document.querySelector("#carritoDropdown");
    dropdown.classList.toggle("mostrar");
  });
}


// Cerrar carrito si se hace clic fuera
document.addEventListener("click", (e) => {
  const dropdown = document.querySelector("#carritoDropdown");
  const btnCarrito = document.querySelector("#btnCarrito");

  if (!dropdown.classList.contains("mostrar")) return;
  if (dropdown.contains(e.target) || btnCarrito.contains(e.target)) return;
  dropdown.classList.remove("mostrar");
});

// Render inicial excepto que este en la pagina de finalizar_compra
if (!window.location.pathname.includes("final_compra.html")) {
  renderCarrito();
}
