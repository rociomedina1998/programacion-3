"use strict";

import GetCatalogo from "./utils/reqCatalogo.js";

const loader = document.getElementById("loader");
const cards = document.getElementById("catalogo");

// Mostrar el spinner
loader.style.display = "block";
cards.style.display = "none";

async function cargarCatalogo() {
  try {
    const products = await GetCatalogo();
    console.log(products);

    const productos =
      products?.results?.map((item) => ({
        id: item.id,
        nombre: item.title.split(";")[0].trim(),
        img: item?.formats?.["image/jpeg"] || "placeholder.jpg",
        precio: (Math.random() * 1000 + 50).toFixed(2), // Precio aleatorio entre 50 y 1050
        descripcion: item?.sumaries?.[0],
        categoria:
          item?.bookshelves?.[0].replace("Category: ", "").trim() || "General.",
        stock: Math.floor(Math.random() * 20) + 1, // Stock aleatorio entre 1 y 20
        author: item?.authors?.[0]?.name || "Desconocido",
      })) || [];

    console.log(productos);

    // Ocultar el spinner
    loader.style.display = "none";
    cards.style.display = "grid";

    productos.forEach((prod) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("producto");
      productoDiv.setAttribute("data-id", prod.id);
      productoDiv.setAttribute("data-categoria", prod.categoria);
      productoDiv.setAttribute("data-cantidad", prod.stock);
      productoDiv.setAttribute("data-precio", prod.precio);

      productoDiv.innerHTML = `
        <h3>${prod.nombre}</h3>
        <img class="producto-img" src="${prod.img}" alt="${prod.nombre}">
        <p><strong>Precio: $${prod.precio}</strong></p>
        <div class='cardDescription'>
          <p>• Categoría: ${prod.categoria}</p>
          <p>• Autor: ${prod.author}</p>
          <p>• Stock: ${prod.stock}</p>
        </div>
        <button type="button" class="addCardBtn" data-id="${prod.id}">Agregar al carrito</button>
      `;

      cards.appendChild(productoDiv);
      return productoDiv.innerHTML;
    });
  } catch (error) {
    loader.style.display = "none";
    cards.innerHTML = "<p>Error al cargar el catálogo 😕</p>";
    console.error("Error al cargar el catálogo:", error);
  }
}
cargarCatalogo();

export default cargarCatalogo;
