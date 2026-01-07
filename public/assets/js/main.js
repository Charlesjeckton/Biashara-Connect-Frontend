/**
 * BIASHARA CONNECT - MAIN JAVASCRIPT
 * Combined: Header, Listings, and Footer Logic
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('Biashara Connect - Main JS Loaded');

    // ==========================================
    // 1. HEADER & NAVIGATION LOGIC
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainMenu = document.getElementById('mainMenu');
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const header = document.querySelector('.main-header');

    // Create Mobile Overlay
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);

    // Mobile Menu Functions
    function openMobileMenu() {
        if (!mainMenu) return;
        mainMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.replace('fa-bars', 'fa-times');
    }

    function closeMobileMenu() {
        if (!mainMenu) return;
        mainMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.classList.replace('fa-times', 'fa-bars');
    }

    // Search Logic
    function performSearch() {
        if (!searchInput) return;
        const query = searchInput.value.trim();
        if (!query) {
            searchInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                searchInput.style.animation = '';
            }, 500);
            searchInput.focus();
            return;
        }

        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        searchBtn.disabled = true;

        setTimeout(() => {
            console.log('Searching for:', query);
            searchBtn.innerHTML = '<i class="fas fa-search"></i>';
            searchBtn.disabled = false;
        }, 800);
    }

    // Header Event Listeners
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => {
        mainMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    window.addEventListener('scroll', () => {
        window.scrollY > 20 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
    });

    // ==========================================
    // 2. LISTINGS INTERACTION
    // ==========================================
    // Heart/Save Toggle
    document.querySelectorAll('.saved-icon').forEach(icon => {
        icon.addEventListener('click', function () {
            const heartIcon = this.querySelector('i');
            heartIcon.classList.toggle('far');
            heartIcon.classList.toggle('fas');
            this.classList.toggle('active');
        });
    });

    // Contact Buttons
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const listingTitle = this.closest('.listing-card').querySelector('.listing-title').textContent;
            alert('Opening chat for: ' + listingTitle);
        });
    });

    // ==========================================
    // 3. FOOTER UTILITIES
    // ==========================================
    // Set Current Year
    const yearElement = document.getElementById('current-year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // Back to Top Logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Payment/App Tracking Mockups
    document.querySelectorAll('.app-button').forEach(btn => {
        btn.addEventListener('click', () => console.log('App Store Clicked'));
    });
});

// Global Helpers
window.updateContactInfo = function (phone, email) {
    const phoneEl = document.querySelector('.contact-item i.fa-phone + span');
    const emailEl = document.querySelector('.contact-item i.fa-envelope + span');
    if (phoneEl) phoneEl.textContent = phone;
    if (emailEl) emailEl.textContent = email;
};

    document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById('current-year');
    if (year) {
    year.textContent = new Date().getFullYear();
}
});