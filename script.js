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
    initializeProductModal();
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
    viewDetailsBtn.addEventListener('click', () => showProductModal(product));

    return card;
}

// Show product modal
function showProductModal(product) {
    log(`Showing modal for product: ${product.name}`);
    
    const modal = document.getElementById('productModal');
    const modalHeader = modal.querySelector('.modal-header');
    const modalBody = modal.querySelector('.modal-body');
    const modalFooter = modal.querySelector('.modal-footer');

    modalHeader.innerHTML = `<h2>${product.name}</h2>`;
    
    modalBody.innerHTML = `
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
    `;

    modalFooter.innerHTML = `
        <button class="contact-btn">Contact for Quote</button>
    `;

    modal.style.display = 'block';
}

// Initialize product modal
function initializeProductModal() {
    log('Initializing product modal...');
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('closeModal');

    if (!modal || !closeBtn) {
        console.error('Modal elements not found!');
        return;
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Add to cart functionality
function addToCart(productId) {
    log(`Adding product ${productId} to cart`);
    // Implement cart functionality
}

// Search functionality
function searchProducts(query) {
    log(`Searching for: ${query}`);
    // Implement search functionality
}