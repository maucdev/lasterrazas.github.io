// assets/js/layout.js

/**
 * Carga un fragmento HTML (header o footer) y lo inserta en un contenedor.
 * @param {string} containerId - ID del elemento contenedor.
 * @param {string} filePath - Ruta al archivo HTML a cargar.
 */
async function loadPartial(containerId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Error al cargar ${filePath}:`, error);
    }
}

// Cuando el DOM esté listo, carga el header y el footer
document.addEventListener('DOMContentLoaded', async function () {
    const basePath = document.body.dataset.basePath || './';
    await loadPartial('header-container', basePath + 'partials/header.html');
    await loadPartial('footer-container', basePath + 'partials/footer.html');
});
