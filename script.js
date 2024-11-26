// Sample bundle data
const bundles = [
    {
        id: 1,
        name: "Soccer Team Starter",
        description: "Complete soccer equipment set for teams",
        items: ["10 Soccer Balls", "20 Training Bibs", "30 Cones"],
        price: "Contact for pricing"
    },
    {
        id: 2,
        name: "Basketball Elite Pack",
        description: "Professional basketball equipment bundle",
        items: ["8 Basketballs", "2 Portable Hoops", "Training Kit"],
        price: "Contact for pricing"
    },
    {
        id: 3,
        name: "Volleyball Set Pro",
        description: "Competition-grade volleyball equipment",
        items: ["6 Volleyballs", "Net System", "Court Lines"],
        price: "Contact for pricing"
    },
    {
        id: 4,
        name: "Track & Field Basic",
        description: "Essential track and field equipment",
        items: ["Hurdles Set", "Starting Blocks", "Training Tools"],
        price: "Contact for pricing"
    },
    {
        id: 5,
        name: "Tennis Court Package",
        description: "Complete tennis training equipment",
        items: ["12 Tennis Rackets", "Training Balls", "Net System"],
        price: "Contact for pricing"
    },
    {
        id: 6,
        name: "Baseball Team Kit",
        description: "Comprehensive baseball equipment set",
        items: ["Bats Set", "Training Balls", "Protective Gear"],
        price: "Contact for pricing"
    },
    {
        id: 7,
        name: "Fitness Studio Pack",
        description: "Group fitness equipment bundle",
        items: ["Yoga Mats", "Resistance Bands", "Exercise Balls"],
        price: "Contact for pricing"
    },
    {
        id: 8,
        name: "Rugby Team Essential",
        description: "Complete rugby training equipment",
        items: ["8 Rugby Balls", "Training Gear", "Field Markers"],
        price: "Contact for pricing"
    },
    {
        id: 9,
        name: "Multi-Sport Package",
        description: "Variety of equipment for multiple sports",
        items: ["Various Balls", "Training Equipment", "Storage Solution"],
        price: "Contact for pricing"
    }
];

// Populate bundles grid
const bundlesGrid = document.getElementById('bundlesGrid');
bundles.forEach(bundle => {
    const card = document.createElement('div');
    card.className = 'bundle-card';
    card.innerHTML = `
        <div class="bundle-image"></div>
        <div class="bundle-content">
            <h3>${bundle.name}</h3>
            <p>${bundle.description}</p>
        </div>
    `;
    card.addEventListener('click', () => showBundleDetails(bundle));
    bundlesGrid.appendChild(card);
});

// Modal functionality
const modal = document.getElementById('bundleModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const bundleInput = document.getElementById('bundle');

function showBundleDetails(bundle) {
    modalContent.innerHTML = `
        <h2>${bundle.name}</h2>
        <div class="bundle-image" style="margin: 1rem 0;"></div>
        <p>${bundle.description}</p>
        <h3>Included Items:</h3>
        <ul style="margin: 1rem 0 2rem 1.5rem;">
            ${bundle.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <p><strong>${bundle.price}</strong></p>
        <button onclick="selectBundle('${bundle.name}')">Request Quote</button>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function selectBundle(bundleName) {
    bundleInput.value = bundleName;
    closeModalHandler();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

closeModal.addEventListener