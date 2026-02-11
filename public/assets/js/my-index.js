const API_BASE_URL = "https://biashara-connect-backend.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {
    const listingsGrid = document.getElementById("listingsGrid");
    const resultsCount = document.getElementById("resultsCount");

    loadListings();

    async function loadListings() {
        try {
            const response = await fetch(`${API_BASE_URL}/listings/`);
            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();

            renderListings(data);
            updateResultsCount(data.length);
        } catch (error) {
            console.error("Error loading listings:", error);
            listingsGrid.innerHTML = `
                <p class="text-center text-danger">Failed to load listings.</p>
            `;
        }
    }

    function renderListings(listings) {
        listingsGrid.innerHTML = "";

        if (!listings.length) {
            listingsGrid.innerHTML = `
                <p class="text-center text-muted">No listings found.</p>
            `;
            return;
        }

        listings.forEach(listing => {

            // ✅ Use image_url (Cloudinary full URL)
            const image =
                listing.images?.[0]?.image_url ||
                "/assets/img/no-image.png";

            const sellerName = listing.seller_name || "Seller";
            const sellerImage = listing.seller_image || null;
            const sellerVerified = listing.seller_verified || false;

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
                    <img src="${image}" 
                         alt="${listing.title}" 
                         class="listing-image"
                         onerror="this.src='/assets/img/no-image.png'">

                    <div class="condition-badge ${listing.condition === 'new' ? 'new-badge' : ''}">
                        ${
                            listing.condition === 'new' ? 'New' :
                            listing.condition === 'service' ? 'Service' : 'Used'
                        }
                    </div>

                    <div class="saved-icon" data-listing="${listing.id}">
                        <i class="far fa-heart"></i>
                    </div>
                </div>

                <div class="listing-card-body">
                    <div class="listing-price">
                        KSh ${Number(listing.price || 0).toLocaleString()}
                    </div>

                    <h3 class="listing-title">${listing.title}</h3>

                    <p class="listing-description">
                        ${listing.description || ""}
                    </p>

                    <div class="listing-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${listing.area}, ${listing.location}</span>
                    </div>
                </div>

                <div class="listing-card-footer">
                    <div class="seller-info">
                        ${
                            sellerImage
                                ? `<img src="${sellerImage}" class="seller-avatar-img"
                                        onerror="this.style.display='none'">`
                                : `<div class="seller-avatar">${initials}</div>`
                        }

                        <div class="seller-name">
                            ${sellerName}
                            ${
                                sellerVerified
                                    ? `<i class="fas fa-check-circle verified-badge"></i>`
                                    : ""
                            }
                        </div>
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
            icon.addEventListener("click", () => {
                const heart = icon.querySelector("i");
                heart.classList.toggle("far");
                heart.classList.toggle("fas");
                icon.classList.toggle("active");
            });
        });
    }

    function attachContactListeners() {
        document.querySelectorAll(".contact-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const listingId = btn.getAttribute("data-listing");
                alert(`Contacting seller for listing: ${listingId}`);
            });
        });
    }
});