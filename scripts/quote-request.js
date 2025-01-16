// Import cart module
import * as cartModule from './cart.js';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Quote request page initialized');
    displayCartItems();
});

// Display cart items in the quote form
function displayCartItems() {
    const quoteItems = document.getElementById('quote-items');
    const cart = cartModule.getCart();

    if (!cart.items.length) {
        // Redirect to store if cart is empty
        window.location.href = 'store.html';
        return;
    }

    quoteItems.innerHTML = `
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Variant</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.items.map(item => `
                        <tr>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="${item.image}" alt="${item.name}" 
                                         style="width: 50px; height: 50px; object-fit: cover;" 
                                         class="me-3">
                                    <span>${item.name}</span>
                                </div>
                            </td>
                            <td>
                                ${item.variant ? `
                                    Size: ${item.variant.size}<br>
                                    Color: ${item.variant.color}
                                ` : 'N/A'}
                            </td>
                            <td>${item.quantity}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Handle form submission
window.handleQuoteSubmit = async (event) => {
    event.preventDefault();
    console.log('Processing quote request submission');

    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value,
        cart: cartModule.getCart()
    };

    console.log('Quote request data:', formData);

    try {
        // Here you would typically send this data to your server
        // For now, we'll simulate a successful submission
        await simulateSubmission(formData);

        // Show success message
        showSubmissionResult(true, "Quote request submitted successfully! We'll contact you soon.");
        
        // Clear cart after successful submission
        cartModule.clearCart();
        
        // Redirect to store after a delay
        setTimeout(() => {
            window.location.href = 'store.html';
        }, 3000);

    } catch (error) {
        console.error('Error submitting quote:', error);
        showSubmissionResult(false, "There was an error submitting your quote request. Please try again.");
    }
};

// Simulate server submission
function simulateSubmission(data) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            // Log the data that would be sent to the server
            console.log('Quote request would be sent to server:', data);
            resolve();
        }, 1500);
    });
}

// Show submission result message
function showSubmissionResult(success, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${success ? 'success' : 'danger'} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert alert before the form
    const form = document.getElementById('quoteForm');
    form.parentNode.insertBefore(alertDiv, form);

    // Disable form
    if (success) {
        form.querySelectorAll('input, textarea, button').forEach(element => {
            element.disabled = true;
        });
    }
} 