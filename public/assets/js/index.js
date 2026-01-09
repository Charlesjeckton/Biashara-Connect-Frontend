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

    // Auto-apply filters when inputs change (optional)
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
                    // Potential function: saveToFavorites(listingId);
                } else {
                    heartIcon.classList.remove('fas');
                    heartIcon.classList.add('far');
                    this.classList.remove('active');
                    // Potential function: removeFromFavorites(listingId);
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
                alert('Contacting seller for listing: ' + listingId);
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

                alert(`Listing Details:\n\n` +
                      `Title: ${listing.title}\n` +
                      `Price: KSh ${listing.price.toLocaleString()}\n` +
                      `Category: ${listing.category}\n` +
                      `Condition: ${listing.condition}\n` +
                      `Location: ${listing.area}\n` +
                      `Seller: ${listing.seller.name}\n\n` +
                      `Description:\n${listing.description}`);
            });
        });
    }

    // Initial attachment
    attachSaveListeners();
    attachContactListeners();
    attachViewDetailsListeners();
});