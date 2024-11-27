// Sample bundle data with actual image URLs
const bundles = [
    {
        id: 1,
        name: "Indoor Soccer Starter Pack",
        description: "Complete indoor soccer equipment set for teams",
        price: "$999",
        image: "images/product-image.png",
        modalImage: "images/hero-image.png",
        items: ["10 Soccer Balls", "2 Portable Hoops", "Training Cones", "Whistle Set"]
    },
    {
        id: 2,
        name: "Soccer Team Bundle",
        description: "Everything needed for a soccer team setup",
        price: "$1299",
        image: "images/product-image.png",
        modalImage: "images/hero-image.png",
        items: ["15 Soccer Balls", "Goal Posts", "Training Vests", "Corner Flags"]
    },
    {
        id: 3,
        name: "Volleyball Set",
        description: "Professional volleyball equipment package",
        price: "$899",
        image: "images/product-image.png",
        modalImage: "images/hero-image.png",
        items: ["8 Volleyballs", "Net System", "Court Lines", "Training Equipment"]
    },
    {
    id: 4,
    name: "Volleyball Set",
    description: "Professional volleyball equipment package",
    price: "$899",
    image: "images/product-image.png",
    modalImage: "images/hero-image.png",
    items: ["8 Volleyballs", "Net System", "Court Lines", "Training Equipment"]
},
{
    id: 5,
    name: "Volleyball Set",
    description: "Professional volleyball equipment package",
    price: "$899",
    image: "images/product-image.png",
    modalImage: "images/hero-image.png",
    items: ["8 Volleyballs", "Net System", "Court Lines", "Training Equipment"]
},
{
    id: 6,
    name: "Volleyball Set",
    description: "Professional volleyball equipment package",
    price: "$899",
    image: "images/product-image.png",
    modalImage: "images/hero-image.png",
    items: ["8 Volleyballs", "Net System", "Court Lines", "Training Equipment"]
},
{
    id: 7,
    name: "Volleyball Set",
    description: "Professional volleyball equipment package",
    price: "$899",
    image: "images/product-image.png",
    modalImage: "images/hero-image.png",
    items: ["8 Volleyballs", "Net System", "Court Lines", "Training Equipment"]
},
{
    id: 8,
    name: "Volleyball Set",
    description: "Professional volleyball equipment package",
    price: "$899",
    image: "images/product-image.png",
    modalImage: "images/hero-image.png",
    items: ["8 Volleyballs", "Net System", "Court Lines", "Training Equipment"]
},
{
    id: 9,
    name: "Volleyball Set",
    description: "Professional volleyball equipment package",
    price: "$899",
    image: "images/product-image.png",
    modalImage: "images/hero-image.png",
    items: ["8 Volleyballs", "Net System", "Court Lines", "Training Equipment"]
},
];

function createBundleCard(bundle) {
    console.log('Creating card for bundle:', bundle.name); // Debug log
    return `
        <div class="bundle-card" data-bundle-id="${bundle.id}">
            <div class="bundle-image">
                <img src="${bundle.image}" alt="${bundle.name} Bundle">
            </div>
            <div class="bundle-content">
                <h3>${bundle.name}</h3>
                <p>${bundle.description}</p>
                <p><strong>${bundle.price}</strong></p>
                <button onclick="showBundleDetails(${JSON.stringify(bundle).replace(/"/g, '&quot;')})">
                    Learn More
                </button>
            </div>
        </div>
    `;
}

// Render bundles
document.addEventListener('DOMContentLoaded', () => {
    console.log('Loading bundles...'); // Log for debugging
    const bundlesGrid = document.getElementById('bundlesGrid');
    bundlesGrid.innerHTML = bundles.map(bundle => createBundleCard(bundle)).join('');

    // Add click event listeners to all bundle cards
    document.querySelectorAll('.bundle-card').forEach(card => {
        card.addEventListener('click', () => {
            const bundleId = card.dataset.bundleId;
            const bundle = bundles.find(b => b.id === parseInt(bundleId));
            if (bundle) {
                showBundleDetails(bundle);
            }
        });
    });
});

// Modal functionality
const modal = document.getElementById('bundleModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const bundleInput = document.getElementById('bundle');

function showBundleDetails(bundle) {
    console.log('Showing modal for bundle:', bundle.name); // Log for debugging
    
    modalContent.innerHTML = `
        <h2>${bundle.name}</h2>
        <div class="bundle-image">
            <img src="${bundle.modalImage}" alt="${bundle.name} Modal View">
        </div>
        <p>${bundle.description}</p>
        <h3>Included Items:</h3>
        <ul style="margin: 1rem 0 2rem 1.5rem;">
            ${bundle.items ? bundle.items.map(item => `<li>${item}</li>`).join('') : '<li>Items list coming soon</li>'}
        </ul>
        <p><strong>${bundle.price}</strong></p>
        <button onclick="selectBundle('${bundle.name}')">Request Quote</button>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    console.log('Closing modal'); // Debug log
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function selectBundle(bundleName) {
    bundleInput.value = bundleName;
    closeModalHandler();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Event listeners for modal closing
closeModal.addEventListener('click', closeModalHandler);

// Close modal when clicking outside
modal.addEventListener('click', (event) => {
    // Check if the click was directly on the modal background (not its children)
    if (event.target === modal) {
        closeModalHandler();
    }
});