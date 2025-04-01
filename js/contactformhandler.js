// Simple form handler script
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const nameInput = contactForm.querySelector('input[placeholder="Name*"]');
        const emailInput = contactForm.querySelector('input[placeholder="Email*"]');
        const subjectInput = contactForm.querySelector('input[placeholder="Subject*"]');
        const messageInput = contactForm.querySelector('textarea');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        // Validate inputs
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all required fields', false);
            return;
        }

        // Simple email validation
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', false);
            return;
        }

        // In a real application, you would send this data to a server
        // For demo purposes, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, subject, message });

        // Simulate sending to backend (you'd replace this with actual AJAX or fetch)
        simulateSendingEmail(name, email, subject, message);
    });

    function simulateSendingEmail(name, email, subject, message) {
        // Show "sending" message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate network delay (remove this in production)
        setTimeout(function() {
            // Show success message
            showMessage('Thank you! Your message has been sent successfully.', true);

            // Reset form
            contactForm.reset();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

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