// File upload preview handler
document.getElementById('images').addEventListener('change', function (e) {
    const container = document.querySelector('.file-upload-container');
    const files = e.target.files;

    if (files.length > 0) {
        container.innerHTML = `
                <i class="fas fa-check-circle text-success"></i>
                <div class="file-upload-label">${files.length} image${files.length > 1 ? 's' : ''} selected</div>
                <div class="file-upload-hint">Click to change or add more images</div>
            `;
        container.style.borderColor = '#1a7f5f';
        container.style.backgroundColor = '#e8f4ef';
    }

    // Re-add click handler
    container.onclick = function () {
        document.getElementById('images').click();
    };
});

// Form submission handler
document.getElementById('sellForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Here you would typically send the form data to your server
    // For demo purposes, we'll show a success message
    alert('Your listing has been submitted successfully! It will be reviewed and published shortly.');

    // Reset form after submission
    this.reset();
    document.querySelector('.file-upload-container').innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <div class="file-upload-label">Click to upload images</div>
            <div class="file-upload-hint">Upload up to 10 images (JPEG, PNG, GIF) • Max 5MB each</div>
        `;
});

