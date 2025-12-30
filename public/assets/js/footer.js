// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Biashara Connect Footer loaded');

    // ===== Set Current Year in Copyright =====
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ===== Back to Top Button =====
    const backToTopBtn = document.getElementById('backToTop');

    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Initial check
    toggleBackToTop();

    // Listen for scroll
    window.addEventListener('scroll', toggleBackToTop);

    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== Smooth Scroll for Footer Links =====
    document.querySelectorAll('.footer-links a, .footer-bottom-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if it's an internal link (starts with # or /)
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== Social Media Links Click Tracking =====
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const platform = this.getAttribute('aria-label') || 'Social Media';
            console.log(`Social media clicked: ${platform}`);
            // In production, you might want to send analytics here
        });
    });

    // ===== App Download Buttons =====
    document.querySelectorAll('.app-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const store = this.querySelector('.app-store').textContent;
            console.log(`App download clicked: ${store}`);
            // In production, you would track this event
        });
    });

    // ===== Payment Icons Hover Effect =====
    document.querySelectorAll('.payment-icons i').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ===== Newsletter Subscription (if added later) =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            console.log(`Newsletter subscription: ${email}`);
            // Handle newsletter subscription
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});

// ===== Global Functions =====
window.scrollToFooterSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
};

// Add a simple function to update contact info
window.updateContactInfo = function(phone, email) {
    const phoneElement = document.querySelector('.contact-item:nth-child(2) span');
    const emailElement = document.querySelector('.contact-item:nth-child(3) span');

    if (phoneElement && phone) phoneElement.textContent = phone;
    if (emailElement && email) emailElement.textContent = email;
};