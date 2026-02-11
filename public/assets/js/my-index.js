/* =====================================================
   CONFIG
===================================================== */
const API_BASE_URL = "https://biashara-connect-backend.onrender.com/api";
const BACKEND_ROOT = API_BASE_URL.replace("/api", "");
const FALLBACK_IMAGE = "https://via.placeholder.com/300x200?text=No+Image";

/* =====================================================
   HELPER: GET IMAGE URL
===================================================== */
function getImageUrl(url) {
    if (!url) return FALLBACK_IMAGE;

    // Full URL (Cloudinary or external)
    if (url.startsWith("http://") || url.startsWith("https://")) return url;

    // Otherwise, relative path from backend
    return `${BACKEND_ROOT}${url.startsWith("/") ? "" : "/"}${encodeURI(url)}`;
}

/* =====================================================
   MAIN
===================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const listingsGrid = document.getElementById("listingsGrid");
    const resultsCount = document.getElementById("resultsCount");

    loadListings();

    /* -----------------------------
       LOAD LISTINGS FROM API
    ----------------------------- */
    async function loadListings() {
        try {
            const res = await fetch(`${API_BASE_URL}/listings/`);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            renderListings(data);
            updateResultsCount(data.length);
        } catch (error) {
            console.error("Error loading listings:", error);
            listingsGrid.innerHTML =
                `<p class="text-center text-danger">Failed to load listings.</p>`;
        }
    }

    /* -----------------------------
       RENDER LISTINGS
    ----------------------------- */
    function renderListings(listingsArray) {
        listingsGrid.innerHTML = "";

        if (!listingsArray.length) {
            listingsGrid.innerHTML =
                `<p class="text-center text-muted">No listings found.</p>`;
            return;
        }

        listingsArray.forEach(listing => {
            const image = listing.images?.length
                ? getImageUrl(listing.images[0].image)
                : FALLBACK_IMAGE;

            const sellerName = listing.seller_name || "Seller";
            const initials = sellerName
                .split(" ")
                .map(w => w[0])
                .join("")
                .toUpperCase()
                .substring(0, 2);

            const listingCard = document.createElement("div");
            listingCard.className = "listing-card";

            listingCard.innerHTML = `
                <div class="listing-image-container">
                    <img src="${image}" 
                         alt="${listing.title}" 
                         class="listing-image"
                         onerror="this.src='${FALLBACK_IMAGE}'">
                    
                    <div class="condition-badge ${listing.condition === 'new' ? 'new-badge' : listing.condition === 'service' ? 'service-badge' : 'used-badge'}">
                        ${listing.condition === 'new' ? 'New' : listing.condition === 'service' ? 'Service' : 'Used'}
                    </div>

                    <div class="saved-icon" data-listing="${listing.id}">
                        <i class="far fa-heart"></i>
                    </div>
                </div>

                <div class="listing-card-body">
                    <div class="listing-price">KSh ${Number(listing.price).toLocaleString()}</div>
                    <h3 class="listing-title">${listing.title}</h3>
                    <p class="listing-description">${listing.description}</p>
                    <div class="listing-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${listing.area}, ${listing.location}</span>
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

            listingsGrid.appendChild(listingCard);
        });

        attachSaveListeners();
        attachContactListeners();
    }

    /* -----------------------------
       UPDATE RESULTS COUNT
    ----------------------------- */
    function updateResultsCount(total) {
        if (resultsCount) resultsCount.textContent = `Showing ${total} results`;
    }

    /* -----------------------------
       TOGGLE SAVE ICON
    ----------------------------- */
    function attachSaveListeners() {
        document.querySelectorAll(".saved-icon").forEach(icon => {
            icon.addEventListener("click", function () {
                const heart = this.querySelector("i");
                heart.classList.toggle("far");
                heart.classList.toggle("fas");
                this.classList.toggle("active");

                // Optional: API call to save/unsave listing
                const listingId = this.dataset.listing;
                console.log("Toggle save for listing:", listingId);
            });
        });
    }

    /* -----------------------------
       CONTACT BUTTON
    ----------------------------- */
    function attachContactListeners() {
        document.querySelectorAll(".contact-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const listingId = this.dataset.listing;
                alert("Contacting seller for listing: " + listingId);
            });
        });
    }
});
