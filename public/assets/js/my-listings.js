document.addEventListener('DOMContentLoaded', function() {
    console.log('My Listings Page loaded');

    // Sample user listings data
    const userListings = [
        {
            id: 1,
            title: "iPhone 13 Pro 256GB - Space Gray",
            price: 85000,
            category: "electronics",
            status: "active",
            views: 245,
            createdAt: "2024-01-15",
            image: "https://images.unsplash.com/photo-1762512949121-c1fc05b36e1a?q=80&w=871&auto=format&fit=crop",
            condition: "new",
            description: "Brand new iPhone 13 Pro, 256GB storage.",
            inquiries: 12
        },
        {
            id: 2,
            title: "Nike Air Max Running Shoes - Size 42",
            price: 3500,
            category: "fashion",
            status: "sold",
            views: 89,
            createdAt: "2024-01-10",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=60",
            condition: "used",
            description: "Lightly used running shoes.",
            inquiries: 5
        },
        {
            id: 3,
            title: "Professional Plumbing Services",
            price: 2500,
            category: "services",
            status: "active",
            views: 156,
            createdAt: "2024-01-20",
            image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=869&auto=format&fit=crop",
            condition: "new",
            description: "Available for leak repair and installation.",
            inquiries: 8
        },
        {
            id: 4,
            title: "Modern 3-Seater Sofa Set - Beige",
            price: 45000,
            category: "home",
            status: "draft",
            views: 0,
            createdAt: "2024-01-22",
            image: "https://plus.unsplash.com/premium_photo-1673548917423-073963e7afc9?q=80&w=871&auto=format&fit=crop",
            condition: "new",
            description: "Premium fabric, modern design.",
            inquiries: 0
        }
    ];

    // DOM Elements
    const myListingsGrid = document.getElementById('myListingsGrid');
    const emptyListings = document.getElementById('emptyListings');
    const totalListings = document.getElementById('totalListings');
    const activeListingsCount = document.getElementById('activeListings');
    const soldListings = document.getElementById('soldListings');
    const totalViews = document.getElementById('totalViews');
    const filterActive = document.getElementById('filterActive');
    const filterDraft = document.getElementById('filterDraft');
    const filterSold = document.getElementById('filterSold');
    const filterAll = document.getElementById('filterAll');

    let currentFilter = 'all';

    // Initialize
    updateStats();
    renderListings(userListings);

    // Functions
    function updateStats() {
        const total = userListings.length;
        const active = userListings.filter(l => l.status === 'active').length;
        const sold = userListings.filter(l => l.status === 'sold').length;
        const views = userListings.reduce((sum, listing) => sum + listing.views, 0);

        totalListings.textContent = total;
        activeListingsCount.textContent = active;
        soldListings.textContent = sold;
        totalViews.textContent = views;
    }

    function renderListings(listingsArray) {
        myListingsGrid.innerHTML = '';

        if (listingsArray.length === 0) {
            emptyListings.style.display = 'block';
            return;
        }

        emptyListings.style.display = 'none';

        listingsArray.forEach(listing => {
            const listingCard = document.createElement('div');
            listingCard.className = 'my-listing-card';
            listingCard.innerHTML = `
                <div class="my-listing-image-container">
                    <img src="${listing.image}" alt="${listing.title}" class="my-listing-image">
                    <div class="listing-status ${listing.status}-badge">
                        ${listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </div>
                </div>
                <div class="my-listing-content">
                    <div class="my-listing-header">
                        <h3 class="my-listing-title">${listing.title}</h3>
                        <div class="my-listing-price">KSh ${listing.price.toLocaleString()}</div>
                    </div>
                    <div class="my-listing-meta">
                        <div class="meta-item">
                            <i class="fas fa-eye"></i>
                            <span>${listing.views} views</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-comment"></i>
                            <span>${listing.inquiries} inquiries</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${listing.createdAt}</span>
                        </div>
                    </div>
                    <div class="my-listing-actions">
                        <button class="btn-action edit" data-id="${listing.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-action ${listing.status === 'active' ? 'deactivate' : 'activate'}" data-id="${listing.id}">
                            <i class="fas ${listing.status === 'active' ? 'fa-pause' : 'fa-play'}"></i>
                            ${listing.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button class="btn-action delete" data-id="${listing.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `;
            myListingsGrid.appendChild(listingCard);
        });

        attachActionListeners();
    }

    function filterListings(filterType) {
        currentFilter = filterType;

        let filtered = userListings;
        if (filterType !== 'all') {
            filtered = userListings.filter(listing => listing.status === filterType);
        }

        renderListings(filtered);

        // Update active filter button
        [filterAll, filterActive, filterDraft, filterSold].forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`filter${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`).classList.add('active');
    }

    function attachActionListeners() {
        // Edit buttons
        document.querySelectorAll('.btn-action.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                alert(`Edit listing ${id}`);
            });
        });

        // Activate/Deactivate buttons
        document.querySelectorAll('.btn-action.activate, .btn-action.deactivate').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const listing = userListings.find(l => l.id == id);

                if (listing) {
                    listing.status = listing.status === 'active' ? 'inactive' : 'active';
                    updateStats();
                    filterListings(currentFilter);
                }
            });
        });

        // Delete buttons
        document.querySelectorAll('.btn-action.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this listing?')) {
                    const index = userListings.findIndex(l => l.id == id);
                    if (index > -1) {
                        userListings.splice(index, 1);
                        updateStats();
                        filterListings(currentFilter);
                    }
                }
            });
        });
    }

    // Event Listeners
    filterActive.addEventListener('click', () => filterListings('active'));
    filterDraft.addEventListener('click', () => filterListings('draft'));
    filterSold.addEventListener('click', () => filterListings('sold'));
    filterAll.addEventListener('click', () => filterListings('all'));
});