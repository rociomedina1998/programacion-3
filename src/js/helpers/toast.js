import Toastify from "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js";

export default function showToast(message, type = "info") {
  let backgroundColor;

  // 🎨 Paleta de colores por tipo
  switch (type) {
    case "success":
      backgroundColor = "linear-gradient(to right, #4CAF50, #81C784)"; // verde
      break;
    case "error":
      backgroundColor = "linear-gradient(to right, #E53935, #EF5350)"; // rojo
      break;
    case "warning":
      backgroundColor = "linear-gradient(to right, #FFA000, #FFCA28)"; // amarillo
      break;
    default:
      backgroundColor = "linear-gradient(to right, #2196F3, #64B5F6)"; // azul (info)
  }

  Toastify({
    text: message,
    duration: 3500,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
      background: backgroundColor,
      color: "#fff",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      fontSize: "14px",
      padding: "10px 18px",
      fontFamily: "Segoe UI, sans-serif",
      marginTop: "10px",
      width: "fit-content",
    },
  }).showToast();
}
