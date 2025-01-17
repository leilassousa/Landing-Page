// Cart Management System
console.log('Cart system initialized');

// Cart data structure in localStorage
const CART_STORAGE_KEY = 'penaltyCartItems';

// Initialize cart from localStorage or create empty cart
function initializeCart() {
    const existingCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!existingCart) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: [] }));
    }
    console.log('Cart initialized:', getCart());
    
    // Add modal event listener
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', () => {
            console.log('Cart modal opening, updating UI');
            updateCartUI();
        });
    }
}

// Get cart data
export function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return JSON.parse(cart);
}

// Add item to cart
export function addToCart(product, quantity = 1, variant = null) {
    console.log('Adding to cart:', { product, quantity, variant });
    const cart = getCart();
    
    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(item => 
        item.productId === product.id && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        // Add new item
        cart.items.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            variant: variant
        });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
    console.log('Updated cart:', getCart());
}

// Remove item from cart
export function removeFromCart(productId, variant = null) {
    console.log('Removing from cart:', { productId, variant });
    const cart = getCart();
    
    cart.items = cart.items.filter(item => 
        !(item.productId === productId && 
          JSON.stringify(item.variant) === JSON.stringify(variant))
    );
    
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
    console.log('Updated cart:', getCart());
}

// Update item quantity
export function updateQuantity(productId, quantity, variant = null) {
    console.log('Updating quantity:', { productId, quantity, variant });
    const cart = getCart();
    
    const item = cart.items.find(item => 
        item.productId === productId && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
    );
    
    if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
            removeFromCart(productId, variant);
            return;
        }
    }
    
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
}

// Clear cart
export function clearCart() {
    console.log('Clearing cart');
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: [] }));
    updateCartUI();
}

// Get cart item count
export function getCartItemCount() {
    const cart = getCart();
    return cart.items.reduce((total, item) => total + item.quantity, 0);
}

// Update cart UI elements
function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    
    if (cartCountElement) {
        const itemCount = getCartItemCount();
        cartCountElement.textContent = itemCount;
        cartCountElement.style.display = itemCount > 0 ? 'block' : 'none';
    }
    
    if (cartItemsElement) {
        renderCartItems(cartItemsElement);
    }
}

// Render cart items in modal
function renderCartItems(container) {
    const cart = getCart();
    
    if (cart.items.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-cart text-muted" style="font-size: 2rem;"></i>
                <p class="mt-2 mb-0">Your cart is empty</p>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.items.map(item => `
        <div class="cart-item d-flex align-items-center p-2 border-bottom">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="flex-grow-1">
                <h6 class="mb-0">${item.name}</h6>
                ${item.variant ? `
                    <small class="text-muted">
                        Size: ${item.variant.size}, Color: ${item.variant.color}
                    </small>
                ` : ''}
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary me-2 decrease-quantity" 
                        data-product-id="${item.productId}"
                        data-variant='${JSON.stringify(item.variant)}'>
                    -
                </button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary ms-2 increase-quantity"
                        data-product-id="${item.productId}"
                        data-variant='${JSON.stringify(item.variant)}'>
                    +
                </button>
                <button class="btn btn-sm btn-link text-danger ms-3 remove-item"
                        data-product-id="${item.productId}"
                        data-variant='${JSON.stringify(item.variant)}'>
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners to buttons
    container.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.productId);
            const variant = JSON.parse(button.dataset.variant);
            const item = cart.items.find(i => i.productId === productId && 
                JSON.stringify(i.variant) === JSON.stringify(variant));
            if (item) {
                updateQuantity(productId, item.quantity - 1, variant);
            }
        });
    });

    container.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.productId);
            const variant = JSON.parse(button.dataset.variant);
            const item = cart.items.find(i => i.productId === productId && 
                JSON.stringify(i.variant) === JSON.stringify(variant));
            if (item) {
                updateQuantity(productId, item.quantity + 1, variant);
            }
        });
    });

    container.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.productId);
            const variant = JSON.parse(button.dataset.variant);
            removeFromCart(productId, variant);
        });
    });
}

// Initialize cart when module loads
initializeCart();

// Export functions to window for event handlers
window.cartModule = {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
}; 