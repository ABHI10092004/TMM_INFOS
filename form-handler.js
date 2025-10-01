// GitHub Pages Compatible Form Handler
// This uses EmailJS service to send emails directly from the browser

// Initialize EmailJS (you'll need to sign up at emailjs.com and get your keys)
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Alternative form handler using Formspree
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const formMessage = document.getElementById('form-message');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Hide any previous messages
    if (formMessage) {
        formMessage.style.display = 'none';
    }
    
    // Method 1: Using Formspree (recommended for GitHub Pages)
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showMessage('Thank you for your message! We will get back to you soon.', 'success');
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    showMessage(data["errors"].map(error => error["message"]).join(", "), 'error');
                } else {
                    showMessage('Oops! There was a problem submitting your form', 'error');
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('An error occurred. Please try again later.', 'error');
    })
    .finally(() => {
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
    
    function showMessage(message, type) {
        if (formMessage) {
            formMessage.style.display = 'block';
            formMessage.className = 'form-message ' + type;
            formMessage.textContent = message;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Method 2: Using EmailJS (alternative)
function sendEmailWithEmailJS(formData) {
    const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_email: 'nani1113256j@gmail.com'
    };
    
    // Add product-specific fields if they exist
    if (formData.get('block_type')) {
        templateParams.block_type = formData.get('block_type');
    }
    if (formData.get('concrete_grade')) {
        templateParams.concrete_grade = formData.get('concrete_grade');
    }
    if (formData.get('quantity')) {
        templateParams.quantity = formData.get('quantity');
    }
    if (formData.get('delivery_location')) {
        templateParams.delivery_location = formData.get('delivery_location');
    }
    if (formData.get('delivery_datetime')) {
        templateParams.delivery_datetime = formData.get('delivery_datetime');
    }
    
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
}

// Method 3: Using Netlify Forms (if hosting on Netlify)
function setupNetlifyForms() {
    // Add netlify attribute to forms
    const forms = document.querySelectorAll('#contactForm');
    forms.forEach(form => {
        form.setAttribute('netlify', '');
        form.setAttribute('netlify-honeypot', 'bot-field');
        
        // Add hidden bot field
        const botField = document.createElement('input');
        botField.type = 'hidden';
        botField.name = 'bot-field';
        form.appendChild(botField);
        
        // Add form name
        const formName = document.createElement('input');
        formName.type = 'hidden';
        formName.name = 'form-name';
        formName.value = 'contact';
        form.appendChild(formName);
    });
}

// Export functions for use in other scripts
window.handleFormSubmission = handleFormSubmission;
window.sendEmailWithEmailJS = sendEmailWithEmailJS;
window.setupNetlifyForms = setupNetlifyForms;
