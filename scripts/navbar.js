// Import cart module
import * as cartModule from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Navbar script initialized');

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize cart UI
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const itemCount = cartModule.getCartItemCount();
        cartCount.textContent = itemCount;
        cartCount.style.display = itemCount > 0 ? 'block' : 'none';
    }

    // Update Request Quote button state
    const requestQuoteBtn = document.getElementById('request-quote-btn');
    if (requestQuoteBtn) {
        const updateQuoteButtonState = () => {
            const cart = cartModule.getCart();
            requestQuoteBtn.disabled = cart.items.length === 0;
        };
        
        // Initial state
        updateQuoteButtonState();
        
        // Update on cart changes
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.addEventListener('shown.bs.modal', updateQuoteButtonState);
        }
    }
}); 