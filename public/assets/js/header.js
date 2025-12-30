// ===== DOM Elements =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainMenu = document.getElementById('mainMenu');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const header = document.querySelector('.main-header');
const mobileOverlay = document.createElement('div');

// ===== Mobile Overlay =====
mobileOverlay.className = 'mobile-overlay';
document.body.appendChild(mobileOverlay);

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    const isActive = mainMenu.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mainMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
}

function closeMobileMenu() {
    mainMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// ===== Search Functionality =====
function performSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        searchInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            searchInput.style.animation = '';
        }, 500);
        searchInput.focus();
        return;
    }
    
    // Show loading state
    const originalContent = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    searchBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Searching for:', query);
        // In production: window.location.href = `/search?q=${encodeURIComponent(query)}`;
        
        // Save to recent searches
        saveRecentSearch(query);
        
        // Reset button
        searchBtn.innerHTML = originalContent;
        searchBtn.disabled = false;
    }, 800);
}

function saveRecentSearch(query) {
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (!searches.includes(query)) {
        searches.unshift(query);
        if (searches.length > 5) searches.pop();
        localStorage.setItem('recentSearches', JSON.stringify(searches));
    }
}

// ===== Sticky Header =====
function handleScroll() {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ===== Active Navigation =====
function setActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    // Search
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Scroll
    window.addEventListener('scroll', handleScroll);
    
    // Set active nav
    setActiveNav();
    
    // Close menu on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            closeMobileMenu();
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                closeMobileMenu();
            }
        });
    });
});

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        if (window.innerWidth <= 991 && mainMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// ===== Global Functions =====
window.toggleMobileMenu = toggleMobileMenu;
window.performSearch = performSearch;
window.closeMobileMenu = closeMobileMenu;