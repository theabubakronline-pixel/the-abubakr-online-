// Story Frames Carousel V2 - New Concept JavaScript
class StoryFramesCarouselV2 {
    constructor() {
        this.currentStory = 1;
        this.totalStories = 6;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        
        // DOM Elements
        this.cardsContainer = document.getElementById('storyCardsContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressFill = document.getElementById('progressFill');
        this.progressDots = document.querySelectorAll('.progress-dot');
        this.storyCards = document.querySelectorAll('.story-card-v2');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCarousel();
        this.startAutoPlay();
        this.setupTouchSupport();
        this.setupKeyboardNavigation();
    }

    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousStory());
        this.nextBtn.addEventListener('click', () => this.nextStory());
        
        // Progress dots
        this.progressDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToStory(index + 1));
        });
        
        // Story cards
        this.storyCards.forEach((card, index) => {
            card.addEventListener('click', () => this.goToStory(index + 1));
            
            // Pause auto-play on hover
            card.addEventListener('mouseenter', () => this.pauseAutoPlay());
            card.addEventListener('mouseleave', () => this.resumeAutoPlay());
        });
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }
    }

    setupTouchSupport() {
        let startX = 0;
        let startY = 0;
        let distX = 0;
        let distY = 0;
        let isScrolling = false;

        this.cardsContainer.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            isScrolling = false;
        }, { passive: true });

        this.cardsContainer.addEventListener('touchmove', (e) => {
            if (!isScrolling) {
                const touch = e.touches[0];
                distX = touch.clientX - startX;
                distY = touch.clientY - startY;
                
                // Determine if horizontal or vertical scroll
                if (Math.abs(distX) > Math.abs(distY)) {
                    isScrolling = true;
                    e.preventDefault();
                }
            }
        }, { passive: false });

        this.cardsContainer.addEventListener('touchend', (e) => {
            if (isScrolling && Math.abs(distX) > 50) {
                if (distX > 0) {
                    this.previousStory();
                } else {
                    this.nextStory();
                }
            }
            isScrolling = false;
        }, { passive: true });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousStory();
            } else if (e.key === 'ArrowRight') {
                this.nextStory();
            }
        });
    }

    previousStory() {
        if (this.isAnimating) return;
        
        this.currentStory = this.currentStory > 1 ? this.currentStory - 1 : this.totalStories;
        this.updateCarousel();
    }

    nextStory() {
        if (this.isAnimating) return;
        
        this.currentStory = this.currentStory < this.totalStories ? this.currentStory + 1 : 1;
        this.updateCarousel();
    }

    goToStory(storyNumber) {
        if (this.isAnimating || storyNumber === this.currentStory) return;
        
        this.currentStory = storyNumber;
        this.updateCarousel();
    }

    updateCarousel() {
        this.isAnimating = true;
        
        // Calculate transform
        const cardWidth = 350 + 32; // card width + gap
        const translateX = -(this.currentStory - 1) * cardWidth;
        
        // Apply transform
        this.cardsContainer.style.transform = `translateX(${translateX}px)`;
        
        // Update progress bar
        const progressWidth = (this.currentStory / this.totalStories) * 100;
        this.progressFill.style.width = `${progressWidth}%`;
        
        // Update progress dots
        this.progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === this.currentStory);
        });
        
        // Update navigation buttons
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
        
        // Add visual feedback
        this.addVisualFeedback();
        
        // Reset animation flag
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    addVisualFeedback() {
        // Add pulse effect to current card
        const currentCard = document.querySelector(`[data-story="${this.currentStory}"]`);
        if (currentCard) {
            currentCard.style.animation = 'cardPulse 0.6s ease-out';
            setTimeout(() => {
                currentCard.style.animation = '';
            }, 600);
        }
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextStory();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resumeAutoPlay() {
        if (!this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }

    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        
        // Update theme icon
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
        
        // Store preference
        localStorage.setItem('theme', newTheme);
    }

    // Public methods for external control
    play() {
        this.resumeAutoPlay();
    }

    stop() {
        this.pauseAutoPlay();
    }

    getCurrentStory() {
        return this.currentStory;
    }

    getTotalStories() {
        return this.totalStories;
    }
}

// CSS Animation for card pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes cardPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new StoryFramesCarouselV2();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Update theme icon
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
    
    // Pause auto-play when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            carousel.pauseAutoPlay();
        } else {
            carousel.resumeAutoPlay();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        carousel.updateCarousel();
    });
    
    // Expose carousel instance globally for debugging
    window.storyCarousel = carousel;
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate carousel on resize
    const carousel = window.storyCarousel;
    if (carousel) {
        carousel.updateCarousel();
    }
});



