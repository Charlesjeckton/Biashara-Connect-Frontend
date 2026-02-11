// ================= RENDER LISTINGS =================
function renderListings(listingsArray) {
    const listingsGrid = document.getElementById("listingsGrid");
    listingsGrid.innerHTML = "";

    if (!listingsArray.length) {
        listingsGrid.innerHTML =
            `<p class="text-center text-muted">No listings found.</p>`;
        return;
    }

    listingsArray.forEach(listing => {
        // Prepend backend URL to image path
        const image = listing.images && listing.images.length
            ? `https://biashara-connect-backend.onrender.com${listing.images[0].image}`
            : "/assets/img/no-image.png";

        const sellerName = listing.seller_name || "Seller";

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
                    <div class="seller-avatar">${sellerName.split(" ").map(n => n[0]).join("").toUpperCase()}</div>
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