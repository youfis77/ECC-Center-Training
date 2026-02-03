// ===================================
// ECC Training Center - JavaScript
// Interactive Features & Animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Navigation
    // ===================================
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===================================
    // Header Scroll Effect
    // ===================================
    
    const header = document.querySelector('.header-main');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===================================
    // Animated Counter for Statistics
    // ===================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(function() {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    function checkStatSection() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection || counted) return;
        
        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.clientHeight;
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        if (scrollPosition > sectionTop + (sectionHeight / 3)) {
            counted = true;
            statNumbers.forEach(stat => animateCounter(stat));
        }
    }
    
    window.addEventListener('scroll', checkStatSection);
    checkStatSection(); // Check on load
    
    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Contact Form Handling
    // ===================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Create WhatsApp message
            const whatsappNumber = '201225859777';
            const whatsappMessage = `
مرحباً، اسمي ${formData.name}

رقم الهاتف: ${formData.phone}
البريد الإلكتروني: ${formData.email}

الرسالة:
${formData.message}
            `.trim();
            
            // Open WhatsApp
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
            
            // Show success message
            showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ===================================
    // Notification System
    // ===================================
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#3b82f6',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease',
            maxWidth: '400px',
            direction: 'rtl'
        });
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===================================
    // Back to Top Button
    // ===================================
    
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===================================
    // Scroll Animations
    // ===================================
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.info-card, .feature-item');
        
        animatedElements.forEach((element, index) => {
            if (!element.classList.contains('animated')) {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - 100;
                
                if (isVisible) {
                    setTimeout(() => {
                        element.style.opacity = '0';
                        element.style.transform = 'translateY(30px)';
                        element.style.transition = 'all 0.6s ease';
                        
                        requestAnimationFrame(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        });
                        
                        element.classList.add('animated');
                    }, index * 100);
                }
            }
        });
    }
    
    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Run on load
    
    // ===================================
    // Phone Number Click Tracking
    // ===================================
    
    document.querySelectorAll('.phone-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const phoneNumber = this.textContent.trim();
            console.log(`Phone number clicked: ${phoneNumber}`);
            // You can add analytics tracking here
        });
    });
    
    // ===================================
    // Prevent Right Click on Images (Optional)
    // ===================================
    
    // Uncomment if you want to protect images
    /*
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
    });
    */
    
    // ===================================
    // Loading Screen (Optional)
    // ===================================
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
    
    // ===================================
    // Console Welcome Message
    // ===================================
    
    console.log('%c مرحباً بك في موقع مركز E.C.C للتدريب! ', 
        'background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
    console.log('%c للاستفسارات: 01225859777 | 01151938777 | 01004714021 ', 
        'color: #5b21b6; font-size: 14px; font-weight: bold;');
    
    // ===================================
    // Dynamic Year in Footer
    // ===================================
    
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }
    
    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    
    const heroSection = document.querySelector('.hero-section');
    const heroBgPattern = document.querySelector('.hero-bg-pattern');
    
    if (heroSection && heroBgPattern) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrolled < heroHeight) {
                heroBgPattern.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // ===================================
    // Form Validation
    // ===================================
    
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#cbd5e1';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#5b21b6';
        });
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Remove non-numeric characters
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 11 digits for Egyptian numbers
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            this.value = value;
        });
    }
    
    // ===================================
    // Lazy Loading for Images (if added later)
    // ===================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ===================================
    // Social Media Share Tracking
    // ===================================
    
    document.querySelectorAll('.social-icon, .social-link').forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.href.includes('facebook') ? 'Facebook' : 
                           this.href.includes('youtube') ? 'YouTube' : 'Other';
            console.log(`Social media link clicked: ${platform}`);
            // Add analytics tracking here if needed
        });
    });
    
    // ===================================
    // Easter Egg - Konami Code
    // ===================================
    
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-konamiPattern.length);
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiPattern)) {
            showNotification('🎉 تهانينا! لقد اكتشفت الكود السري! احصل على خصم 10% على أي دورة!', 'success');
            document.body.style.animation = 'rainbow 2s linear infinite';
        }
    });
    
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// Export functions for external use
// ===================================

window.ECCTraining = {
    showNotification: function(message, type) {
        // This allows external scripts to trigger notifications
        const event = new CustomEvent('showNotification', { 
            detail: { message, type } 
        });
        document.dispatchEvent(event);
    }
};
