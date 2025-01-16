// Import products data
import { products } from './products.js';

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
                </div>
                <div class="card-footer">
                    <div class="d-grid">
                        <a href="product.html?id=${product.id}" class="btn btn-dark">View Details</a>
                    </div>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initStore); 