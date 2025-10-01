"use strict";

import productos from "./data.js";

const cards = document.getElementById("catalogo");

productos.forEach((prod) => {
  cards.innerHTML += `
    <div class="producto" data-id="${prod.id}" data-categoria=${prod.categoria} data-cantidad="9" data-precio="5500">
      <h3>${prod.nombre}</h3>
      <img class="producto-img" src=${prod.img} alt="${prod.nombre}">
      <p><strong>Precio: $${prod.precio}</strong></p>
      <p>${prod.descripcion}</p>
      <p>Categoría: ${prod.categoria} • Stock: ${prod.stock}</p>
      <button type="button" class="addCardBtn" data-id="${prod.id}">Agregar al carrito</button>
    </div>
  `;
});
