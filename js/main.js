// Header JavaScript Functionality
class HeaderManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupNavigationLinks();
        this.detectSystemTheme();
        this.setupProfileImage();
    }

    // Theme Toggle Functionality
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add smooth transition effect
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    // Detect system theme preference
    detectSystemTheme() {
        if (!localStorage.getItem('theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme = prefersDark ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', systemTheme);
            localStorage.setItem('theme', systemTheme);
        }
    }

    // Mobile Menu Functionality
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileNav = document.getElementById('mobileNav');
        const mobileLinks = document.querySelectorAll('.nav-mobile-link');

        mobileMenuToggle.addEventListener('click', () => {
            const isActive = mobileNav.classList.contains('active');
            
            if (isActive) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        });

        // Close mobile menu when clicking on links
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
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
        const mobileNav = document.getElementById('mobileNav');
        
        mobileMenuToggle.classList.add('active');
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        const menuItems = document.querySelectorAll('.nav-mobile-item');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    closeMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileNav = document.getElementById('mobileNav');
        
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Scroll Effects
    setupScrollEffects() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        let ticking = false;
        let isScrolling = false;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = Math.abs(currentScrollY - lastScrollY);
            
            // Only update if scroll is significant enough
            if (scrollDelta < 5) {
                ticking = false;
                return;
            }
            
            if (currentScrollY > 50) {
                // Scrolled down - add scrolled class for enhanced stability
                if (!isScrolling) {
                    header.classList.add('scrolled');
                    isScrolling = true;
                }
            } else {
                // At top - remove scrolled class
                if (isScrolling) {
                    header.classList.remove('scrolled');
                    isScrolling = false;
                }
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        // Throttled scroll listener for better performance
        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Initial state
        updateHeader();
    }

    // Navigation Links Smooth Scrolling
    setupNavigationLinks() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Profile Image Setup
    setupProfileImage() {
        const profileImg = document.getElementById('profileImg');
        const fallback = profileImg.nextElementSibling;
        
        // Preload the image
        const img = new Image();
        img.onload = () => {
            profileImg.style.opacity = '1';
            profileImg.style.transform = 'scale(1)';
        };
        img.onerror = () => {
            profileImg.style.display = 'none';
            fallback.style.display = 'flex';
        };
        img.src = 'assets/images/profile.jpg';
        
        // Handle image load events
        profileImg.addEventListener('load', () => {
            profileImg.style.opacity = '1';
            profileImg.style.transform = 'scale(1)';
        });

        profileImg.addEventListener('error', () => {
            profileImg.style.display = 'none';
            fallback.style.display = 'flex';
        });

        // Set initial loading state
        profileImg.style.opacity = '0';
        profileImg.style.transform = 'scale(0.8)';
        profileImg.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderManager();
});

// Performance optimization: Preload critical resources
const preloadCriticalResources = () => {
    // Preload profile image
    const profileImg = new Image();
    profileImg.src = 'assets/images/profile.jpg';
    
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
};

// Start preloading immediately
preloadCriticalResources();

// Handle window resize
window.addEventListener('resize', () => {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        mobileNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Close mobile menu when page becomes hidden
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add smooth page transitions
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('formSuccess');
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');

        // Validate based on field type
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.tagName === 'TEXTAREA' && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }

        if (!isValid) {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    showFieldError(field, message) {
        // Remove existing error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 4px;
        `;
        field.parentElement.appendChild(errorElement);
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        let isValid = true;
        if (!this.validateField(name)) isValid = false;
        if (!this.validateField(email)) isValid = false;
        if (!this.validateField(message)) isValid = false;

        if (!isValid) {
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        // Simulate form submission (replace with actual API call)
        try {
            // TODO: Replace with actual backend API endpoint
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         name: name.value,
            //         email: email.value,
            //         message: message.value
            //     })
            // });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            this.showSuccess();

            // Reset form
            this.form.reset();

            // TODO: Log to console for now
            console.log('Form submitted:', {
                name: name.value,
                email: email.value,
                message: message.value
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    showSuccess() {
        if (this.successMessage) {
            this.successMessage.style.display = 'flex';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                this.successMessage.style.display = 'none';
            }, 5000);
        }

        // Scroll to success message
        this.successMessage?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Add CSS for error states
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .form-input.error,
    .form-textarea.error {
        border-color: #ef4444;
        background-color: #fef2f2;
    }
    
    .form-input.error:focus,
    .form-textarea.error:focus {
        border-color: #ef4444;
        box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
    }
`;
document.head.appendChild(errorStyle);

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormHandler();
});
