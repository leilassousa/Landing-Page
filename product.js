// Import products data
import { products } from './products.js';

// DOM Elements
const mainImage = document.getElementById('main-product-image');
const thumbnailStrip = document.getElementById('thumbnail-strip');
const productTitle = document.getElementById('product-title');
const productDescription = document.getElementById('product-description');
const productFeatures = document.getElementById('product-features');
const variationsSection = document.getElementById('variations-section');
const sizeOptions = document.getElementById('size-options');
const addToQuoteBtn = document.getElementById('add-to-quote');
const productCategory = document.getElementById('product-category');
const productName = document.getElementById('product-name');
const relatedProducts = document.getElementById('related-products');

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Logging for debugging
console.log('Product ID:', productId);

// Load product data
function loadProduct() {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found');
        return;
    }

    console.log('Loading product:', product);

    // Update page title
    document.title = `${product.name} - Penalty Sports`;

    // Update breadcrumbs
    productCategory.textContent = product.category;
    productName.textContent = product.name;

    // Update product details
    productTitle.textContent = product.name;
    productDescription.textContent = product.description;
    mainImage.src = product.image;
    mainImage.alt = product.name;

    // Load features
    loadFeatures(product.features);

    // Load related products
    loadRelatedProducts(product.category);
}

// Load product features
function loadFeatures(features) {
    console.log('Loading features:', features);
    productFeatures.innerHTML = features
        .map(feature => `<li>${feature}</li>`)
        .join('');
}

// Load related products
function loadRelatedProducts(category) {
    console.log('Loading related products for category:', category);
    const related = products
        .filter(p => p.category === category && p.id !== productId)
        .slice(0, 4);

    relatedProducts.innerHTML = related
        .map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <a href="product.html?id=${product.id}" class="view-product-btn">View Product</a>
            </div>
        `)
        .join('');
}

// Tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Tab clicked:', button.dataset.tab);
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
}

// Quote functionality
function initQuoteButton() {
    addToQuoteBtn.addEventListener('click', () => {
        console.log('Adding to quote:', productId);
        // Add quote functionality here
        alert('Product added to quote basket!');
    });
}

// Initialize page
function init() {
    console.log('Initializing product page');
    loadProduct();
    initTabs();
    initQuoteButton();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 