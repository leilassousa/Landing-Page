// Import products data
import { products } from './products.js';

// DOM Elements
const bundlesGrid = document.getElementById('bundlesGrid');

// Render products in grid
function renderProducts() {
    console.log('Rendering highlighted products');
    
    const highlightedProducts = products.filter(product => product.highlighted);
    
    bundlesGrid.innerHTML = `
        <div class="products-grid">
            ${highlightedProducts.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <a href="product.html?id=${product.id}" class="view-product-btn">View Details</a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Initialize the page
function init() {
    console.log('Initializing homepage');
    renderProducts();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);