document.addEventListener('DOMContentLoaded', function () {

    const API_URL = "https://biashara-connect-backend.onrender.com/api/listings/";

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

    let allListings = [];

    // ================= FETCH LISTINGS FROM DJANGO =================
    async function fetchListings(filters = {}) {
        try {
            let url = API_URL;

            const params = new URLSearchParams(filters).toString();
            if (params) {
                url += `?${params}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            allListings = data;
            applyFilters();

        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    }

    // ================= APPLY FILTERS =================
    function applyFilters() {
        const category = categoryFilter.value;
        const condition = conditionFilter.value;
        const location = locationFilter.value;
        const minPrice = priceMin.value ? parseInt(priceMin.value) : 0;
        const maxPrice = priceMax.value ? parseInt(priceMax.value) : Infinity;

        let filteredListings = allListings.filter(listing => {

            if (category && listing.category !== category) return false;
            if (condition && listing.condition !== condition) return false;
            if (location && listing.location !== location) return false;
            if (listing.price < minPrice || listing.price > maxPrice) return false;

            return true;
        });

        filteredListings = sortListings(filteredListings, sortFilter.value);

        renderListings(filteredListings);
        updateResultsCount(filteredListings.length, allListings.length);
    }

    // ================= SORT =================
    function sortListings(listingsArray, sortBy) {
        const sorted = [...listingsArray];

        switch (sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'newest':
            default:
                return sorted.sort((a, b) => b.id - a.id);
        }
    }

    // ================= RENDER =================
    function renderListings(listingsArray) {
        listingsGrid.innerHTML = '';

        if (!listingsArray.length) {
            listingsGrid.innerHTML = "<p>No listings found.</p>";
            return;
        }

        listingsArray.forEach(listing => {

            // Cloudinary image support
            const image = listing.images?.length
                ? listing.images[0].image
                : "https://via.placeholder.com/400x300?text=No+Image";

            const listingCard = document.createElement('div');
            listingCard.className = 'listing-card';

            listingCard.innerHTML = `
                <div class="listing-image-container">
                    <img src="${image}" alt="${listing.title}" class="listing-image">
                </div>

                <div class="listing-card-body">
                    <div class="listing-price">
                        KSh ${Number(listing.price).toLocaleString()}
                    </div>

                    <h3 class="listing-title">${listing.title}</h3>

                    <p class="listing-description">
                        ${listing.description?.substring(0, 100) || ""}
                    </p>

                    <div class="listing-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${listing.area || listing.location}</span>
                    </div>
                </div>

                <div class="listing-card-footer">
                    <button class="contact-btn" data-id="${listing.id}">
                        Contact
                    </button>
                </div>
            `;

            listingsGrid.appendChild(listingCard);
        });
    }

    function updateResultsCount(shown, total) {
        resultsCount.textContent = `Showing ${shown} of ${total} results`;
    }

    function resetFilters() {
        categoryFilter.value = '';
        conditionFilter.value = '';
        locationFilter.value = '';
        priceMin.value = '';
        priceMax.value = '';
        sortFilter.value = 'newest';

        renderListings(allListings);
        updateResultsCount(allListings.length, allListings.length);
    }

    // ================= EVENT LISTENERS =================
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    sortFilter.addEventListener('change', applyFilters);

    // ================= INITIAL LOAD =================
    fetchListings();
});