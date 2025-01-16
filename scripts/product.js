// Import products data
import { products } from './products.js';

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

// Populate variants
const variantsSection = document.getElementById('variants-section');
if (product.variants && product.variants.length > 0) {
    product.variants.forEach(variant => {
        const variantBtn = document.createElement('button');
        variantBtn.className = 'btn btn-outline-secondary';
        variantBtn.textContent = `${variant.color} - Size ${variant.size}`;
        variantsSection.appendChild(variantBtn);
    });
}

// Populate features
const featuresList = document.getElementById('product-features');
product.features.forEach(feature => {
    const li = document.createElement('li');
    li.className = 'mb-2';
    li.innerHTML = `<i class="bi bi-check2-circle text-success me-2"></i>${feature}`;
    featuresList.appendChild(li);
});

// Populate details
const detailsList = document.getElementById('product-details');
product.details.forEach(detail => {
    const li = document.createElement('li');
    li.className = 'mb-2';
    li.innerHTML = `<i class="bi bi-info-circle text-primary me-2"></i>${detail}`;
    detailsList.appendChild(li);
});

// Handle quote button
const addToQuoteBtn = document.getElementById('add-to-quote');
const quoteModal = new bootstrap.Modal(document.getElementById('quoteModal'));

addToQuoteBtn.addEventListener('click', () => {
    console.log('Opening quote modal for product:', product.name);
    document.getElementById('quoteProduct').value = product.name;
    quoteModal.show();
});

// Handle quote form submission
document.getElementById('quoteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Quote form submitted');
    
    // Get form data
    const formData = {
        name: document.getElementById('quoteName').value,
        email: document.getElementById('quoteEmail').value,
        phone: document.getElementById('quotePhone').value,
        product: document.getElementById('quoteProduct').value,
        quantity: document.getElementById('quoteQuantity').value,
        message: document.getElementById('quoteMessage').value
    };
    
    // Log the form data
    console.log('Quote form data:', formData);
    
    // Here you would typically send this data to your server
    // For now, we'll just show a success message
    alert('Thank you for your quote request. We will contact you soon!');
    quoteModal.hide();
});

// Load related products
const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3); // Show up to 3 related products

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
                <a href="product.html?id=${relatedProduct.id}" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `;
    relatedProductsContainer.appendChild(productCard);
}); 