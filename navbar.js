// Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            console.log('Mobile menu toggled');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            console.log('Mobile menu closed by outside click');
        }
    });

    // Log navigation interactions
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log(`Navigation: Clicked ${link.textContent} link`);
        });
    });

    // Add logging for responsive behavior
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        console.log(`Screen resized to: ${width}px`);
        
        if (width > 1024) {
            console.log('Viewport: Desktop');
        } else if (width > 768) {
            console.log('Viewport: Tablet');
        } else if (width > 480) {
            console.log('Viewport: Mobile');
        } else {
            console.log('Viewport: Small Mobile');
        }
    });
}); 