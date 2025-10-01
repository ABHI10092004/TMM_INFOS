// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Handle mobile dropdown menus
document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    
    link.addEventListener('click', (e) => {
        // Only handle dropdown on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            
            // Close other dropdowns
            document.querySelectorAll('.nav-item.dropdown').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link:not(.dropdown .nav-link)').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Hero Carousel Functionality (only if carousel exists)
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

if (slides.length > 0 && indicators.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        if (slides[index] && indicators[index]) {
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto-play carousel
    setInterval(nextSlide, 5000);

    // Carousel controls
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Building Calculator Functionality (only if calculator exists)
function calculateMaterials() {
    const calculatorType = document.getElementById('calculator-type');
    const length = document.getElementById('length');
    const width = document.getElementById('width');
    const height = document.getElementById('height');
    const resultsContent = document.getElementById('results-content');

    // Check if calculator elements exist
    if (!calculatorType || !length || !width || !height || !resultsContent) {
        return;
    }

    const calculatorTypeValue = calculatorType.value;
    const lengthValue = parseFloat(length.value);
    const widthValue = parseFloat(width.value);
    const heightValue = parseFloat(height.value);

    if (!calculatorTypeValue || !lengthValue || !widthValue || !heightValue) {
        resultsContent.innerHTML =
            '<p style="color: #e74c3c;">Please fill in all fields to calculate materials.</p>';
        return;
    }

    const area = lengthValue * widthValue;
    const volume = lengthValue * widthValue * heightValue;

    let results = '';

    switch(calculatorTypeValue) {
        case 'concrete':
            const cementConcrete = Math.ceil(volume * 7); // bags
            const sandConcrete = Math.ceil(volume * 0.5); // cubic meters
            const aggregateConcrete = Math.ceil(volume * 0.8); // cubic meters
            const waterConcrete = Math.ceil(volume * 200); // liters
            results = `
                <div class="material-item">
                    <h4>Cement: ${cementConcrete} bags (50kg each)</h4>
                </div>
                <div class="material-item">
                    <h4>Sand: ${sandConcrete} cubic meters</h4>
                </div>
                <div class="material-item">
                    <h4>Aggregate: ${aggregateConcrete} cubic meters</h4>
                </div>
                <div class="material-item">
                    <h4>Water: ${waterConcrete} liters</h4>
                </div>
                <div class="material-item">
                    <h4>Ready Mix Concrete: ${volume.toFixed(2)} cubic meters</h4>
                </div>
            `;
            break;

        case 'bricks':
            const bricksNeeded = Math.ceil(area * 50); // bricks per sq meter (standard size)
            const mortarBricks = Math.ceil(area * 0.03); // cubic meters
            const cementBricks = Math.ceil(mortarBricks * 6); // bags
            const sandBricks = mortarBricks.toFixed(2); // cubic meters
            results = `
                <div class="material-item">
                    <h4>Bricks: ${bricksNeeded} pieces (standard size)</h4>
                </div>
                <div class="material-item">
                    <h4>Cement: ${cementBricks} bags (50kg each)</h4>
                </div>
                <div class="material-item">
                    <h4>Sand: ${sandBricks} cubic meters</h4>
                </div>
                <div class="material-item">
                    <h4>Mortar: ${mortarBricks.toFixed(2)} cubic meters</h4>
                </div>
            `;
            break;

        case 'concrete-blocks':
            const blocks = Math.ceil(area * 12.5); // blocks per sq meter
            const mortarBlocks = Math.ceil(area * 0.025); // cubic meters
            const cementBlocks = Math.ceil(mortarBlocks * 8); // bags
            const sandBlocks = mortarBlocks.toFixed(2); // cubic meters
            results = `
                <div class="material-item">
                    <h4>Concrete Blocks: ${blocks} pieces</h4>
                </div>
                <div class="material-item">
                    <h4>Cement: ${cementBlocks} bags (50kg each)</h4>
                </div>
                <div class="material-item">
                    <h4>Sand: ${sandBlocks} cubic meters</h4>
                </div>
                <div class="material-item">
                    <h4>Mortar: ${mortarBlocks.toFixed(2)} cubic meters</h4>
                </div>
            `;
            break;

        case 'flooring':
            const cementFloor = Math.ceil(area * 1.5); // bags
            const sandFloor = Math.ceil(area * 0.08); // cubic meters
            const aggregateFloor = Math.ceil(area * 0.12); // cubic meters
            const tiles = Math.ceil(area * 1.1); // sq meters (10% extra for wastage)
            results = `
                <div class="material-item">
                    <h4>Cement: ${cementFloor} bags (50kg each)</h4>
                </div>
                <div class="material-item">
                    <h4>Sand: ${sandFloor} cubic meters</h4>
                </div>
                <div class="material-item">
                    <h4>Aggregate: ${aggregateFloor} cubic meters</h4>
                </div>
                <div class="material-item">
                    <h4>Tiles/Flooring Material: ${tiles} sq meters</h4>
                </div>
                <div class="material-item">
                    <h4>Concrete for Base: ${(area * 0.1).toFixed(2)} cubic meters</h4>
                </div>
            `;
            break;

        case 'soil-excavation':
            const excavationVolume = volume;
            const soilToRemove = Math.ceil(volume * 1.3); // 30% extra for loose soil
            const backfillSoil = Math.ceil(volume * 0.7); // assuming 70% backfill
            const laborDays = Math.ceil(volume * 0.5); // labor days
            results = `
                <div class="material-item">
                    <h4>Excavation Volume: ${excavationVolume.toFixed(2)} cubic meters</h4>
                </div>
                <div class="material-item">
                    <h4>Soil to Remove: ${soilToRemove} cubic meters</h4>
                </div>
                <div class="material-item">
                    <h4>Backfill Required: ${backfillSoil} cubic meters</h4>
                </div>
                <div class="material-item">
                    <h4>Estimated Labor: ${laborDays} person-days</h4>
                </div>
                <div class="material-item">
                    <h4>Truck Loads: ${Math.ceil(soilToRemove / 10)} (10 cubic meter trucks)</h4>
                </div>
            `;
            break;

        case 'steel':
            const steelFoundation = Math.ceil(volume * 80); // kg per cubic meter
            const steelColumns = Math.ceil(area * 15); // kg per sq meter
            const steelBeams = Math.ceil(area * 12); // kg per sq meter
            const totalSteel = steelFoundation + steelColumns + steelBeams;
            const steelBars = Math.ceil(totalSteel / 12); // assuming 12mm bars
            results = `
                <div class="material-item">
                    <h4>Foundation Steel: ${steelFoundation} kg</h4>
                </div>
                <div class="material-item">
                    <h4>Column Steel: ${steelColumns} kg</h4>
                </div>
                <div class="material-item">
                    <h4>Beam Steel: ${steelBeams} kg</h4>
                </div>
                <div class="material-item">
                    <h4>Total Steel Required: ${totalSteel} kg</h4>
                </div>
                <div class="material-item">
                    <h4>Steel Bars (12mm): ${steelBars} pieces (12m length)</h4>
                </div>
            `;
            break;
    }

    resultsContent.innerHTML = results;
}

// Contact Form Submission (GitHub Pages Compatible)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn');
        const formMessage = document.getElementById('form-message');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject') || 'Contact Form Submission';
        const message = formData.get('message');

        // Create email body
        let emailBody = `Name: ${name}\n`;
        emailBody += `Email: ${email}\n`;
        emailBody += `Phone: ${phone}\n`;
        emailBody += `Subject: ${subject}\n\n`;

        // Add product-specific fields if they exist
        if (formData.get('block_type')) {
            emailBody += `Block Type: ${formData.get('block_type')}\n`;
        }
        if (formData.get('concrete_grade')) {
            emailBody += `Concrete Grade: ${formData.get('concrete_grade')}\n`;
        }
        if (formData.get('quantity')) {
            emailBody += `Quantity: ${formData.get('quantity')}\n`;
        }
        if (formData.get('delivery_location')) {
            emailBody += `Delivery Location: ${formData.get('delivery_location')}\n`;
        }
        if (formData.get('delivery_datetime')) {
            emailBody += `Delivery Date & Time: ${formData.get('delivery_datetime')}\n`;
        }

        emailBody += `\nMessage:\n${message}`;

        // Create mailto link
        const mailtoLink = `mailto:nani1113256j@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        if (formMessage) {
            formMessage.style.display = 'block';
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Your email client will open. Please send the email to complete your inquiry.';
            setTimeout(() => formMessage.style.display = 'none', 8000);
        }

        // Reset form
        this.reset();

        // Restore button
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Add scroll animations to elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .service-card, .feature-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
window.addEventListener('scroll', animateOnScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add hover effects to CTA buttons
document.querySelectorAll('.cta-button, .product-btn, .calculate-btn, .submit-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section (only if hero carousel exists)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-carousel');

    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add typing effect to hero titles
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load (only if hero title exists)
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.carousel-slide.active .slide-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Add number counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + 
                                 (element.textContent.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + 
                                 (element.textContent.includes('%') ? '%' : '');
        }
    }
    
    updateCounter();
}

// Initialize counter animation when stats section is visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize counter animation only if stats section exists
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    observer.observe(statsSection);
}
