// Story Frames Carousel - Cinematic 3D Concept
class StoryFramesCarousel {
    constructor() {
        this.currentIndex = 0;
        this.totalSlides = 5;
        this.cards = document.querySelectorAll('.project-card');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.paginationDots = document.querySelectorAll('.pagination-dot');
        this.autoPlayInterval = null;
        this.isAutoPlaying = true;
        this.autoPlayDelay = 6000; // 6 seconds for slower, smoother auto-scroll
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCarousel();
        this.startAutoPlay();
    }

    bindEvents() {
        // Navigation buttons with smooth transitions
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.smoothSlide('prev'));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.smoothSlide('next'));
        }
        
        // Pagination dots
        this.paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Card click to center
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => this.goToSlide(index));
        });

        // Touch support
        this.addTouchSupport();

        // Pause auto-play on hover
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.pauseAutoPlay());
            card.addEventListener('mouseleave', () => this.resumeAutoPlay());
        });

        // Keyboard navigation with smooth transitions
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.smoothSlide('prev');
            } else if (e.key === 'ArrowRight') {
                this.smoothSlide('next');
            }
        });

        // Pause auto-play when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else {
                this.resumeAutoPlay();
            }
        });
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let distX = 0;
        let distY = 0;

        const carouselTrack = document.getElementById('carouselTrack');
        
        if (!carouselTrack) return;

        carouselTrack.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            this.pauseAutoPlay();
        }, { passive: true });

        carouselTrack.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });

        carouselTrack.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];
            distX = touch.clientX - startX;
            distY = touch.clientY - startY;

            if (Math.abs(distX) > Math.abs(distY)) {
                if (distX > 50) {
                    this.smoothSlide('prev');
                } else if (distX < -50) {
                    this.smoothSlide('next');
                }
            }
            
            this.resumeAutoPlay();
        }, { passive: true });
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        // Add smooth transition class for enhanced animations
        this.cards.forEach(card => {
            card.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        // Remove all position classes with a slight delay for smoother transitions
        requestAnimationFrame(() => {
            this.cards.forEach(card => {
                card.classList.remove('active', 'left', 'right', 'left-2', 'right-2');
            });

            // Set new positions based on current index
            requestAnimationFrame(() => {
                this.cards.forEach((card, index) => {
                    const relativeIndex = (index - this.currentIndex + this.totalSlides) % this.totalSlides;
                    
                    if (relativeIndex === 0) {
                        card.classList.add('active');
                    } else if (relativeIndex === 1) {
                        card.classList.add('right');
                    } else if (relativeIndex === 2) {
                        card.classList.add('right-2');
                    } else if (relativeIndex === this.totalSlides - 1) {
                        card.classList.add('left');
                    } else if (relativeIndex === this.totalSlides - 2) {
                        card.classList.add('left-2');
                    }
                });

                // Update pagination with smooth transition
                this.paginationDots.forEach((dot, index) => {
                    dot.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    dot.classList.toggle('active', index === this.currentIndex);
                });
            });
        });
    }

    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        
        this.autoPlayInterval = setInterval(() => {
            if (this.isAutoPlaying) {
                this.nextSlide();
            }
        }, this.autoPlayDelay);
    }

    // Enhanced smooth slide transitions
    smoothSlide(direction) {
        this.pauseAutoPlay();
        
        if (direction === 'next') {
            this.nextSlide();
        } else {
            this.prevSlide();
        }
        
        // Resume auto-play after transition completes
        setTimeout(() => {
            this.resumeAutoPlay();
        }, 1200); // Match CSS transition duration
    }

    pauseAutoPlay() {
        this.isAutoPlaying = false;
    }

    resumeAutoPlay() {
        this.isAutoPlaying = true;
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if the carousel exists on the page
    if (document.querySelector('.projects-showcase')) {
        new StoryFramesCarousel();
    }
    
    // Initialize underlayer animation
    initUnderlayerAnimation();
});

// Underlayer Animation Handler
function initUnderlayerAnimation() {
    const underlayerContent = document.querySelector('.underlayer-content');
    
    if (!underlayerContent) return;
    
    // Create intersection observer for scroll-triggered animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Start with animation paused
    underlayerContent.style.animationPlayState = 'paused';
    observer.observe(underlayerContent);
}

// Handle window resize
window.addEventListener('resize', () => {
    // Re-initialize carousel on resize to handle responsive changes
    const carousel = document.querySelector('.projects-showcase');
    if (carousel && carousel.carousel) {
        carousel.carousel.updateCarousel();
    }
});