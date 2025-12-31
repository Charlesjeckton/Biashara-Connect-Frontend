document.addEventListener('DOMContentLoaded', function() {
    console.log('Biashara Connect Listings Page loaded');

    // ===== Save Listing Functionality =====
    const savedIcons = document.querySelectorAll('.saved-icon');
    savedIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const listingId = this.getAttribute('data-listing');
            const heartIcon = this.querySelector('i');

            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                this.classList.add('active');
                // Potential function: saveToFavorites(listingId);
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                this.classList.remove('active');
                // Potential function: removeFromFavorites(listingId);
            }
        });
    });

    // ===== Contact Button Placeholder =====
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const listingId = this.getAttribute('data-listing');
            alert('Contacting seller for listing: ' + listingId);
        });
    });
});