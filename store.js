// Import products data
import { products } from './products.js';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const categoryFilters = document.getElementById('categoryFilters');

// Get unique categories from products
function getCategories() {
    console.log('Getting unique categories');
    const categories = ['all', ...new Set(products.map(p => p.category))];
    return categories;
}

// Render category filters
function renderCategories() {
    console.log('Rendering category filters');
    const categories = getCategories();
    
    categoryFilters.innerHTML = categories
        .map(category => `
            <button class="category-btn ${category === 'all' ? 'active' : ''}" 
                    data-category="${category}">
                ${category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
        `)
        .join('');

    // Add event listeners to category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            console.log('Category selected:', category);
            
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            filterProducts(category);
        });
    });
}

// Filter and render products
function filterProducts(category = 'all') {
    console.log('Filtering products by category:', category);
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    renderProducts(filteredProducts);
}

// Render products in grid
function renderProducts(productsToRender) {
    console.log('Rendering products:', productsToRender);
    
    productsGrid.innerHTML = productsToRender
        .map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <a href="product.html?id=${product.id}" class="view-product-btn">View Details</a>
                </div>
            </div>
        `)
        .join('');
}

// Initialize the page
function init() {
    console.log('Initializing store page');
    renderCategories();
    filterProducts('all');
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 