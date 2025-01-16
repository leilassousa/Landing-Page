// Import products data and cart module
import { products } from './products.js';
import * as cartModule from './cart.js';

// Logging for debugging
console.log('Store script initialized');
console.log('Total products:', products.length);

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const categoryFilters = document.getElementById('category-filters');

// Get category from URL if present
const urlParams = new URLSearchParams(window.location.search);
const initialCategory = urlParams.get('category') || 'all';

// Log initial category
console.log('Initial category:', initialCategory);

// Initialize store
function initStore() {
    // Set initial active category
    const initialButton = categoryFilters.querySelector(`[data-category="${initialCategory}"]`);
    if (initialButton) {
        initialButton.classList.add('active');
    }

    // Add click handlers to category buttons
    categoryFilters.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            categoryFilters.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter products
            const category = button.dataset.category;
            filterProducts(category);

            // Update URL
            const newUrl = new URL(window.location);
            if (category === 'all') {
                newUrl.searchParams.delete('category');
            } else {
                newUrl.searchParams.set('category', category);
            }
            window.history.pushState({}, '', newUrl);
        });
    });

    // Initial product load
    filterProducts(initialCategory);
}

// Filter and display products
function filterProducts(category) {
    console.log('Filtering products by category:', category);
    
    // Filter products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    console.log('Filtered products:', filteredProducts.length);

    // Clear current products
    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        // Show empty state
        productsGrid.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="bi bi-search"></i>
                    <h3>No Products Found</h3>
                    <p class="text-muted">No products available in this category.</p>
                </div>
            </div>
        `;
        return;
    }

    // Display filtered products
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-6 col-lg-4';
        
        productCard.innerHTML = `
            <div class="card product-card ${product.highlighted ? 'highlighted' : ''}">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="variant-selection mb-3 ${product.variants ? '' : 'd-none'}">
                        <select class="form-select form-select-sm" data-product-id="${product.id}">
                            ${product.variants ? product.variants.map((variant, index) => `
                                <option value="${index}">Size: ${variant.size}, Color: ${variant.color}</option>
                            `).join('') : ''}
                        </select>
                    </div>
                </div>
                <div class="card-footer d-flex gap-2">
                    <button class="btn btn-dark flex-grow-1" onclick="window.location.href='product.html?id=${product.id}'">
                        View Details
                    </button>
                    <button class="btn btn-outline-dark add-to-cart-btn" 
                            onclick="handleAddToCart(${JSON.stringify(product)}, 1, ${product.variants ? 'this.closest(\'.card\').querySelector(\'select\').selectedIndex' : 'null'})">
                        <i class="bi bi-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Handle adding product to cart
window.handleAddToCart = (product, quantity, variantIndex) => {
    console.log('Adding to cart:', { product, quantity, variantIndex });
    
    const variant = product.variants ? product.variants[variantIndex] : null;
    cartModule.addToCart(product, quantity, variant);
    
    // Show success toast
    const toast = new bootstrap.Toast(document.createElement('div'));
    toast.element.className = 'toast position-fixed bottom-0 end-0 m-3';
    toast.element.setAttribute('role', 'alert');
    toast.element.innerHTML = `
        <div class="toast-header bg-success text-white">
            <i class="bi bi-check-circle me-2"></i>
            <strong class="me-auto">Success</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${product.name} added to cart
        </div>
    `;
    document.body.appendChild(toast.element);
    toast.show();
    
    // Remove toast after it's hidden
    toast.element.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toast.element);
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initStore); 