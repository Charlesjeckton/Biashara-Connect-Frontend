const API_BASE_URL = "https://biashara-connect-backend.onrender.com/api";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Biashara Connect Listings Page loaded");

    const listingsGrid = document.getElementById("listingsGrid");
    const resultsCount = document.getElementById("resultsCount");

    loadListings();

    // ================= LOAD FROM BACKEND =================
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

    // ================= RENDER LISTINGS =================
    function renderListings(listingsArray) {
        listingsGrid.innerHTML = "";

        if (!listingsArray.length) {
            listingsGrid.innerHTML =
                `<p class="text-center text-muted">No listings found.</p>`;
            return;
        }

        listingsArray.forEach(listing => {

            // Cloudinary image (first image or fallback)
            const image =
                listing.images && listing.images.length
                    ? listing.images[0].image
                    : "/assets/img/no-image.png";

            // Seller initials
            const sellerName = listing.seller || "Seller";
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
                    <img src="${image}" alt="${listing.title}" class="listing-image">
                    
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

    // ================= SAVE BUTTON =================
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

    // ================= CONTACT BUTTON =================
    function attachContactListeners() {
        document.querySelectorAll(".contact-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const listingId = this.getAttribute("data-listing");
                alert("Contacting seller for listing: " + listingId);
            });
        });
    }
});