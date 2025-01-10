// Import products data
import { products } from './products.js';

// DOM Elements
const mainImage = document.getElementById('main-product-image');
const thumbnailStrip = document.getElementById('thumbnail-strip');
const productTitle = document.getElementById('product-title');
const productDescription = document.getElementById('product-description');
const productFeatures = document.getElementById('product-features');
const productDetails = document.getElementById('product-details');
const variantsSection = document.getElementById('variants-section');
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
    productCategory.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    productName.textContent = product.name;

    // Update product details
    productTitle.textContent = product.name;
    productDescription.textContent = product.description;
    mainImage.src = product.image;
    mainImage.alt = product.name;

    // Load features
    loadFeatures(product.features);

    // Load details
    loadDetails(product.details);

    // Load variants
    loadVariants(product.variants);

    // Load related products
    loadRelatedProducts(product.category);
}

// Load product features
function loadFeatures(features) {
    console.log('Loading features:', features);
    if (productFeatures) {
        productFeatures.innerHTML = features
            .map(feature => `<li class="feature-item"><span class="feature-bullet">•</span>${feature}</li>`)
            .join('');
    }
}

// Load product details
function loadDetails(details) {
    console.log('Loading details:', details);
    if (productDetails) {
        productDetails.innerHTML = details
            .map(detail => `<li class="detail-item"><span class="detail-bullet">•</span>${detail}</li>`)
            .join('');
    }
}

// Load product variants
function loadVariants(variants) {
    console.log('Loading variants:', variants);
    if (variantsSection) {
        const variantGroups = groupVariants(variants);
        
        // Create color selection
        const colorHTML = `
            <div class="variant-colors">
                <h3>Colors</h3>
                <div class="color-options">
                    ${Object.keys(variantGroups).map(color => `
                        <button class="color-option" data-color="${color}">
                            ${color}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Create size selection
        const sizeHTML = `
            <div class="variant-sizes">
                <h3>Sizes</h3>
                <div class="size-options">
                    ${[...new Set(variants.map(v => v.size))].map(size => `
                        <button class="size-option" data-size="${size}">
                            ${size}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        variantsSection.innerHTML = colorHTML + sizeHTML;

        // Add event listeners
        initVariantSelectors();
    }
}

// Group variants by color
function groupVariants(variants) {
    return variants.reduce((groups, variant) => {
        if (!groups[variant.color]) {
            groups[variant.color] = [];
        }
        groups[variant.color].push(variant);
        return groups;
    }, {});
}

// Initialize variant selectors
function initVariantSelectors() {
    const colorButtons = document.querySelectorAll('.color-option');
    const sizeButtons = document.querySelectorAll('.size-option');

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
            console.log('Selected color:', button.dataset.color);
        });
    });

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
            console.log('Selected size:', button.dataset.size);
        });
    });
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
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <a href="product.html?id=${product.id}" class="view-product-btn">View Product</a>
                </div>
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
    const addToQuoteBtn = document.getElementById('add-to-quote');
    if (addToQuoteBtn) {
        addToQuoteBtn.addEventListener('click', () => {
            // Get selected variants
            const selectedColor = document.querySelector('.color-option.selected')?.dataset.color;
            const selectedSize = document.querySelector('.size-option.selected')?.dataset.size;

            if (!selectedColor || !selectedSize) {
                alert('Please select both color and size before requesting a quote');
                return;
            }

            console.log('Adding to quote:', {
                productId,
                color: selectedColor,
                size: selectedSize
            });
            
            alert('Product added to quote basket!');
        });
    }
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