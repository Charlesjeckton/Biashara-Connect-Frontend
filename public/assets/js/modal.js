const API_BASE = "https://biashara-connect-backend.onrender.com";

// ===== Buyer Registration =====
const buyerForm = document.getElementById("buyerForm");

buyerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
        first_name: buyerForm.first_name.value,
        last_name: buyerForm.last_name.value,
        email: buyerForm.email.value,
        phone: buyerForm.phone.value,
        password: buyerForm.password.value,
        location: buyerForm.location.value,
    };

    try {
        const res = await fetch(`${API_BASE}/api/auth/register/buyer/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.message || "Buyer registered successfully!");
            buyerForm.reset();
            // Optionally close modal
            // bootstrap.Modal.getInstance(document.getElementById('yourModalId')).hide();
        } else {
            // Display errors
            alert(JSON.stringify(data));
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred. Please try again.");
    }
});


// ===== Seller Registration =====
const sellerForm = document.getElementById("sellerForm");

sellerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
        first_name: sellerForm.first_name.value,
        last_name: sellerForm.last_name.value,
        email: sellerForm.email.value,
        phone: sellerForm.phone.value,
        password: sellerForm.password.value,
        location: sellerForm.querySelector("select").value,
        // Add additional seller fields here if your serializer expects them
        // For example: business_name, business_type, business_category
    };

    try {
        const res = await fetch(`${API_BASE}/api/auth/register/seller/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.message || "Seller registered successfully!");
            sellerForm.reset();
        } else {
            alert(JSON.stringify(data));
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred. Please try again.");
    }
});
