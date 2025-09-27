// Carga dinámicamente las partes comunes del layout
async function loadPartial(containerId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();

        const container = document.getElementById(containerId);
        container.innerHTML = html;

        // 👇 Ejecutar manualmente los scripts
        container.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            if (oldScript.src) {
                newScript.src = oldScript.src;
                newScript.async = true;
            } else {
                newScript.textContent = oldScript.textContent;
            }
            // Reemplazar el script viejo (que no se ejecuta) por uno nuevo
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });

    } catch (error) {
        console.error(`Error al cargar ${filePath}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const basePath = document.body.dataset.basePath || './';
    loadPartial('header-container', basePath + 'partials/header.html');
    loadPartial('footer-container', basePath + 'partials/footer.html');
    loadPartial('scripts-container', basePath + 'partials/scripts.html');
});
