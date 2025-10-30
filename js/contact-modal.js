// Contact Modal Handler
class ContactModalHandler {
    constructor() {
        this.modal = document.getElementById('contactModal');
        this.overlay = document.getElementById('modalOverlay');
        this.closeBtn = document.getElementById('modalClose');
        this.form = document.getElementById('contactModalForm');
        this.submitBtn = this.form?.querySelector('button[type="submit"]');
        
        this.init();
    }

    init() {
        if (!this.modal || !this.closeBtn || !this.form) {
            console.warn('Contact modal elements not found');
            return;
        }

        // Close button click
        this.closeBtn.addEventListener('click', () => this.closeModal());

        // Overlay click to close
        this.overlay.addEventListener('click', () => this.closeModal());

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Add triggers to all contact buttons
        this.addTriggersToContactButtons();
    }

    openModal() {
        if (!this.modal) return;
        
        // Add active class
        this.modal.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = this.modal.querySelector('input, textarea, select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
    }

    closeModal() {
        if (!this.modal) return;
        
        // Remove active class
        this.modal.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Reset form after animation
        setTimeout(() => {
            this.form.reset();
        }, 300);
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            project: formData.get('project')
        };

        // Show loading state
        this.submitBtn.disabled = true;
        this.submitBtn.classList.add('loading');
        const originalText = this.submitBtn.innerHTML;
        this.submitBtn.innerHTML = '';

        try {
            // TODO: Replace with actual API endpoint
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            this.showSuccess();

            // Log to console for now
            console.log('Contact form submitted:', data);

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
            
            // Reset button
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            this.submitBtn.innerHTML = originalText;
        }
    }

    showSuccess() {
        // Create success message HTML
        const successHTML = `
            <div class="modal-success active">
                <div class="modal-success-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>I've received your message and will get back to you within 24 hours. Looking forward to working together!</p>
                <button class="modal-submit-btn" onclick="location.reload()">
                    Close
                </button>
            </div>
        `;

        // Replace form content
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.innerHTML = successHTML;
        }

        // Auto-close after 3 seconds
        setTimeout(() => {
            this.closeModal();
            // Reload to reset form
            setTimeout(() => {
                location.reload();
            }, 300);
        }, 3000);
    }

    addTriggersToContactButtons() {
        // Find all buttons with data-trigger-modal attribute or specific classes
        const triggerSelectors = [
            '[data-trigger-modal="contact"]',
            '.final-cta-button',
            '#finalCTAButton',
            '.contact-submit-btn',
            'a[href="#contact"]'
        ];

        triggerSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    // Check if it's a hash link
                    if (button.tagName === 'A' && button.getAttribute('href') === '#contact') {
                        e.preventDefault();
                    }
                    this.openModal();
                });
            });
        });
    }

    // Public method to open modal programmatically
    static open() {
        const handler = window.contactModalHandler;
        if (handler) {
            handler.openModal();
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.contactModalHandler = new ContactModalHandler();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactModalHandler;
}

