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

        let filtered = [...allListings];

        // Category
        if (categoryFilter.value) {
            filtered = filtered.filter(l =>
                l.category === categoryFilter.value
            );
        }

        // Condition
        if (conditionFilter.value) {
            filtered = filtered.filter(l =>
                l.condition === conditionFilter.value
            );
        }

        // Location (case insensitive)
        if (locationFilter.value) {
            filtered = filtered.filter(l =>
                l.location.toLowerCase() === locationFilter.value.toLowerCase()
            );
        }

        // Price Range
        if (priceMin.value) {
            filtered = filtered.filter(l =>
                Number(l.price) >= Number(priceMin.value)
            );
        }

        if (priceMax.value) {
            filtered = filtered.filter(l =>
                Number(l.price) <= Number(priceMax.value)
            );
        }

        // Sorting
        if (sortFilter.value === "price-low") {
            filtered.sort((a, b) => Number(a.price) - Number(b.price));
        }

        if (sortFilter.value === "price-high") {
            filtered.sort((a, b) => Number(b.price) - Number(a.price));
        }

        if (sortFilter.value === "newest") {
            filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        renderListings(filtered);
        resultsCount.textContent = `Showing ${filtered.length} results`;
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
                </div>

                <div class="listing-card-body">
                    <div class="listing-price">
                        KSh ${Number(listing.price).toLocaleString()}
                    </div>

                    <h3 class="listing-title">${listing.title}</h3>

                    <p>${listing.description}</p>

                    <div class="listing-location">
                        ${listing.area}, ${listing.location}
                    </div>
                </div>

                <div class="listing-card-footer">
                    <div class="seller-info">
                        <div class="seller-avatar">${initials}</div>
                        <div>${sellerName}</div>
                    </div>
                </div>
            `;

            listingsGrid.appendChild(card);
        });
    }

    /* ============================= */
    /* EVENTS */
    /* ============================= */
    applyBtn.addEventListener("click", applyFilters);
    sortFilter.addEventListener("change", applyFilters);

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
