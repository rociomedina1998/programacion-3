import { jsonBackup } from "../backup/backup.js";

async function GetCatalogo() {
  const cacheKey = "catalogoLibros";
  const cacheTimeKey = "catalogoTimestamp";
  const CACHE_DURATION = 1000 * 60 * 60; // 60 minutos

  try {
    const cache = localStorage.getItem(cacheKey);
    const lastFetch = Number(localStorage.getItem(cacheTimeKey));

    // Si hay cache y no venció, devolverlo
    if (cache && lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
      console.log("📦 Cargando catálogo desde cache");
      return JSON.parse(cache);
    }

    const apiUrl = "https://gutendex.com/books/";
    const proxiedUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

    let data;

    try {
      const res = await fetch(proxiedUrl);

      if (!res.ok) throw new Error("Error al llamar a la API");

      data = await res.json();

      console.log("🌐 Cargando catálogo desde API (con proxy)");
    } catch (err) {
      console.warn("⚠️ API falló, usando backup");
      data = jsonBackup; // ← acá sí se usa el backup de verdad
    }

    const productos =
      data?.results?.map((item) => ({
        id: item.id,
        nombre: item.title.split(";")[0].trim(),
        img: item?.formats?.["image/jpeg"] || "placeholder.jpg",
        precio: (Math.random() * 2000 + 50).toFixed(2),
        descripcion: item?.sumaries?.[0],
        categoria:
          item?.bookshelves?.[0]?.replace("Category: ", "").trim() || "General",
        stock: Math.floor(Math.random() * 20) + 1,
        author: item?.authors?.[0]?.name || "Desconocido",
      })) || [];

    localStorage.setItem(cacheKey, JSON.stringify(productos));
    localStorage.setItem(cacheTimeKey, String(Date.now()));

    return productos;
  } catch (error) {
    console.error("Error final en GetCatalogo:", error);
    return jsonBackup; // Última defensa
  }
}

export default GetCatalogo;
