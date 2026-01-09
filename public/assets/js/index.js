document.addEventListener('DOMContentLoaded', function() {
    console.log('Biashara Connect Listings Page loaded');

    // Sample listings data
    const listings = [
        {
            id: 1,
            title: "iPhone 13 Pro 256GB - Space Gray",
            price: 85000,
            category: "electronics",
            condition: "new",
            location: "nairobi",
            description: "Brand new iPhone 13 Pro, 256GB storage. Includes original box and warranty.",
            image: "https://images.unsplash.com/photo-1762512949121-c1fc05b36e1a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            seller: { avatar: "JK", name: "John Kamau" },
            area: "Westlands, Nairobi"
        },
        {
            id: 2,
            title: "Nike Air Max Running Shoes - Size 42",
            price: 3500,
            category: "fashion",
            condition: "used",
            location: "nairobi",
            description: "Lightly used. Comfortable for running and casual wear. Minimal wear.",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=60",
            seller: { avatar: "SW", name: "Sarah Wanjiru" },
            area: "Kilimani, Nairobi"
        },
        {
            id: 3,
            title: "Modern 3-Seater Sofa Set - Beige",
            price: 45000,
            category: "home",
            condition: "new",
            location: "nairobi",
            description: "Premium fabric, modern design. Perfect for your living room.",
            image: "https://plus.unsplash.com/premium_photo-1673548917423-073963e7afc9?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            seller: { avatar: "FM", name: "Furniture Mart" },
            area: "Kileleshwa, Nairobi"
        },
        {
            id: 4,
            title: "Toyota Premio 2015 - Mint Condition",
            price: 1200000,
            category: "vehicles",
            condition: "used",
            location: "kiambu",
            description: "Well maintained, full service history. Fuel efficient and clean interior.",
            image: "https://images.unsplash.com/photo-1638618164682-12b986ec2a75?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            seller: { avatar: "DM", name: "David Maina" },
            area: "Thika, Kiambu"
        },
        {
            id: 5,
            title: "Professional Plumbing Services",
            price: 2500,
            category: "services",
            condition: "new",
            location: "mombasa",
            description: "Available for leak repair, installation, and general maintenance. Free quotes.",
            image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            seller: { avatar: "PP", name: "Pro Plumbers" },
            area: "Mombasa CBD"
        },
        {
            id: 6,
            title: "Farm Tractor - 45HP - Ready for Work",
            price: 850000,
            category: "agriculture",
            condition: "used",
            location: "eldoret",
            description: "2018 model, well maintained. Perfect for small to medium farms.",
            image: "https://images.unsplash.com/photo-1712766279006-ce3a50df51ee?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            seller: { avatar: "FK", name: "Farm Kenya" },
            area: "Eldoret, Uasin Gishu"
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

    // Initialize
    renderListings(listings);
    updateResultsCount(listings.length, listings.length);

    // ===== FILTER FUNCTIONALITY =====
    function applyFilters() {
        const category = categoryFilter.value;
        const condition = conditionFilter.value;
        const location = locationFilter.value;
        const minPrice = priceMin.value ? parseInt(priceMin.value) : 0;
        const maxPrice = priceMax.value ? parseInt(priceMax.value) : Infinity;

        let filteredListings = listings.filter(listing => {
            // Category filter
            if (category && listing.category !== category) return false;

            // Condition filter
            if (condition && listing.condition !== condition) return false;

            // Location filter
            if (location && listing.location !== location) return false;

            // Price filter
            if (listing.price < minPrice || listing.price > maxPrice) return false;

            return true;
        });

        // Apply sorting
        filteredListings = sortListings(filteredListings, sortFilter.value);

        renderListings(filteredListings);
        updateResultsCount(filteredListings.length, listings.length);
    }

    function resetFilters() {
        categoryFilter.value = '';
        conditionFilter.value = '';
        locationFilter.value = '';
        priceMin.value = '';
        priceMax.value = '';
        sortFilter.value = 'newest';

        const sortedListings = sortListings(listings, 'newest');
        renderListings(sortedListings);
        updateResultsCount(listings.length, listings.length);
    }

    function sortListings(listingsArray, sortBy) {
        const sorted = [...listingsArray];

        switch(sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'newest':
            default:
                return sorted.sort((a, b) => b.id - a.id); // Using ID as proxy for newest
        }
    }

    function renderListings(listingsArray) {
        listingsGrid.innerHTML = '';

        if (listingsArray.length === 0) {
            listingsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No listings found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
            return;
        }

        listingsArray.forEach(listing => {
            const listingCard = document.createElement('div');
            listingCard.className = 'listing-card';
            listingCard.innerHTML = `
                <div class="listing-image-container">
                    <img src="${listing.image}" alt="${listing.title}" class="listing-image">
                    <div class="condition-badge ${listing.condition === 'new' ? 'new-badge' : ''}">
                        ${listing.condition === 'new' ? 'New' : (listing.category === 'services' ? 'Service' : 'Used')}
                    </div>
                    <div class="saved-icon" data-listing="${listing.id}">
                        <i class="far fa-heart"></i>
                    </div>
                </div>
                <div class="listing-card-body">
                    <div class="listing-price">KSh ${listing.price.toLocaleString()}</div>
                    <h3 class="listing-title">${listing.title}</h3>
                    <p class="listing-description">${listing.description}</p>
                    <div class="listing-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${listing.area}</span>
                    </div>
                </div>
                <div class="listing-card-footer">
                    <div class="seller-info">
                        <div class="seller-avatar">${listing.seller.avatar}</div>
                        <div class="seller-name">${listing.seller.name}</div>
                    </div>
                    <div class="listing-actions">
                        <button class="contact-btn" data-listing="${listing.id}">
                            <i class="fas fa-message"></i> Contact
                        </button>
                        <button class="view-details-btn" data-listing="${listing.id}">
                            <i class="fas fa-eye"></i> Details
                        </button>
                    </div>
                </div>
            `;
            listingsGrid.appendChild(listingCard);
        });

        // Reattach event listeners to new elements
        attachSaveListeners();
        attachContactListeners();
        attachViewDetailsListeners();
    }

    function updateResultsCount(shown, total) {
        resultsCount.textContent = `Showing ${shown} of ${total} results`;
    }

    // ===== EVENT LISTENERS =====
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    sortFilter.addEventListener('change', applyFilters);

    // Auto-apply filters when inputs change
    [categoryFilter, conditionFilter, locationFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    [priceMin, priceMax].forEach(input => {
        input.addEventListener('input', function() {
            if (this.value === '' || (priceMin.value && priceMax.value)) {
                applyFilters();
            }
        });
    });

    // ===== SAVE LISTING FUNCTIONALITY =====
    function attachSaveListeners() {
        const savedIcons = document.querySelectorAll('.saved-icon');
        savedIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const listingId = this.getAttribute('data-listing');
                const heartIcon = this.querySelector('i');

                if (heartIcon.classList.contains('far')) {
                    heartIcon.classList.remove('far');
                    heartIcon.classList.add('fas');
                    this.classList.add('active');
                    showToast('Listing saved to favorites');
                } else {
                    heartIcon.classList.remove('fas');
                    heartIcon.classList.add('far');
                    this.classList.remove('active');
                    showToast('Listing removed from favorites');
                }
            });
        });
    }

    // ===== CONTACT BUTTON FUNCTIONALITY =====
    function attachContactListeners() {
        const contactBtns = document.querySelectorAll('.contact-btn');
        contactBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const listingId = this.getAttribute('data-listing');
                const listing = listings.find(l => l.id == listingId);

                showContactModal(listing);
            });
        });
    }

    // ===== VIEW DETAILS BUTTON FUNCTIONALITY =====
    function attachViewDetailsListeners() {
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const listingId = this.getAttribute('data-listing');
                const listing = listings.find(l => l.id == listingId);

                showDetailsModal(listing);
            });
        });
    }

    // ===== MODAL FUNCTIONS =====
    function showDetailsModal(listing) {
        // Create modal HTML
        const modalHTML = `
            <div class="modal-overlay" id="detailsModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Listing Details</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-image">
                            <img src="${listing.image}" alt="${listing.title}">
                        </div>
                        <div class="modal-info">
                            <div class="modal-price">KSh ${listing.price.toLocaleString()}</div>
                            <h2 class="modal-title">${listing.title}</h2>
                            <div class="modal-meta">
                                <div class="meta-item">
                                    <i class="fas fa-tag"></i>
                                    <span>${listing.category}</span>
                                </div>
                                <div class="meta-item">
                                    <i class="fas fa-certificate"></i>
                                    <span>${listing.condition === 'new' ? 'New' : 'Used'}</span>
                                </div>
                                <div class="meta-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>${listing.area}</span>
                                </div>
                            </div>
                            <div class="modal-description">
                                <h4>Description</h4>
                                <p>${listing.description}</p>
                            </div>
                            <div class="modal-seller">
                                <h4>Seller Information</h4>
                                <div class="seller-display">
                                    <div class="seller-avatar">${listing.seller.avatar}</div>
                                    <div class="seller-details">
                                        <div class="seller-name">${listing.seller.name}</div>
                                        <div class="seller-location">${listing.area}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-contact-btn contact-btn">
                            <i class="fas fa-message"></i> Contact Seller
                        </button>
                        <button class="modal-close-btn view-details-btn">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Get modal elements
        const modal = document.getElementById('detailsModal');
        const closeBtns = modal.querySelectorAll('.modal-close, .modal-close-btn');

        // Close modal functionality
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });

        // Contact button in modal
        modal.querySelector('.modal-contact-btn').addEventListener('click', () => {
            modal.remove();
            showContactModal(listing);
        });

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEsc);
            }
        });
    }

    function showContactModal(listing) {
        const modalHTML = `
            <div class="modal-overlay" id="contactModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Contact Seller</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>You are contacting <strong>${listing.seller.name}</strong> about:</p>
                        <div class="contact-listing-info">
                            <img src="${listing.image}" alt="${listing.title}">
                            <div>
                                <h4>${listing.title}</h4>
                                <div class="contact-price">KSh ${listing.price.toLocaleString()}</div>
                            </div>
                        </div>
                        <div class="contact-form">
                            <div class="form-group">
                                <label for="contactMessage">Your Message</label>
                                <textarea id="contactMessage" rows="4" placeholder="Hi, I'm interested in this item. Is it still available?"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="contactPhone">Your Phone Number (optional)</label>
                                <input type="tel" id="contactPhone" placeholder="07XX XXX XXX">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-send-btn contact-btn">
                            <i class="fas fa-paper-plane"></i> Send Message
                        </button>
                        <button class="modal-close-btn view-details-btn">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('contactModal');
        const closeBtns = modal.querySelectorAll('.modal-close, .modal-close-btn');

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });

        modal.querySelector('.modal-send-btn').addEventListener('click', () => {
            const message = modal.querySelector('#contactMessage').value;
            if (message.trim()) {
                showToast('Message sent to seller!');
                modal.remove();
            } else {
                showToast('Please enter a message', 'error');
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEsc);
            }
        });
    }

    // ===== TOAST NOTIFICATION =====
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Initial attachment
    attachSaveListeners();
    attachContactListeners();
    attachViewDetailsListeners();
});