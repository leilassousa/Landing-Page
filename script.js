// Import products from central source
import { products } from './products.js';

// Debug logging function
function log(message) {
    console.log(message);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    log('Initializing page...');
    displayHighlightedProducts();
    initializeModals();
    initializeCarousel();
    initializeNavigation();
});

// Display highlighted products
function displayHighlightedProducts() {
    log('Displaying highlighted products...');
    const bundlesGrid = document.getElementById('bundlesGrid');
    
    if (!bundlesGrid) {
        console.error('Bundles grid container not found!');
        return;
    }

    // Clear existing content
    bundlesGrid.innerHTML = '';

    // Filter and display highlighted products
    const highlightedProducts = products.filter(product => product.highlighted);
    log(`Found ${highlightedProducts.length} highlighted products`);

    highlightedProducts.forEach(product => {
        const card = createProductCard(product);
        bundlesGrid.appendChild(card);
    });
}

// Create product card
function createProductCard(product) {
    log(`Creating card for product: ${product.name}`);
    
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price}</div>
            <button class="view-details-btn" data-product-id="${product.id}">View Details</button>
        </div>
    `;

    // Add click event for the view details button
    const viewDetailsBtn = card.querySelector('.view-details-btn');
    viewDetailsBtn.addEventListener('click', () => showProductDetails(product));

    return card;
}

// Show product details modal
function showProductDetails(product) {
    log(`Showing details for product: ${product.name}`);

    const modal = document.getElementById('productModal');
    const modalContent = modal.querySelector('#modalContent');

    modalContent.innerHTML = `
        <h2>${product.name}</h2>
        <div class="modal-product-content">
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-product-details">
                <p>${product.description}</p>
                <h4>Features:</h4>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="modal-product-price">
                    <strong>Price:</strong> ${product.price}
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="contact-btn" onclick="showQuoteForm(${JSON.stringify(product)})">Request Quote</button>
        </div>
    `;

    openModal(modal);
}

// Show quote form modal
function showQuoteForm(product) {
    log('Opening quote form for product:', product.name);

    const modal = document.getElementById('quoteModal');
    const productInput = modal.querySelector('#quoteProduct');
    if (productInput) {
        productInput.value = product.name;
    }

    closeModal(document.getElementById('productModal'));
    openModal(modal);
}

// Open modal helper
function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal helper
function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Initialize modals
function initializeModals() {
    log('Initializing modals...');
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            // Close only if clicking the backdrop (modal itself), not its contents
            if (e.target === modal) {
                closeModal(modal);
            }
        });

        // Prevent touchmove on modal background to prevent page scrolling on mobile
        modal.addEventListener('touchmove', (e) => {
            if (e.target === modal) {
                e.preventDefault();
            }
        });
    });

    // Initialize quote form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmit);
    }

    // Add escape key listener to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModals = Array.from(modals).filter(modal => 
                window.getComputedStyle(modal).display !== 'none'
            );
            openModals.forEach(closeModal);
        }
    });
}

// Handle quote form submission
function handleQuoteSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    log('Quote form submitted:', data);
    
    // Here you would typically send the data to your backend
    alert('Thank you for your quote request. We will contact you shortly!');
    closeModal(document.getElementById('quoteModal'));
    e.target.reset();
}

// Make functions available globally for onclick handlers
window.showProductDetails = showProductDetails;
window.showQuoteForm = showQuoteForm;