import GetCatalogo from "./utils/reqCatalogo.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Obtenemos el catálogo desde la API
  const productos = await GetCatalogo();
  console.log(productos);

  const selectCategoria = document.getElementById("categoria");
  const botonAplicar = document.querySelector('button[type="submit"]');
  const catalogo = document.getElementById("catalogo");
  const itemsCatalogo = catalogo.querySelectorAll(".producto");

  // Obtenemos las categorías únicas desde los productos
  const categorias = [
    "todas",
    ...new Set(productos.map((p) => p.categoria || "sin-categoria")),
  ];

  // Limpiamos el select por si ya tiene algo
  selectCategoria.innerHTML = "";

  // Creamos las opciones dinámicamente
  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent =
      categoria.charAt(0).toUpperCase() + categoria.slice(1);
    selectCategoria.appendChild(option);
  });

  // Evento de filtrado
  botonAplicar.addEventListener("click", (e) => {
    e.preventDefault();

    const categoriaSeleccionada = selectCategoria.value;

    itemsCatalogo.forEach((item) => {
      const categoriaProducto = item.getAttribute("data-categoria");

      if (
        categoriaSeleccionada === "todas" ||
        categoriaProducto === categoriaSeleccionada
      ) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
});
