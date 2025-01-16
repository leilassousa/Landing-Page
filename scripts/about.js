// Technology image paths
const techImages = {
    balls: [
        'images/our_technologies/balls/image1.jpg',
        'images/technologies/balls/tech2.jpg',
        'images/technologies/balls/tech3.jpg'
    ],
    shoes: [
        'images/technologies/shoes/tech1.jpg',
        'images/technologies/shoes/tech2.jpg',
        'images/technologies/shoes/tech3.jpg'
    ],
    materials: [
        'images/technologies/materials/tech1.jpg',
        'images/technologies/materials/tech2.jpg',
        'images/technologies/materials/tech3.jpg'
    ]
};

// Technology titles
const techTitles = {
    balls: 'Termotec Ball Technology',
    shoes: 'Grip Control System',
    materials: 'Smart Materials Technology'
};

// DOM Elements
const modal = document.getElementById('techModal');
const modalTitle = document.getElementById('modalTitle');
const carouselContainer = document.getElementById('carouselContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.getElementById('carouselIndicators');
const closeBtn = document.querySelector('.close-modal');

let currentTech = '';
let currentSlide = 0;

// Initialize event listeners
function init() {
    // Add click listeners to tech cards
    document.querySelectorAll('.tech-details-btn').forEach(btn => {
        btn.addEventListener('click', () => openTechModal(btn.dataset.tech));
    });

    // Modal close button
    closeBtn.addEventListener('click', closeTechModal);

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeTechModal();
    });

    // Carousel controls
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.style.display === 'block') return;
        
        if (e.key === 'Escape') closeTechModal();
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
    });
}

// Open modal with technology details
function openTechModal(tech) {
    currentTech = tech;
    currentSlide = 0;
    
    // Update modal title
    modalTitle.textContent = techTitles[tech];
    
    // Load images
    loadCarouselImages(tech);
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeTechModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    carouselContainer.innerHTML = '';
    indicators.innerHTML = '';
}

// Load carousel images
function loadCarouselImages(tech) {
    const images = techImages[tech];
    
    // Clear existing content
    carouselContainer.innerHTML = '';
    indicators.innerHTML = '';
    
    // Add images
    images.forEach((src, index) => {
        // Create image element
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${techTitles[tech]} - Image ${index + 1}`;
        img.className = index === 0 ? 'active' : '';
        carouselContainer.appendChild(img);
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = `indicator${index === 0 ? ' active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });
}

// Change slide
function changeSlide(direction) {
    const images = carouselContainer.querySelectorAll('img');
    const dots = indicators.querySelectorAll('.indicator');
    
    // Remove active class
    images[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide = (currentSlide + direction + images.length) % images.length;
    
    // Add active class to new slide
    images[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Go to specific slide
function goToSlide(index) {
    const images = carouselContainer.querySelectorAll('img');
    const dots = indicators.querySelectorAll('.indicator');
    
    // Remove active class from current
    images[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Update current slide
    currentSlide = index;
    
    // Add active class to new slide
    images[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 