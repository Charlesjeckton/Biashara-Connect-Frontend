    // Sample favorite listings data
    const sampleFavorites = [
        {
            id: 1,
            title: "iPhone 13 Pro 256GB - Excellent Condition",
            price: 85000,
            location: "Nairobi",
            category: "electronics",
            description: "iPhone 13 Pro in excellent condition. 256GB storage, battery health 95%. Includes original box and charger.",
            seller: "TechDeals",
            image: "https://images.unsplash.com/photo-1632661674596-df8be070a6c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            date: "2024-01-15",
            active: true,
            priceDrop: true
        },
        {
            id: 2,
            title: "Sofa Set - 3 Seater + 2 Single Seaters",
            price: 45000,
            location: "Mombasa",
            category: "home",
            description: "Modern sofa set in excellent condition. Leather material, comfortable seating for living room.",
            seller: "HomeFurnishings",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            date: "2024-01-14",
            active: true,
            priceDrop: false
        },
        {
            id: 3,
            title: "Toyota Premio 2018 - Well Maintained",
            price: 1850000,
            location: "Kisumu",
            category: "vehicles",
            description: "Toyota Premio 2018 model. Excellent condition, low mileage, full service history available.",
            seller: "AutoConnect",
            image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            date: "2024-01-12",
            active: true,
            priceDrop: true
        },
        {
            id: 4,
            title: "Professional Web Design Services",
            price: 25000,
            location: "Remote",
            category: "services",
            description: "Custom website design and development for businesses. Responsive design, SEO optimized.",
            seller: "WebCrafters",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            date: "2024-01-10",
            active: true,
            priceDrop: false
        },
        {
            id: 5,
            title: "Maize Harvest - Fresh from Farm",
            price: 2500,
            location: "Eldoret",
            category: "agriculture",
            description: "Fresh maize harvest from our farm. High quality, available in 90kg bags. Delivery available.",
            seller: "FarmFresh",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            date: "2024-01-08",
            active: false,
            priceDrop: false
        },
        {
            id: 6,
            title: "Designer Handbag - Authentic",
            price: 15000,
            location: "Nairobi",
            category: "fashion",
            description: "Authentic designer handbag in excellent condition. Comes with original dust bag and authenticity card.",
            seller: "FashionHub",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            date: "2024-01-05",
            active: true,
            priceDrop: true
        }
    ];

    // DOM Elements
    const savedListingsGrid = document.getElementById('savedListingsGrid');
    const emptyFavorites = document.getElementById('emptyFavorites');
    const favoritesLoader = document.getElementById('favoritesLoader');
    const categoryFilterBtns = document.querySelectorAll('.category-filter-btn');
    const totalFavoritesEl = document.getElementById('totalFavorites');
    const activeListingsEl = document.getElementById('activeListings');
    const priceDropsEl = document.getElementById('priceDrops');
    const categoriesCountEl = document.getElementById('categoriesCount');
    const sortByDateBtn = document.getElementById('sortByDate');
    const sortByPriceBtn = document.getElementById('sortByPrice');
    const clearAllBtn = document.getElementById('clearAll');

    // State
    let currentFavorites = [...sampleFavorites];
    let currentCategory = 'all';
    let sortBy = 'date';

    // Format price with commas
    function formatPrice(price) {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            maximumFractionDigits: 0
        }).format(price);
    }

    // Calculate stats
    function calculateStats(favorites) {
        const total = favorites.length;
        const active = favorites.filter(item => item.active).length;
        const priceDrops = favorites.filter(item => item.priceDrop).length;
        const categories = [...new Set(favorites.map(item => item.category))].length;

        totalFavoritesEl.textContent = total;
        activeListingsEl.textContent = active;
        priceDropsEl.textContent = priceDrops;
        categoriesCountEl.textContent = categories;
    }

    // Create favorite card HTML
    function createFavoriteCard(item) {
        return `
            <div class="favorite-card" data-category="${item.category}" data-id="${item.id}">
                <div class="card-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'">
                    ${item.priceDrop ? '<span class="card-badge"><i class="fas fa-tag me-1"></i>Price Drop</span>' : ''}
                    <button class="favorite-btn active" onclick="toggleFavorite(${item.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <div class="card-price">${formatPrice(item.price)}</div>
                    <div class="card-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${item.location}
                    </div>
                    <p class="card-description">${item.description}</p>
                    <div class="card-footer">
                        <div class="card-seller">
                            <div class="seller-avatar">${item.seller.charAt(0)}</div>
                            <span>${item.seller}</span>
                        </div>
                        <button class="btn-view" onclick="viewListing(${item.id})">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Render favorites grid
    function renderFavorites(favorites) {
        if (favorites.length === 0) {
            emptyFavorites.style.display = 'block';
            savedListingsGrid.innerHTML = '';
        } else {
            emptyFavorites.style.display = 'none';
            savedListingsGrid.innerHTML = favorites.map(createFavoriteCard).join('');
        }
        calculateStats(favorites);
    }

    // Filter by category
    function filterByCategory(category) {
        currentCategory = category;
        let filtered = [...sampleFavorites];

        if (category !== 'all') {
            filtered = filtered.filter(item => item.category === category);
        }

        // Apply sorting
        sortFavorites(filtered, sortBy);
    }

    // Sort favorites
    function sortFavorites(favorites, sortType) {
        const sorted = [...favorites];

        if (sortType === 'date') {
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortType === 'price') {
            sorted.sort((a, b) => a.price - b.price);
        }

        currentFavorites = sorted;
        renderFavorites(sorted);
    }

    // Toggle favorite
    function toggleFavorite(id) {
        const index = sampleFavorites.findIndex(item => item.id === id);
        if (index !== -1) {
            sampleFavorites.splice(index, 1);
            filterByCategory(currentCategory);

            // Show notification
            showNotification('Item removed from favorites', 'info');
        }
    }

    // View listing
    function viewListing(id) {
        showNotification('Redirecting to listing details...', 'success');
        // In a real app, this would redirect to the listing page
        // window.location.href = `/listing.html?id=${id}`;
    }

    // Show notification
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        // Simulate loading delay
        favoritesLoader.style.display = 'block';

        setTimeout(() => {
            favoritesLoader.style.display = 'none';
            filterByCategory('all');
        }, 1000);

        // Category filter event listeners
        categoryFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterByCategory(this.dataset.category);
            });
        });

        // Sort buttons
        sortByDateBtn.addEventListener('click', function() {
            sortBy = 'date';
            sortFavorites(currentFavorites, 'date');
            sortByDateBtn.innerHTML = '<i class="fas fa-sort-amount-down me-1"></i> Newest First';
            sortByPriceBtn.innerHTML = '<i class="fas fa-money-bill-wave me-1"></i> Sort by Price';
        });

        sortByPriceBtn.addEventListener('click', function() {
            sortBy = 'price';
            sortFavorites(currentFavorites, 'price');
            sortByPriceBtn.innerHTML = '<i class="fas fa-sort-amount-down me-1"></i> Price: Low to High';
            sortByDateBtn.innerHTML = '<i class="fas fa-calendar-alt me-1"></i> Sort by Date';
        });

        // Clear all button
        clearAllBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to remove all items from favorites?')) {
                sampleFavorites.length = 0;
                filterByCategory('all');
                showNotification('All favorites cleared', 'info');
            }
        });
    });