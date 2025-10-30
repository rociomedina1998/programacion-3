async function GetCatalogo() {
  const cacheKey = "catalogoLibros";
  const cacheTimeKey = "catalogoTimestamp";
  const CACHE_DURATION = 1000 * 60 * 10; // 10 minutos

  try {
    const cache = localStorage.getItem(cacheKey);
    const lastFetch = localStorage.getItem(cacheTimeKey);

    // Si hay cache y no venció, devolverlo
    if (cache && lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
      console.log("📦 Cargando catálogo desde cache");
      return JSON.parse(cache);
    }

    // Si no hay cache o venció, hacer fetch
    const res = await fetch("https://gutendex.com/books/");
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    console.log("🌐 Cargando catálogo desde API");



    const productos =
      data?.results?.map((item) => ({
        id: item.id,
        nombre: item.title.split(";")[0].trim(),
        img: item?.formats?.["image/jpeg"] || "placeholder.jpg",
        precio: (Math.random() * 1000 + 50).toFixed(2), // Precio aleatorio entre 50 y 1050
        descripcion: item?.sumaries?.[0],
        categoria:
          item?.bookshelves?.[0]?.replace("Category: ", "").trim() || "General",
        stock: Math.floor(Math.random() * 20) + 1, // Stock aleatorio entre 1 y 20
        author: item?.authors?.[0]?.name || "Desconocido",
      })) || [];

    localStorage.setItem("catalogo", JSON.stringify(productos));

    // Guardar en cache
    localStorage.setItem(cacheKey, JSON.stringify(productos));
    localStorage.setItem(cacheTimeKey, Date.now());
      console.log(productos)
    return productos;
  } catch (error) {
    console.error("Error al obtener catálogo:", error);
    throw error;
  }
}

export default GetCatalogo;