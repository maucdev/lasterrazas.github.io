// Carga dinámicamente las partes comunes del layout
async function loadPartial(containerId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        feather.replace(); // Re-inicializa los íconos de Feather
    } catch (error) {
        console.error(`Error al cargar ${filePath}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Ajusta la ruta base según la profundidad de la página actual
    const basePath = document.body.dataset.basePath || './';
    loadPartial('header-container', basePath + 'partials/header.html');
    loadPartial('footer-container', basePath + 'partials/footer.html');
    loadPartial('scripts-container', basePath + 'partials/scripts.html');
});
