document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelector('.carousel-indicators');
    let currentSlide = 0;

    // Create indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('indicator');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(dot);
    });

    const indicatorDots = document.querySelectorAll('.indicator');

    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        indicatorDots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        indicatorDots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Initialize first slide
    updateSlides();

    // Log for debugging
    console.log('Carousel initialized with ' + slides.length + ' slides');
}); 