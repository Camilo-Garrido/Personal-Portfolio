/* -- Camilo Garrido Fernandez -- */
/* JAVASCRIPT */

// Portfolio Media Carousel
function moveCarousel(button, direction) {
    const container = button.closest('.carousel-container');
    const viewport = container.querySelector('.carousel-viewport');
    const style = window.getComputedStyle(viewport);
    const fontSize = parseFloat(style.fontSize);
    const scrollAmount = viewport.offsetWidth + fontSize;
    const dots = container.querySelectorAll('.dot');
    
    // Total unique images (excluding clones).
    const totalUnique = dots.length; 

    viewport.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });

    setTimeout(() => {
        const currentScroll = viewport.scrollLeft;
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;

        if (currentScroll >= maxScroll - 5) {
            viewport.style.scrollBehavior = 'auto';
            viewport.scrollLeft = scrollAmount * 2;
            viewport.style.scrollBehavior = 'smooth';
        } else if (currentScroll <= 5) {
            viewport.style.scrollBehavior = 'auto';
            viewport.scrollLeft = maxScroll - (scrollAmount * 2);
            viewport.style.scrollBehavior = 'smooth';
        }

        const htmlIndex = Math.round(viewport.scrollLeft / scrollAmount);

        let dotIndex = (htmlIndex - 2) % totalUnique;
        if (dotIndex < 0) dotIndex += totalUnique;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === dotIndex);
        });
    }, 150); 
}

// Carousel Initialization
window.addEventListener('load', () => {
    document.querySelectorAll('.carousel-viewport').forEach(viewport => {
        const style = window.getComputedStyle(viewport);
        const fontSize = parseFloat(style.fontSize);
        const scrollAmount = viewport.offsetWidth + fontSize;
        const container = viewport.closest('.carousel-container');
        const dots = container.querySelectorAll('.dot');
        const totalUnique = dots.length; 
        viewport.scrollLeft = scrollAmount * totalUnique;
        if (dots.length > 0) {
            dots.forEach(d => d.classList.remove('active'));
            dots[0].classList.add('active');
        }
    });
});

function openRRTMap() {
    const viewport = document.querySelector('.media-card .carousel-viewport');
    const scrollAmount = viewport.offsetWidth;
    const currentIndex = Math.round(viewport.scrollLeft / scrollAmount);
    
    if (currentIndex % 2 === 0) {
        window.open('new-portfolio-media/aircraft_planner_me133b/rrt_postprocessed_path4.html', '_blank');
    } else {
        window.open('new-portfolio-media/aircraft_planner_me133b/rrt_output_path4.html', '_blank');
    }
}

const originalMoveCarousel = moveCarousel;
moveCarousel = function(button, direction) {
    event.stopPropagation();
    originalMoveCarousel(button, direction);
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("year").textContent = new Date().getFullYear();

    const body = document.body;
    const navWrapper = document.getElementById('nav-wrapper');
    const navBars = document.getElementById('nav-bars');
    const connectButton = document.getElementById('connect-button');
    const contactBox = document.getElementById('contact-box');

    const scrollThreshold = 20;

    // Disable transitions on load
    if (contactBox) {
        contactBox.classList.add('no-transition');
        setTimeout(() => {
            contactBox.classList.remove('no-transition');
        }, 50);
    }

    // Navigation Scroll Activation
    function toggleScrollVisibility() {
        if (window.scrollY > scrollThreshold) {
            navWrapper.classList.add('scrolled-down');
        } else {
            navWrapper.classList.remove('scrolled-down');
            navWrapper.classList.remove('nav-active');
        }
    }

    // Nav Bars Click Toggle
    navBars.addEventListener('click', function(event) {
        event.stopPropagation();
        if (navWrapper.classList.contains('scrolled-down')) {
            navWrapper.classList.toggle('nav-active');
        }
    });

    // Global Click Handler (Nav and Contact Box Close Logic)
    document.addEventListener('click', function(event) {
        
        // Nav
        const isClickInsideNavWrapper = navWrapper.contains(event.target);
        const isNavActive = navWrapper.classList.contains('nav-active');

        if (isNavActive && !isClickInsideNavWrapper) {
            navWrapper.classList.remove('nav-active');
        }
        
        // Contact Box
        const isClickInsideContactBox = event.target.closest('#contact-box');
        
        if (body.classList.contains('is-connected') && !isClickInsideContactBox && event.target !== connectButton) {
            body.classList.remove('is-connected');
        }
    });

    // Connect Button Open/Close Logic
    if (connectButton) { 
        connectButton.addEventListener('click', function(event) {
            event.stopPropagation();
            
            const isConnected = body.classList.contains('is-connected');

            if (isConnected) {
                // Close: Remove the class immediately to start CSS exit animation
                body.classList.remove('is-connected');
            } else {
                // Open: Add the class immediately to start CSS entry animation
                body.classList.add('is-connected');
            }
        });
    }

    // Initialize scroll listener
    window.addEventListener('scroll', toggleScrollVisibility);
});

// Content loading listener
window.addEventListener("load", () => {
    document.querySelectorAll(".text-box, .pdf-container").forEach(element => {
        element.classList.add("loaded");
    });
});
