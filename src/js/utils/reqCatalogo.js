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

    // Guardar en cache
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheTimeKey, Date.now());

    return data;
  } catch (error) {
    console.error("Error al obtener catálogo:", error);
    throw error;
  }
}

export default GetCatalogo;