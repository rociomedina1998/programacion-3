"use strict";

import cargarCatalogo from "./catalogo.js";

const productos = await cargarCatalogo();
console.log(productos)
