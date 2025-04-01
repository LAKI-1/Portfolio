// Submit form to Google Sheets
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'; // Replace with your deployed script URL

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[placeholder="Name*"]').value.trim();
        const email = contactForm.querySelector('input[placeholder="Email*"]').value.trim();
        const subject = contactForm.querySelector('input[placeholder="Subject*"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        // Validate inputs
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all required fields', false);
            return;
        }

        // Prepare data
        const data = {
            name,
            email,
            subject,
            message
        };

        // Show sending state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send data to Google Apps Script
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage('Form submitted and saved to Google Sheets!', true);
                    contactForm.reset();
                } else {
                    showMessage(data.message || 'Error saving submission', false);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Failed to save submission. Please try again.', false);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });

    function showMessage(text, isSuccess) {
        let messageEl = document.querySelector('.form-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            contactForm.appendChild(messageEl);
        }

        messageEl.textContent = text;
        messageEl.className = 'form-message ' + (isSuccess ? 'success' : 'error');
        messageEl.style.padding = '10px 15px';
        messageEl.style.marginTop = '15px';
        messageEl.style.borderRadius = '4px';
        messageEl.style.backgroundColor = isSuccess ? '#d4edda' : '#f8d7da';
        messageEl.style.color = isSuccess ? '#155724' : '#721c24';
        messageEl.style.border = isSuccess ? '1px solid #c3e6cb' : '1px solid #f5c6cb';

        setTimeout(function() {
            messageEl.style.display = 'none';
        }, 5000);
    }
});