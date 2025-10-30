// Navigation JavaScript Functionality
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveLinks();
        this.setupKeyboardNavigation();
    }

    // Mobile Menu Functionality - New System
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        const mobileMenuCtaLink = document.querySelector('.mobile-menu-cta-link');

        if (!mobileMenuToggle || !mobileMenuOverlay) {
            console.error('Mobile menu elements not found!');
            return;
        }
        
        console.log('New mobile menu system setup successful!');

        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Mobile menu toggle clicked!');
            const isActive = mobileMenuOverlay.classList.contains('active');
            
            if (isActive) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        });

        // Close mobile menu when clicking on links
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking on CTA button
        if (mobileMenuCtaLink) {
            mobileMenuCtaLink.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuOverlay.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    openMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        
        if (!mobileMenuToggle || !mobileMenuOverlay) {
            console.error('Mobile menu elements not found');
            return;
        }
        
        console.log('Opening new mobile menu...');
        mobileMenuToggle.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        
        if (!mobileMenuToggle || !mobileMenuOverlay) return;
        
        console.log('Closing new mobile menu...');
        
        mobileMenuToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        
        // Reset body overflow
        document.body.style.overflow = '';
    }

    // Smooth Scrolling for Navigation Links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Active Link Management
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');

        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', debounce(updateActiveLink, 100));
        updateActiveLink(); // Initial call
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Handle tab navigation
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});

// Also try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NavigationManager();
    });
} else {
    new NavigationManager();
}

// Handle window resize
window.addEventListener('resize', () => {
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        if (mobileMenuOverlay?.classList.contains('active')) {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuToggle?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

