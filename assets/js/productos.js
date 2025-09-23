
document.addEventListener('DOMContentLoaded', () => {
    const selectCategoria = document.getElementById('categoria');
    const botonAplicar = document.querySelector('button[type="submit"]');
    const catalogo = document.getElementById('catalogo');
    const productos = catalogo.querySelectorAll('.producto');

    botonAplicar.addEventListener('click', () => {
        const categoriaSeleccionada = selectCategoria.value;

        productos.forEach(producto => {
            const categoriaProducto = producto.getAttribute('data-categoria');

            if (categoriaSeleccionada === 'todas' || categoriaProducto === categoriaSeleccionada) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });
    });
});

