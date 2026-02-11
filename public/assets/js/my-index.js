const API_BASE_URL = "https://biashara-connect-backend.onrender.com/api";
const BACKEND_ROOT = API_BASE_URL.replace("/api", ""); // https://biashara-connect-backend.onrender.com
const FALLBACK_IMAGE = "/assets/img/no-image.png"; // fallback if no image

document.addEventListener("DOMContentLoaded", function () {
    const listingsGrid = document.getElementById("listingsGrid");
    const resultsCount = document.getElementById("resultsCount");

    loadListings();

    function getImageUrl(url) {
        if (!url) return FALLBACK_IMAGE;
        if (url.startsWith("http://") || url.startsWith("https://")) return url;
        // prepend backend root
        return `${BACKEND_ROOT}/${encodeURI(url)}`;
    }

    function loadListings() {
        fetch(`${API_BASE_URL}/listings/`)
            .then(res => res.json())
            .then(data => {
                renderListings(data);
                updateResultsCount(data.length);
            })
            .catch(error => {
                console.error("Error loading listings:", error);
                listingsGrid.innerHTML =
                    `<p class="text-center text-danger">Failed to load listings.</p>`;
            });
    }

    function renderListings(listingsArray) {
        listingsGrid.innerHTML = "";

        if (!listingsArray.length) {
            listingsGrid.innerHTML =
                `<p class="text-center text-muted">No listings found.</p>`;
            return;
        }

        listingsArray.forEach(listing => {
            const imageUrl =
                listing.images && listing.images.length
                    ? getImageUrl(listing.images[0].image)
                    : FALLBACK_IMAGE;

            const sellerName = listing.seller_name || "Seller";
            const initials = sellerName
                .split(" ")
                .map(word => word[0])
                .join("")
                .toUpperCase()
                .substring(0, 2);

            const listingCard = document.createElement("div");
            listingCard.className = "listing-card";

            listingCard.innerHTML = `
                <div class="listing-image-container">
                    <img src="${imageUrl}" alt="${listing.title}" class="listing-image" onerror="this.src='${FALLBACK_IMAGE}'">
                    
                    <div class="condition-badge ${listing.condition === 'new' ? 'new-badge' : ''}">
                        ${listing.condition === 'new' ? 'New' :
                            listing.condition === 'service' ? 'Service' : 'Used'}
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
                        ${listing.description}
                    </p>

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

    function updateResultsCount(total) {
        resultsCount.textContent = `Showing ${total} results`;
    }

    function attachSaveListeners() {
        document.querySelectorAll(".saved-icon").forEach(icon => {
            icon.addEventListener("click", function () {
                const heart = this.querySelector("i");
                heart.classList.toggle("far");
                heart.classList.toggle("fas");
                this.classList.toggle("active");
            });
        });
    }

    function attachContactListeners() {
        document.querySelectorAll(".contact-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const listingId = this.getAttribute("data-listing");
                alert("Contacting seller for listing: " + listingId);
            });
        });
    }
});
