// assets/js/layout.js

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

// Nueva función: inicializa todas las funcionalidades de la página
function initializePageScripts() {
    // Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('hidden');
            const icon = this.querySelector('i');
            if (icon) {
                icon.setAttribute('data-feather', expanded ? 'menu' : 'x');
                feather.replace();
            }
        });
    }

    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        const dots = document.querySelectorAll('.carousel-dot');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        let currentSlide = 0;
        let autoSlideInterval;

        function showSlide(index) {
            slides.forEach(slide => slide.style.opacity = '0');
            dots.forEach(dot => dot.style.opacity = '0.5');
            slides[index].style.opacity = '1';
            dots[index].style.opacity = '1';
            currentSlide = index;
        }

        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                const slideIndex = parseInt(dot.getAttribute('data-slide'));
                showSlide(slideIndex);
                startAutoSlide();
            });
        });

        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
        }

        showSlide(0);
        startAutoSlide();
    }
}

// Carga el layout y luego inicializa los scripts
document.addEventListener('DOMContentLoaded', async function () {
    const basePath = document.body.dataset.basePath || './';
    await loadPartial('header-container', basePath + 'partials/header.html');
    await loadPartial('footer-container', basePath + 'partials/footer.html');
    
    // Una vez que el header y footer están en el DOM, inicializa todo.
    initializePageScripts();
});
