// FAQ Data
const faqData = [
    {
        id: 1,
        question: "How do I post a listing on BiasharaConnect?",
        answer: "To post a listing, click on the 'Sell & Earn' tab in the main navigation. Fill in the required details including product name, description, price, category, and upload clear images. Once submitted, your listing will be reviewed and published within 24 hours.",
        category: "selling",
        tags: ["listing", "selling", "post"]
    },
    {
        id: 2,
        question: "How do I edit or delete my listing?",
        answer: "Go to your profile page and click on 'My Listings'. You'll see all your active listings with options to edit or delete each one. Edited listings may require re-approval if significant changes are made.",
        category: "selling",
        tags: ["edit", "delete", "listing"]
    },
    {
        id: 3,
        question: "How do I contact sellers?",
        answer: "Click on any listing to view its details. You'll find a 'Contact Seller' button that allows you to send a message directly to the seller. All communication should happen through our platform for safety and record-keeping.",
        category: "buying",
        tags: ["contact", "seller", "message"]
    },
    {
        id: 4,
        question: "What payment options are available?",
        answer: "We support M-Pesa, Airtel Money, bank transfers, and cash on delivery for certain categories. Always use our secure payment system for protected transactions. Never send money directly to sellers outside our platform.",
        category: "payments",
        tags: ["payment", "mpesa", "bank"]
    },
    {
        id: 5,
        question: "How does shipping work?",
        answer: "Sellers can choose to offer shipping through our partnered logistics companies. Shipping costs are calculated based on item size, weight, and destination. Buyers can track their shipments directly from their account dashboard.",
        category: "buying",
        tags: ["shipping", "delivery", "logistics"]
    },
    {
        id: 6,
        question: "Is my personal information safe?",
        answer: "Yes, we use industry-standard encryption to protect all personal data. We never share your contact information without your consent. Read our Privacy Policy for more details on data protection.",
        category: "safety",
        tags: ["privacy", "security", "data"]
    },
    {
        id: 7,
        question: "How do I reset my password?",
        answer: "Click on 'Forgot Password' on the login page. Enter your email address and we'll send you a password reset link. The link expires in 1 hour for security reasons.",
        category: "account",
        tags: ["password", "login", "account"]
    },
    {
        id: 8,
        question: "What should I do if I encounter a scam?",
        answer: "Immediately report the user or listing using the 'Report' button. Contact our support team with details of the incident. Never share personal financial information or send money outside our platform.",
        category: "safety",
        tags: ["scam", "report", "safety"]
    },
    {
        id: 9,
        question: "Are there fees for selling on BiasharaConnect?",
        answer: "We charge a small commission fee only after a successful sale. Listing items is completely free. The commission fee is 5% of the final sale price, which helps us maintain and improve the platform.",
        category: "selling",
        tags: ["fees", "commission", "cost"]
    },
    {
        id: 10,
        question: "How long do listings remain active?",
        answer: "Listings remain active for 30 days. You'll receive a notification 3 days before expiration to renew your listing. You can renew listings up to 3 times before needing to create a new one.",
        category: "selling",
        tags: ["duration", "expiry", "renew"]
    }
];

// DOM Elements
const faqContainer = document.getElementById('faqContainer');
const faqCategoryBtns = document.querySelectorAll('.faq-category-btn');
const loadMoreFaqBtn = document.getElementById('loadMoreFaq');
const supportForm = document.getElementById('supportForm');
const helpSearchInput = document.querySelector('.help-search-input');
const helpSearchBtn = document.querySelector('.help-search-btn');

// State
let currentCategory = 'all';
let displayedFaqs = 5;
const faqsPerLoad = 5;

// Create FAQ item HTML
function createFaqItem(faq) {
    return `
            <div class="faq-item" data-category="${faq.category}" data-tags="${faq.tags.join(',')}">
                <button class="faq-question" onclick="toggleFaq(${faq.id})">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer" id="faqAnswer${faq.id}">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `;
}

// Toggle FAQ answer
function toggleFaq(id) {
    const answer = document.getElementById(`faqAnswer${id}`);
    const question = answer.previousElementSibling;

    question.classList.toggle('active');
    answer.classList.toggle('active');
}

// Filter FAQs by category
function filterFaqs(category) {
    currentCategory = category;
    displayedFaqs = 5;

    let filtered = faqData;
    if (category !== 'all') {
        filtered = faqData.filter(faq => faq.category === category);
    }

    renderFaqs(filtered.slice(0, displayedFaqs));
    updateLoadMoreButton(filtered.length);
}

// Render FAQs
function renderFaqs(faqs) {
    if (faqs.length === 0) {
        faqContainer.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">No questions found in this category</h5>
                    <p class="text-muted">Try selecting a different category or use the search box above</p>
                </div>
            `;
        loadMoreFaqBtn.style.display = 'none';
    } else {
        faqContainer.innerHTML = faqs.map(createFaqItem).join('');
        loadMoreFaqBtn.style.display = 'block';
    }
}

// Update load more button
function updateLoadMoreButton(totalFaqs) {
    if (displayedFaqs >= totalFaqs) {
        loadMoreFaqBtn.style.display = 'none';
    } else {
        loadMoreFaqBtn.style.display = 'block';
        loadMoreFaqBtn.textContent = `Load More (${totalFaqs - displayedFaqs} remaining)`;
    }
}

// Load more FAQs
function loadMoreFaqs() {
    let filtered = faqData;
    if (currentCategory !== 'all') {
        filtered = faqData.filter(faq => faq.category === currentCategory);
    }

    displayedFaqs = Math.min(displayedFaqs + faqsPerLoad, filtered.length);
    renderFaqs(filtered.slice(0, displayedFaqs));
    updateLoadMoreButton(filtered.length);
}

// Search FAQs
function searchFaqs(query) {
    query = query.toLowerCase().trim();

    if (!query) {
        filterFaqs(currentCategory);
        return;
    }

    const results = faqData.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
    );

    displayedFaqs = 5;
    renderFaqs(results.slice(0, displayedFaqs));
    updateLoadMoreButton(results.length);

    // Update category buttons
    faqCategoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === 'all') {
            btn.classList.add('active');
        }
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    // Load initial FAQs
    filterFaqs('all');

    // Category filter event listeners
    faqCategoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            faqCategoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterFaqs(this.dataset.category);
        });
    });

    // Load more FAQs button
    loadMoreFaqBtn.addEventListener('click', loadMoreFaqs);

    // Search functionality
    helpSearchBtn.addEventListener('click', () => {
        searchFaqs(helpSearchInput.value);
    });

    helpSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchFaqs(helpSearchInput.value);
        }
    });

    // Support form submission
    supportForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // In a real app, this would send data to your server
        const formData = {
            name: document.getElementById('supportName').value,
            email: document.getElementById('supportEmail').value,
            category: document.getElementById('supportCategory').value,
            priority: document.getElementById('supportPriority').value,
            message: document.getElementById('supportMessage').value
        };

        console.log('Support request submitted:', formData);

        // Show success message
        showNotification('Your support request has been submitted! We\'ll respond within 24 hours.', 'success');

        // Reset form
        this.reset();

        // Scroll to top of form
        document.getElementById('contact').scrollIntoView({behavior: 'smooth', block: 'start'});
    });

    // Quick link cards hover effect
    document.querySelectorAll('.quick-link-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
