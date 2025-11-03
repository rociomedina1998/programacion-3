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

    // Detectar si hay path o no
    const path = window.location.pathname;
    console.log("Path actual:", path);

    // Si no hay path (o es "/"), mostrar solo 5 productos
    const productosAMostrar =
      path === "/" || path === "" || path.includes("index") ? products.slice(0, 5) : products;

    // Ocultar el spinner
    loader.style.display = "none";
    cards.style.display = "";
    cards.classList.add("catalogo");

    productosAMostrar.forEach((prod) => {
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
        <button type="button" class="addCardBtn" data-id="${prod.id}">
          Agregar al carrito
        </button>
      `;

      cards.appendChild(productoDiv);
    });
  } catch (error) {
    loader.style.display = "none";
    cards.innerHTML = "<p>Error al cargar el catálogo 😕</p>";
    console.error("Error al cargar el catálogo:", error);
  }
}

cargarCatalogo();

export default cargarCatalogo;
