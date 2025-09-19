"use strict";

import productos from "./data.js";

const cards = document.getElementById("catalogo");

productos.forEach(prod=>{
    cards.appendChild(`
        <div class="producto" data-id="${prod.id}" data-categoria="niños" data-cantidad="9" data-precio="5500">
                <h3>Cuadernillo ABC</h3>
                <img class="producto-img" src="../assets/img/cuadernillo rivadavia.jpg" alt="Cuadernillo ABC">
                <p><strong>Precio: $5.500</strong></p>
                <p>Cuadernillo rayado.</p>
                <p>Categoría: niños • Stock: 9</p>
                <button type="button">Ver detalles</button>
            </div>
        `)
})
