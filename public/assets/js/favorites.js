// ===============================
// Sample favorite listings data
// ===============================
const sampleFavorites = [
    {
        id: 1,
        title: "iPhone 13 Pro 256GB - Excellent Condition",
        price: 85000,
        location: "Nairobi",
        category: "electronics",
        description: "iPhone 13 Pro in excellent condition. 256GB storage, battery health 95%. Includes original box and charger.",
        seller: "Tech Deals",
        image: "https://images.unsplash.com/photo-1762512949121-c1fc05b36e1a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        seller: "Home Furnishings",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80",
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
        seller: "Auto Connect",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=500&q=80",
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
        seller: "Farm Fresh",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
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
        seller: "Fashion Hub",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80",
        date: "2024-01-05",
        active: true,
        priceDrop: true
    }
];

// ===============================
// DOM Elements
// ===============================
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

// ===============================
// State
// ===============================
let currentFavorites = [...sampleFavorites];
let currentCategory = 'all';
let sortBy = 'date';

// ===============================
// Helpers
// ===============================
function formatPrice(price) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        maximumFractionDigits: 0
    }).format(price);
}

// PROFESSIONAL INITIALS (TD, HF, AC)
function getSellerInitials(name) {
    const words = name.trim().split(" ");
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// ===============================
// Stats
// ===============================
function calculateStats(favorites) {
    totalFavoritesEl.textContent = favorites.length;
    activeListingsEl.textContent = favorites.filter(i => i.active).length;
    priceDropsEl.textContent = favorites.filter(i => i.priceDrop).length;
    categoriesCountEl.textContent = new Set(favorites.map(i => i.category)).size;
}

// ===============================
// Card Renderer
// ===============================
function createFavoriteCard(item) {
    return `
        <div class="favorite-card" data-category="${item.category}">
            <div class="card-image">
                <img src="${item.image}" alt="${item.title}">
                ${item.priceDrop ? `<span class="card-badge">Price Drop</span>` : ''}
                <button class="favorite-btn active" onclick="toggleFavorite(${item.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>

            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-price">${formatPrice(item.price)}</div>
                <div class="card-location">
                    <i class="fas fa-map-marker-alt"></i> ${item.location}
                </div>
                <p class="card-description">${item.description}</p>

                <div class="card-footer">
                    <div class="card-seller">
                        <div class="seller-avatar">${getSellerInitials(item.seller)}</div>
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

// ===============================
// Rendering & Filters
// ===============================
function renderFavorites(favorites) {
    if (!favorites.length) {
        emptyFavorites.style.display = 'block';
        savedListingsGrid.innerHTML = '';
        return;
    }

    emptyFavorites.style.display = 'none';
    savedListingsGrid.innerHTML = favorites.map(createFavoriteCard).join('');
    calculateStats(favorites);
}

function filterByCategory(category) {
    currentCategory = category;
    let filtered = [...sampleFavorites];

    if (category !== 'all') {
        filtered = filtered.filter(item => item.category === category);
    }

    sortFavorites(filtered, sortBy);
}

function sortFavorites(favorites, type) {
    favorites.sort((a, b) =>
        type === 'price'
            ? a.price - b.price
            : new Date(b.date) - new Date(a.date)
    );

    currentFavorites = favorites;
    renderFavorites(favorites);
}

// ===============================
// Actions
// ===============================
function toggleFavorite(id) {
    const index = sampleFavorites.findIndex(i => i.id === id);
    if (index !== -1) {
        sampleFavorites.splice(index, 1);
        filterByCategory(currentCategory);
        showNotification('Item removed from favorites', 'info');
    }
}

function viewListing() {
    showNotification('Redirecting to listing details...', 'success');
}

function showNotification(message, type) {
    const el = document.createElement('div');
    el.className = `alert alert-${type}`;
    el.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
}

// ===============================
// Init
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    favoritesLoader.style.display = 'block';

    setTimeout(() => {
        favoritesLoader.style.display = 'none';
        filterByCategory('all');
    }, 800);

    categoryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterByCategory(btn.dataset.category);
        });
    });

    sortByDateBtn.onclick = () => sortFavorites(currentFavorites, 'date');
    sortByPriceBtn.onclick = () => sortFavorites(currentFavorites, 'price');

    clearAllBtn.onclick = () => {
        if (confirm('Clear all favorites?')) {
            sampleFavorites.length = 0;
            renderFavorites([]);
        }
    };
});
