// main.js - Biashara Connect Marketplace Filters

document.addEventListener('DOMContentLoaded', function() {
    // Sample listings data (in a real app, this would come from an API)
    const listingsData = [
        {
            id: 1,
            title: "iPhone 13 Pro 256GB - Space Gray",
            description: "Brand new iPhone 13 Pro, 256GB storage. Includes original box and warranty.",
            price: 85000,
            location: "nairobi",
            category: "electronics",
            condition: "new",
            seller: "John Kamau",
            sellerInitials: "JK",
            specificLocation: "Westlands, Nairobi",
            image: "https://images.unsplash.com/photo-1762512949121-c1fc05b36e1a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            title: "Nike Air Max Running Shoes - Size 42",
            description: "Lightly used. Comfortable for running and casual wear. Minimal wear.",
            price: 3500,
            location: "nairobi",
            category: "fashion",
            condition: "used",
            seller: "Sarah Wanjiru",
            sellerInitials: "SW",
            specificLocation: "Kilimani, Nairobi",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 3,
            title: "Modern 3-Seater Sofa Set - Beige",
            description: "Premium fabric, modern design. Perfect for your living room.",
            price: 45000,
            location: "nairobi",
            category: "home",
            condition: "new",
            seller: "Furniture Mart",
            sellerInitials: "FM",
            specificLocation: "Kileleshwa, Nairobi",
            image: "https://plus.unsplash.com/premium_photo-1673548917423-073963e7afc9?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            title: "Toyota Premio 2015 - Mint Condition",
            description: "Well maintained, full service history. Fuel efficient and clean interior.",
            price: 1200000,
            location: "nakuru",
            category: "vehicles",
            condition: "used",
            seller: "David Maina",
            sellerInitials: "DM",
            specificLocation: "Thika, Kiambu",
            image: "https://images.unsplash.com/photo-1638618164682-12b986ec2a75?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 5,
            title: "Professional Plumbing Services",
            description: "Available for leak repair, installation, and general maintenance. Free quotes.",
            price: 2500,
            location: "mombasa",
            category: "services",
            condition: "new",
            seller: "Pro Plumbers",
            sellerInitials: "PP",
            specificLocation: "Mombasa CBD",
            image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 6,
            title: "Farm Tractor - 45HP - Ready for Work",
            description: "2018 model, well maintained. Perfect for small to medium farms.",
            price: 850000,
            location: "eldoret",
            category: "agriculture",
            condition: "used",
            seller: "Farm Kenya",
            sellerInitials: "FK",
            specificLocation: "Eldoret, Uasin Gishu",
            image: "https://images.unsplash.com/photo-1712766279006-ce3a50df51ee?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    // DOM Elements
    const listingsGrid = document.getElementById('listingsGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const conditionFilter = document.getElementById('conditionFilter');
    const locationFilter = document.getElementById('locationFilter');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const sortFilter = document.getElementById('sortFilter');
    const resultsCount = document.getElementById('resultsCount');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    // Filter state
    let currentFilters = {
        category: '',
        condition: '',
        location: '',
        minPrice: null,
        maxPrice: null,
        searchTerm: ''
    };

    // Initialize
    function init() {
        renderListings(listingsData);
        setupEventListeners();
        updateResultsCount(listingsData.length);
    }

    // Set up event listeners
    function setupEventListeners() {
        // Apply filters button
        applyFiltersBtn.addEventListener('click', applyFilters);

        // Reset filters button
        resetFiltersBtn.addEventListener('click', resetFilters);

        // Sort filter
        sortFilter.addEventListener('change', applyFilters);

        // Search functionality
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Filter inputs (auto-apply on change)
        categoryFilter.addEventListener('change', applyFilters);
        conditionFilter.addEventListener('change', applyFilters);
        locationFilter.addEventListener('change', applyFilters);
        priceMin.addEventListener('blur', applyFilters);
        priceMax.addEventListener('blur', applyFilters);
    }

    // Apply filters function
    function applyFilters() {
        // Get current filter values
        currentFilters.category = categoryFilter.value;
        currentFilters.condition = conditionFilter.value;
        currentFilters.location = locationFilter.value;
        currentFilters.minPrice = priceMin.value ? parseFloat(priceMin.value) : null;
        currentFilters.maxPrice = priceMax.value ? parseFloat(priceMax.value) : null;
        currentFilters.sortBy = sortFilter.value;

        // Filter listings
        let filteredListings = listingsData.filter(listing => {
            // Category filter
            if (currentFilters.category && listing.category !== currentFilters.category) {
                return false;
            }

            // Condition filter
            if (currentFilters.condition && listing.condition !== currentFilters.condition) {
                return false;
            }

            // Location filter
            if (currentFilters.location && listing.location !== currentFilters.location) {
                return false;
            }

            // Price range filter
            if (currentFilters.minPrice && listing.price < currentFilters.minPrice) {
                return false;
            }
            if (currentFilters.maxPrice && listing.price > currentFilters.maxPrice) {
                return false;
            }

            // Search term filter
            if (currentFilters.searchTerm) {
                const searchTerm = currentFilters.searchTerm.toLowerCase();
                const titleMatch = listing.title.toLowerCase().includes(searchTerm);
                const descMatch = listing.description.toLowerCase().includes(searchTerm);
                const sellerMatch = listing.seller.toLowerCase().includes(searchTerm);
                const categoryMatch = listing.category.toLowerCase().includes(searchTerm);

                if (!titleMatch && !descMatch && !sellerMatch && !categoryMatch) {
                    return false;
                }
            }

            return true;
        });

        // Sort listings
        filteredListings = sortListings(filteredListings, currentFilters.sortBy);

        // Update UI
        renderListings(filteredListings);
        updateResultsCount(filteredListings.length);
    }

    // Sort listings based on selected option
    function sortListings(listings, sortBy) {
        const sortedListings = [...listings];

        switch (sortBy) {
            case 'price-low':
                sortedListings.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedListings.sort((a, b) => b.price - a.price);
                break;
            case 'location':
                // This would require geolocation data in a real app
                // For now, we'll sort alphabetically by location
                sortedListings.sort((a, b) => a.specificLocation.localeCompare(b.specificLocation));
                break;
            case 'newest':
            default:
                // Default: newest first (by ID, simulating date)
                sortedListings.sort((a, b) => b.id - a.id);
                break;
        }

        return sortedListings;
    }

    // Reset all filters
    function resetFilters() {
        categoryFilter.value = '';
        conditionFilter.value = '';
        locationFilter.value = '';
        priceMin.value = '';
        priceMax.value = '';
        sortFilter.value = 'newest';
        searchInput.value = '';

        currentFilters = {
            category: '',
            condition: '',
            location: '',
            minPrice: null,
            maxPrice: null,
            searchTerm: '',
            sortBy: 'newest'
        };

        renderListings(listingsData);
        updateResultsCount(listingsData.length);
    }

    // Perform search
    function performSearch() {
        currentFilters.searchTerm = searchInput.value.trim();
        applyFilters();
    }

    // Update results count display
    function updateResultsCount(count) {
        const totalListings = listingsData.length;
        resultsCount.textContent = `Showing ${count} of ${totalListings} results`;
    }

    // Render listings to the grid
    function renderListings(listings) {
        listingsGrid.innerHTML = '';

        if (listings.length === 0) {
            listingsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No Listings Found</h3>
                    <p>Try adjusting your filters or search term</p>
                </div>
            `;
            return;
        }

        listings.forEach(listing => {
            const listingCard = createListingCard(listing);
            listingsGrid.appendChild(listingCard);
        });

        // Re-attach event listeners to heart icons
        attachHeartIconListeners();
        attachContactButtonListeners();
    }

    // Create a listing card element
    function createListingCard(listing) {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.dataset.id = listing.id;

        // Determine badge class based on condition
        const badgeClass = listing.condition === 'new' ? 'condition-badge new-badge' : 'condition-badge';
        const badgeText = listing.condition === 'new' ? 'New' : 'Used';

        // For services, show "Service" badge
        const finalBadgeText = listing.category === 'services' ? 'Service' : badgeText;

        card.innerHTML = `
            <div class="listing-image-container">
                <img src="${listing.image}" alt="${listing.title}" class="listing-image">
                <div class="${badgeClass}">${finalBadgeText}</div>
                <div class="saved-icon" data-listing="${listing.id}"><i class="far fa-heart"></i></div>
            </div>
            <div class="listing-card-body">
                <div class="listing-price">KSh ${listing.price.toLocaleString()}</div>
                <h3 class="listing-title">${listing.title}</h3>
                <p class="listing-description">${listing.description}</p>
                <div class="listing-location"><i class="fas fa-map-marker-alt"></i><span>${listing.specificLocation}</span></div>
            </div>
            <div class="listing-card-footer">
                <div class="seller-info">
                    <div class="index-seller-avatar">${listing.sellerInitials}</div>
                    <div class="seller-name">${listing.seller}</div>
                </div>
                <button class="contact-btn" data-listing="${listing.id}"><i class="fas fa-message"></i> Contact</button>
            </div>
        `;

        return card;
    }

    // Attach event listeners to heart icons
    function attachHeartIconListeners() {
        const heartIcons = document.querySelectorAll('.saved-icon');
        heartIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const listingId = this.dataset.listing;
                const heartIcon = this.querySelector('i');

                // Toggle between filled and outline heart
                if (heartIcon.classList.contains('far')) {
                    heartIcon.classList.remove('far');
                    heartIcon.classList.add('fas');
                    this.classList.add('active');
                    saveToFavorites(listingId);
                } else {
                    heartIcon.classList.remove('fas');
                    heartIcon.classList.add('far');
                    this.classList.remove('active');
                    removeFromFavorites(listingId);
                }
            });
        });
    }

    // Attach event listeners to contact buttons
    function attachContactButtonListeners() {
        const contactButtons = document.querySelectorAll('.contact-btn');
        contactButtons.forEach(button => {
            button.addEventListener('click', function() {
                const listingId = this.dataset.listing;
                const listing = listingsData.find(l => l.id == listingId);

                if (listing) {
                    alert(`Contacting ${listing.seller} about: ${listing.title}\n\nYou can reach them through our messaging system.`);
                    // In a real app, this would open a chat/message modal
                }
            });
        });
    }

    // Save to favorites (simulated)
    function saveToFavorites(listingId) {
        console.log(`Saved listing ${listingId} to favorites`);
        // In a real app, this would make an API call
        showNotification('Added to favorites!', 'success');
    }

    // Remove from favorites (simulated)
    function removeFromFavorites(listingId) {
        console.log(`Removed listing ${listingId} from favorites`);
        // In a real app, this would make an API call
        showNotification('Removed from favorites', 'info');
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles for notification
        if (!document.querySelector('.notification-styles')) {
            const style = document.createElement('style');
            style.className = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--primary-green);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: var(--card-shadow);
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                }
                .notification-success {
                    background: var(--primary-green);
                }
                .notification-info {
                    background: var(--chart-info);
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        // Add to document
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Mobile menu toggle
    function setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        }
    }

    // Initialize everything
    init();
    setupMobileMenu();
});