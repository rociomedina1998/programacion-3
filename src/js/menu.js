// Función para manejar el menú hamburguesa
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navbarList = document.getElementById('navbarList');

    if (!menuToggle || !navbarList) {
        console.warn('Elementos del menú no encontrados');
        return;
    }

    // Toggle del menú al hacer click en hamburguesa
    menuToggle.addEventListener('click', function() {
        // Toggle clase active en el botón (para animación de X)
        menuToggle.classList.toggle('active');
        
        // Toggle clase active en la lista (para mostrar/ocultar)
        navbarList.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace (opcional)
    const navLinks = navbarList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbarList.classList.remove('active');
        });
    });

    // Cerrar menú al redimensionar ventana (si se vuelve a desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navbarList.classList.remove('active');
        }
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Exportar para usar en otros archivos (si usas módulos)
export { initMobileMenu };