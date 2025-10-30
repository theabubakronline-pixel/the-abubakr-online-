// Mobile Carousel Touch Interactions
// Handle touch events for mobile carousel cards

class MobileCarouselTouch {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupTouchEvents());
        } else {
            this.setupTouchEvents();
        }
    }

    setupTouchEvents() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add touch event listeners
            card.addEventListener('touchstart', (e) => this.handleTouchStart(e, card));
            card.addEventListener('touchend', (e) => this.handleTouchEnd(e, card));
            card.addEventListener('click', (e) => this.handleClick(e, card));
            
            // Prevent default touch behaviors that might interfere
            card.addEventListener('touchmove', (e) => e.preventDefault());
        });
    }

    handleTouchStart(e, card) {
        // Add visual feedback on touch start
        card.style.transform = 'scale(0.98)';
        card.style.transition = 'transform 0.1s ease';
    }

    handleTouchEnd(e, card) {
        // Reset visual feedback
        card.style.transform = '';
        
        // Toggle content visibility
        this.toggleCardContent(card);
        
        // Prevent default click behavior
        e.preventDefault();
    }

    handleClick(e, card) {
        // Handle click events (for devices that support both touch and click)
        e.preventDefault();
        this.toggleCardContent(card);
    }

    toggleCardContent(card) {
        // Toggle the 'tapped' class to show/hide content
        const isTapped = card.classList.contains('tapped');
        
        if (isTapped) {
            // Hide content
            card.classList.remove('tapped');
            this.hideContent(card);
        } else {
            // Show content
            card.classList.add('tapped');
            this.showContent(card);
        }
    }

    showContent(card) {
        const content = card.querySelector('.project-content');
        const cta = card.querySelector('.project-cta');
        
        if (content) {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            content.style.pointerEvents = 'auto';
        }
        
        if (cta) {
            cta.style.opacity = '1';
            cta.style.transform = 'translateY(0)';
        }
    }

    hideContent(card) {
        const content = card.querySelector('.project-content');
        const cta = card.querySelector('.project-cta');
        
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            content.style.pointerEvents = 'none';
        }
        
        if (cta) {
            cta.style.opacity = '0';
            cta.style.transform = 'translateY(15px)';
        }
    }

    // Method to reset all cards (useful for carousel navigation)
    resetAllCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.classList.remove('tapped');
            this.hideContent(card);
        });
    }
}

// Initialize mobile touch interactions
const mobileCarouselTouch = new MobileCarouselTouch();

// Export for use in other scripts
window.MobileCarouselTouch = MobileCarouselTouch;


