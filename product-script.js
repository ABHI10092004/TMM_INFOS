// Product Page Specific JavaScript

// Ensure dropdown navigation works on product pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });
});

// Smooth scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Quote form submission
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.querySelector('.quote-form form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[placeholder="Your Name"]').value;
            const email = this.querySelector('input[placeholder="Your Email"]').value;
            const phone = this.querySelector('input[placeholder="Phone Number"]').value;
            const quantity = this.querySelector('input[placeholder="Quantity (Cubic Meters)"]').value;
            const location = this.querySelector('input[placeholder="Delivery Location"]').value;
            const requirements = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !phone || !quantity || !location) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Quantity validation
            if (quantity <= 0) {
                alert('Please enter a valid quantity.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Quote Request...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your quote request! We will contact you within 24 hours with pricing and availability.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Image overlay click handler
document.addEventListener('DOMContentLoaded', function() {
    const imageOverlay = document.querySelector('.image-overlay');
    if (imageOverlay) {
        imageOverlay.addEventListener('click', function() {
            // You can add functionality here to show a video or more images
            alert('Manufacturing process video coming soon!');
        });
    }
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressBarElement = document.querySelector('.scroll-progress-bar');
        if (progressBarElement) {
            progressBarElement.style.width = scrollPercent + '%';
        }
    });
}

// Add scroll progress styles
const progressStyles = `
.scroll-progress {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(230, 126, 34, 0.1);
    z-index: 999;
}

.scroll-progress-bar {
    height: 100%;
    background: linear-gradient(45deg, #e67e22, #f39c12);
    width: 0%;
    transition: width 0.1s ease;
}
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = progressStyles;
document.head.appendChild(styleSheet);

// Initialize scroll progress
addScrollProgress();

// Add floating action button for quick quote
function addFloatingQuoteButton() {
    const floatingBtn = document.createElement('div');
    floatingBtn.className = 'floating-quote-btn';
    floatingBtn.innerHTML = '<i class="fas fa-calculator"></i>';
    floatingBtn.title = 'Quick Quote';
    document.body.appendChild(floatingBtn);
    
    floatingBtn.addEventListener('click', function() {
        scrollToSection('contact-product');
    });
}

// Add floating button styles
const floatingStyles = `
.floating-quote-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, #e67e22, #f39c12);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(230, 126, 34, 0.4);
    transition: all 0.3s ease;
    z-index: 998;
}

.floating-quote-btn:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 8px 30px rgba(230, 126, 34, 0.6);
}

@media (max-width: 768px) {
    .floating-quote-btn {
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
    }
}
`;

// Add floating button styles to head
const floatingStyleSheet = document.createElement('style');
floatingStyleSheet.textContent = floatingStyles;
document.head.appendChild(floatingStyleSheet);

// Initialize floating button
addFloatingQuoteButton();

// Add section highlighting on scroll
function highlightSectionOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize section highlighting
highlightSectionOnScroll();

// Add copy to clipboard functionality for contact details
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast('Copied to clipboard: ' + text);
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Copied to clipboard: ' + text);
            }
        });
        
        // Add cursor pointer style
        item.style.cursor = 'pointer';
        item.title = 'Click to copy';
    });
});

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Toast styles
const toastStyles = `
.toast-notification {
    position: fixed;
    bottom: 100px;
    right: 30px;
    background: #2c3e50;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transform: translateX(400px);
    transition: transform 0.3s ease;
    z-index: 1000;
    max-width: 300px;
}

.toast-notification.show {
    transform: translateX(0);
}

@media (max-width: 768px) {
    .toast-notification {
        right: 20px;
        left: 20px;
        max-width: none;
    }
}
`;

// Add toast styles to head
const toastStyleSheet = document.createElement('style');
toastStyleSheet.textContent = toastStyles;
document.head.appendChild(toastStyleSheet);

// Add print functionality
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Specifications';
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    const specsSection = document.querySelector('.specifications-section .container');
    if (specsSection) {
        specsSection.appendChild(printBtn);
    }
}

// Print button styles
const printStyles = `
.print-btn {
    background: linear-gradient(45deg, #e67e22, #f39c12);
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
    margin-right: auto;
}

.print-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(230, 126, 34, 0.4);
}

@media print {
    .navbar, .footer, .floating-quote-btn, .print-btn, .scroll-progress {
        display: none !important;
    }
    
    .product-hero {
        margin-top: 0;
        height: auto;
        padding: 50px 0;
    }
    
    .product-hero-bg::before {
        background: rgba(44, 62, 80, 0.3);
    }
}
`;

// Add print styles to head
const printStyleSheet = document.createElement('style');
printStyleSheet.textContent = printStyles;
document.head.appendChild(printStyleSheet);

// Initialize print button
addPrintButton();
