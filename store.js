// Import products from central source
import { products } from './products.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing store functionality...'); // Debug log
    console.log('Available products:', products); // Debug log

    // Initialize all components
    initializeProducts();
    initializeFilters();
    initializeModals();
    initializeNavigation();
});

// Products initialization
function initializeProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) {
        console.error('Products grid not found');
        return;
    }

    console.log('Initializing products grid'); // Debug log
    renderProducts(products);
}

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            console.log('Filter clicked:', category); // Debug log
            filterProducts(category);
            updateActiveFilter(category);
        });
    });
}

function filterProducts(category) {
    console.log('Filtering products by category:', category); // Debug log
    
    const filteredProducts = category === 'all' || !category
        ? products 
        : products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    
    console.log('Filtered products:', filteredProducts); // Debug log
    renderProducts(filteredProducts);
}

function updateActiveFilter(category) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.category === category);
    });
}

// Product rendering
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) {
        console.error('Products grid not found');
        return;
    }

    console.log('Rendering products:', productsToRender); // Debug log

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products found in this category</div>';
        return;
    }

    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price}</div>
                <div class="product-actions">
                    <button class="product-btn view-details-btn">View Details</button>
                    <button class="product-btn quote-btn">Get Quote</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners after rendering
    addProductEventListeners(productsToRender);
}

// Add event listeners to product cards
function addProductEventListeners(products) {
    products.forEach(product => {
        const card = document.querySelector(`[data-product-id="${product.id}"]`);
        if (!card) return;

        const viewDetailsBtn = card.querySelector('.view-details-btn');
        const quoteBtn = card.querySelector('.quote-btn');

        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showProductDetails(product);
            });
        }

        if (quoteBtn) {
            quoteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showQuoteForm(product);
            });
        }
    });
}

// Modal functionality
function showProductDetails(product) {
    console.log('Showing details for product:', product.name);

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
        <button class="quote-btn" onclick="showQuoteForm(${product.id})">Request Quote</button>
    `;

    openModal(modal);
}

function showQuoteForm(product) {
    console.log('Opening quote form for product:', product.name);

    const modal = document.getElementById('quoteModal');
    const productInput = modal.querySelector('#quoteProduct');
    if (productInput) {
        productInput.value = product.name;
    }

    closeModal(document.getElementById('productModal'));
    openModal(modal);
}

function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Initialize modals
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Initialize quote form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmit);
    }
}

// Handle quote form submission
function handleQuoteSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Quote form submitted:', data);
    
    // Here you would typically send the data to your backend
    alert('Thank you for your quote request. We will contact you shortly!');
    closeModal(document.getElementById('quoteModal'));
    e.target.reset();
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navLinks.classList.remove('active');
            }
        });
    }
}

// Make functions available globally for onclick handlers
window.showProductDetails = showProductDetails;
window.showQuoteForm = showQuoteForm; 