const API_BASE_URL = "https://biashara-connect-backend.onrender.com/api";
const CLOUDINARY_ROOT = "https://res.cloudinary.com/dmunt99au/image/upload";
const FALLBACK_IMAGE = "https://dummyimage.com/300x200/cccccc/000000.png&text=No+Image";

document.addEventListener("DOMContentLoaded", function () {

    const listingsGrid = document.getElementById("listingsGrid");
    const resultsCount = document.getElementById("resultsCount");

    const categoryFilter = document.getElementById("categoryFilter");
    const conditionFilter = document.getElementById("conditionFilter");
    const locationFilter = document.getElementById("locationFilter");
    const priceMin = document.getElementById("priceMin");
    const priceMax = document.getElementById("priceMax");
    const sortFilter = document.getElementById("sortFilter");
    const applyBtn = document.getElementById("applyFilters");
    const resetBtn = document.getElementById("resetFilters");

    let allListings = [];

    loadListings();

    /* ============================= */
    /* IMAGE HANDLER */
    /* ============================= */
    function getImageUrl(path, title) {
        if (!path) {
            return `https://dummyimage.com/300x200/cccccc/000000.png&text=${encodeURIComponent(title)}`;
        }
        if (path.startsWith("http")) return path;
        return `${CLOUDINARY_ROOT}/${path}.jpg`;
    }

    /* ============================= */
    /* LOAD LISTINGS */
    /* ============================= */
    function loadListings() {
        fetch(`${API_BASE_URL}/listings/`)
            .then(res => res.json())
            .then(data => {
                allListings = data;
                applyFilters(); // render immediately
            })
            .catch(err => {
                console.error(err);
                listingsGrid.innerHTML =
                    `<p class="text-danger text-center">Failed to load listings.</p>`;
            });
    }

    /* ============================= */
    /* APPLY FILTERS */
    /* ============================= */
    function applyFilters() {

        const category = categoryFilter.value;
        const condition = conditionFilter.value;
        const location = locationFilter.value;
        const min = priceMin.value ? Number(priceMin.value) : null;
        const max = priceMax.value ? Number(priceMax.value) : null;
        const sort = sortFilter.value;

        let filtered = allListings.filter(listing => {

            if (category && listing.category !== category) return false;

            if (condition && listing.condition !== condition) return false;

            if (location &&
                listing.location.toLowerCase() !== location.toLowerCase())
                return false;

            if (min !== null && Number(listing.price) < min) return false;

            if (max !== null && Number(listing.price) > max) return false;

            return true;
        });

        // Sorting
        switch (sort) {
            case "price-low":
                filtered.sort((a, b) => Number(a.price) - Number(b.price));
                break;

            case "price-high":
                filtered.sort((a, b) => Number(b.price) - Number(a.price));
                break;

            case "newest":
            default:
                filtered.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
        }

        renderListings(filtered);
        resultsCount.textContent = `Showing ${filtered.length} result${filtered.length !== 1 ? "s" : ""}`;
    }

    /* ============================= */
    /* RENDER */
    /* ============================= */
    function renderListings(listings) {

        listingsGrid.innerHTML = "";

        if (!listings.length) {
            listingsGrid.innerHTML =
                `<p class="text-muted text-center">No listings found.</p>`;
            return;
        }

        listings.forEach(listing => {

            const imageUrl =
                listing.images && listing.images.length
                    ? getImageUrl(listing.images[0].image, listing.title)
                    : getImageUrl(null, listing.title);

            const sellerName = listing.seller_name || "Seller";

            const initials = sellerName
                .split(" ")
                .map(w => w[0])
                .join("")
                .toUpperCase()
                .substring(0, 2);

            const card = document.createElement("div");
            card.className = "listing-card";

            card.innerHTML = `
                <div class="listing-image-container">
                    <img src="${imageUrl}" 
                         alt="${listing.title}" 
                         class="listing-image"
                         onerror="this.src='${FALLBACK_IMAGE}'">

                    <div class="condition-badge ${listing.condition === 'new' ? 'new-badge' : ''}">
                        ${listing.condition === 'new'
                            ? 'New'
                            : listing.condition === 'service'
                                ? 'Service'
                                : 'Used'}
                    </div>

                    <div class="saved-icon" data-listing="${listing.id}">
                        <i class="far fa-heart"></i>
                    </div>
                </div>

                <div class="listing-card-body">
                    <div class="listing-price">
                        KSh ${Number(listing.price).toLocaleString()}
                    </div>

                    <h3 class="listing-title">${listing.title}</h3>

                    <p class="listing-description">
                        ${listing.description || ""}
                    </p>

                    <div class="listing-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${listing.area || ""}, ${listing.location || ""}</span>
                    </div>
                </div>

                <div class="listing-card-footer">
                    <div class="seller-info">
                        <div class="seller-avatar">${initials}</div>
                        <div class="seller-name">${sellerName}</div>
                    </div>

                    <button class="contact-btn" data-listing="${listing.id}">
                        <i class="fas fa-message"></i> Contact
                    </button>
                </div>
            `;

            listingsGrid.appendChild(card);
        });
    }

    /* ============================= */
    /* EVENTS */
    /* ============================= */

    // Apply button still works
    applyBtn.addEventListener("click", applyFilters);

    // Auto filter on dropdown change
    [categoryFilter, conditionFilter, locationFilter, sortFilter]
        .forEach(filter => {
            filter.addEventListener("change", applyFilters);
        });

    // Auto filter on price typing (debounced)
    let typingTimer;
    [priceMin, priceMax].forEach(input => {
        input.addEventListener("input", () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(applyFilters, 400);
        });
    });

    // Reset
    resetBtn.addEventListener("click", () => {
        categoryFilter.value = "";
        conditionFilter.value = "";
        locationFilter.value = "";
        priceMin.value = "";
        priceMax.value = "";
        sortFilter.value = "newest";
        applyFilters();
    });

});
