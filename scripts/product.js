// Import products data and cart module
import { products } from './products.js';
import * as cartModule from './cart.js';

// Logging for debugging
console.log('Product script initialized');

// Get product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Log the product ID
console.log('Product ID from URL:', productId);

// Find the product
const product = products.find(p => p.id === productId);

// Log the found product
console.log('Found product:', product);

if (!product) {
    console.error('Product not found');
    window.location.href = 'store.html';
}

// Update page content
document.title = `${product.name} - Penalty Sports`;
document.getElementById('product-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
document.getElementById('product-category').href = `store.html?category=${product.category}`;
document.getElementById('product-name').textContent = product.name;
document.getElementById('product-title').textContent = product.name;
document.getElementById('product-description').textContent = product.description;
document.getElementById('main-product-image').src = product.image;
document.getElementById('main-product-image').alt = product.name;

// Handle variants if they exist
const variantsSection = document.getElementById('variants-section');
let selectedVariant = null;

if (product.variants && product.variants.length > 0) {
    variantsSection.parentElement.style.display = 'block';
    product.variants.forEach((variant, index) => {
        const variantBtn = document.createElement('button');
        variantBtn.className = 'btn btn-outline-dark';
        variantBtn.textContent = `${variant.size} - ${variant.color}`;
        variantBtn.onclick = () => {
            // Update selected variant
            selectedVariant = variant;
            // Update UI
            variantsSection.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
            variantBtn.classList.add('active');
        };
        variantsSection.appendChild(variantBtn);
    });
    // Select first variant by default
    variantsSection.querySelector('.btn').click();
} else {
    variantsSection.parentElement.style.display = 'none';
}

// Handle add to quote button
const addToQuoteBtn = document.getElementById('add-to-quote');
addToQuoteBtn.addEventListener('click', () => {
    console.log('Adding product to cart:', product.name);
    
    // Add to cart with selected variant
    cartModule.addToCart(product, 1, selectedVariant);
    
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
            ${product.name} added to quote basket
        </div>
    `;
    document.body.appendChild(toast.element);
    toast.show();
    
    // Remove toast after it's hidden
    toast.element.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toast.element);
    });
});

// Load related products
const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

// Display related products
const relatedProductsContainer = document.getElementById('related-products');
relatedProducts.forEach(relatedProduct => {
    const productCard = document.createElement('div');
    productCard.className = 'col-md-4';
    productCard.innerHTML = `
        <div class="card h-100">
            <img src="${relatedProduct.image}" class="card-img-top" alt="${relatedProduct.name}">
            <div class="card-body">
                <h5 class="card-title">${relatedProduct.name}</h5>
                <p class="card-text">${relatedProduct.description}</p>
            </div>
            <div class="card-footer bg-transparent border-top-0">
                <a href="product.html?id=${relatedProduct.id}" class="btn btn-dark w-100">View Details</a>
            </div>
        </div>
    `;
    relatedProductsContainer.appendChild(productCard);
}); 