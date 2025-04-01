// Form handler with Formspree integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    // Set the form action to your Formspree endpoint
    contactForm.setAttribute('action', 'https://formspree.io/f/your_formspree_id');
    contactForm.setAttribute('method', 'POST');

    // Add name attributes to form elements if they don't have them
    const nameInput = contactForm.querySelector('input[placeholder="Name*"]');
    const emailInput = contactForm.querySelector('input[placeholder="Email*"]');
    const subjectInput = contactForm.querySelector('input[placeholder="Subject*"]');
    const messageInput = contactForm.querySelector('textarea');

    if (!nameInput.getAttribute('name')) nameInput.setAttribute('name', 'name');
    if (!emailInput.getAttribute('name')) emailInput.setAttribute('name', 'email');
    if (!subjectInput.getAttribute('name')) subjectInput.setAttribute('name', 'subject');
    if (!messageInput.getAttribute('name')) messageInput.setAttribute('name', 'message');

    // Add form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all required fields', false);
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', false);
            return;
        }

        // Show sending state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send form data to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                showMessage('Thank you! Your message has been sent successfully.', true);
                contactForm.reset();
            })
            .catch(error => {
                showMessage('Oops! There was a problem sending your message.', false);
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });

    function showMessage(text, isSuccess) {
        // Create or get message element
        let messageEl = document.querySelector('.form-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            contactForm.appendChild(messageEl);
        }

        // Set message styling
        messageEl.textContent = text;
        messageEl.className = 'form-message ' + (isSuccess ? 'success' : 'error');

        // Style the message
        messageEl.style.padding = '10px 15px';
        messageEl.style.marginTop = '15px';
        messageEl.style.borderRadius = '4px';
        messageEl.style.backgroundColor = isSuccess ? '#d4edda' : '#f8d7da';
        messageEl.style.color = isSuccess ? '#155724' : '#721c24';
        messageEl.style.border = isSuccess ? '1px solid #c3e6cb' : '1px solid #f5c6cb';

        // Auto-hide after 5 seconds
        setTimeout(function() {
            messageEl.style.display = 'none';
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});