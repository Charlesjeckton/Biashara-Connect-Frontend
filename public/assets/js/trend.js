// assets/js/analytics.js

// Sample data for analytics
const topListingsData = [
    {
        id: 1,
        title: "iPhone 13 Pro 256GB - Space Gray",
        category: "Electronics",
        views: 420,
        favorites: 28,
        contacts: 15,
        image: "https://images.unsplash.com/photo-1762512949121-c1fc05b36e1a?q=80&w=400&auto=format&fit=crop",
        performance: "high",
        daysActive: 7
    },
    {
        id: 2,
        title: "Nike Air Max Running Shoes - Size 42",
        category: "Fashion",
        views: 380,
        favorites: 22,
        contacts: 12,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=400&auto=format&fit=crop",
        performance: "high",
        daysActive: 5
    },
    {
        id: 3,
        title: "Modern 3-Seater Sofa Set - Beige",
        category: "Home & Garden",
        views: 320,
        favorites: 18,
        contacts: 10,
        image: "https://plus.unsplash.com/premium_photo-1673548917423-073963e7afc9?q=80&w=400&auto=format&fit=crop",
        performance: "medium",
        daysActive: 10
    },
    {
        id: 4,
        title: "Toyota Premio 2015 - Mint Condition",
        category: "Vehicles",
        views: 290,
        favorites: 15,
        contacts: 8,
        image: "https://images.unsplash.com/photo-1638618164682-12b986ec2a75?q=80&w=400&auto=format&fit=crop",
        performance: "medium",
        daysActive: 14
    },
    {
        id: 5,
        title: "Professional Plumbing Services",
        category: "Services",
        views: 250,
        favorites: 12,
        contacts: 7,
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=400&auto=format&fit=crop",
        performance: "low",
        daysActive: 3
    }
];

// Initialize analytics functionality
function initAnalytics() {
    console.log('Initializing analytics...');

    // Set up event listeners
    setupEventListeners();

    // Initialize charts
    initializeCharts();

    // Populate top listings
    populateTopListings();

    // Set current date in hero if needed
    setCurrentDate();
}

// Set up all event listeners
function setupEventListeners() {
    // Time period selector
    document.querySelectorAll('.time-period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-period-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadAnalyticsData(this.dataset.period);
        });
    });

    // Refresh listings button
    const refreshBtn = document.getElementById('refreshListings');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshListings);
    }

    // Export buttons
    document.getElementById('exportPDF')?.addEventListener('click', exportPDF);
    document.getElementById('exportCSV')?.addEventListener('click', exportCSV);
    document.getElementById('exportExcel')?.addEventListener('click', exportExcel);

    // Chart action buttons
    document.getElementById('toggleChartType')?.addEventListener('click', toggleChartType);
    document.getElementById('downloadChart')?.addEventListener('click', downloadChart);
}

// Set current date in hero section
function setCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Calculate conversion rate and determine performance
function calculatePerformance(views, contacts) {
    const conversionRate = ((contacts / views) * 100).toFixed(1);
    let performance;
    if (conversionRate > 4) {
        performance = "high";
    } else if (conversionRate > 2) {
        performance = "medium";
    } else {
        performance = "low";
    }
    return { conversionRate, performance };
}

// Populate top listings table
function populateTopListings() {
    const tableBody = document.getElementById('topListingsTable');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (topListingsData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-table">
                    <i class="fas fa-chart-line"></i>
                    <p>No performance data available</p>
                    <button class="action-btn view" onclick="refreshListings()">
                        <i class="fas fa-sync-alt me-2"></i>Refresh Data
                    </button>
                </td>
            </tr>
        `;
        return;
    }

    topListingsData.forEach(listing => {
        const { conversionRate, performance } = calculatePerformance(listing.views, listing.contacts);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="listing-item">
                    <div class="analytics-listing-image">
                        <img src="${listing.image}" alt="${listing.title}" 
                             loading="lazy" 
                             onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTAiIGZpbGw9IiNFODhGNUU5Ii8+CjxwYXRoIGQ9Ik0zMCAyMEMyNC40NzcxIDIwIDE5LjUyMjkgMjQuNDc3MSAyMCAzMEMyMCAzNS41MjI5IDI0LjQ3NzEgNDAgMzAgNDBDMzUuNTIyOSA0MCA0MCAzNS41MjI5IDQwIDMwQzQwIDI0LjQ3NzEgMzUuNTIyOSAyMCAzMCAyMFoiIGZpbGw9IiMyRThCNTciLz4KPHBhdGggZD0iTTQ0IDM5TDM5IDMzTDMzIDM5TDI3IDMzTDIyIDM5TDE2IDMzTDEwIDM5VjQ5SDQ0VjM5WiIgZmlsbD0iIzJFOEI1NyIvPgo8L3N2Zz4='">
                    </div>
                    <div class="listing-info">
                        <h5>${listing.title}</h5>
                        <p>${listing.category} • ${listing.daysActive} days active</p>
                    </div>
                </div>
            </td>
            <td><strong>${listing.views.toLocaleString()}</strong></td>
            <td><strong>${listing.favorites}</strong></td>
            <td><strong>${listing.contacts}</strong></td>
            <td>
                <span class="performance-badge ${performance}">
                    <i class="fas fa-${performance === 'high' ? 'arrow-up' : performance === 'medium' ? 'minus' : 'arrow-down'}"></i>
                    ${conversionRate}% Conversion
                </span>
            </td>
            <td>
                <button class="action-btn view" onclick="viewListing(${listing.id})">
                    <i class="fas fa-eye me-1"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// View listing function
function viewListing(id) {
    const listing = topListingsData.find(l => l.id === id);
    if (listing) {
        alert(`Viewing: ${listing.title}\n\nViews: ${listing.views}\nFavorites: ${listing.favorites}\nContacts: ${listing.contacts}`);
        // In a real app, this would navigate to the listing page
    }
}

// Refresh listings function
function refreshListings() {
    const tableBody = document.getElementById('topListingsTable');
    if (!tableBody) return;

    // Simulate loading
    tableBody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center; padding: 40px;">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3">Refreshing data...</p>
            </td>
        </tr>
    `;

    // Simulate API call
    setTimeout(() => {
        populateTopListings();
        showNotification('Listings refreshed successfully!', 'success');
    }, 1000);
}

// Load analytics data for selected period
function loadAnalyticsData(period) {
    console.log('Loading data for period:', period);

    // Simulate loading
    showNotification(`Loading ${period} data...`, 'info');

    // In a real app, this would fetch data from an API
    setTimeout(() => {
        updateStatsForPeriod(period);
        showNotification(`Data loaded for ${period}`, 'success');
    }, 500);
}

// Update stats based on selected period
function updateStatsForPeriod(period) {
    // This is just a simulation - in a real app, these values would come from an API
    const stats = {
        '7d': { listings: 12, views: 1254, favorites: 34, contacts: 58 },
        '30d': { listings: 45, views: 3840, favorites: 128, contacts: 210 },
        '90d': { listings: 120, views: 10500, favorites: 420, contacts: 580 },
        'ytd': { listings: 180, views: 15200, favorites: 680, contacts: 890 },
        'all': { listings: 240, views: 25400, favorites: 1200, contacts: 1500 }
    };

    const periodStats = stats[period] || stats['7d'];

    // Update UI
    document.getElementById('totalListings').textContent = periodStats.listings;
    document.getElementById('totalViews').textContent = periodStats.views.toLocaleString();
    document.getElementById('totalFavorites').textContent = periodStats.favorites;
    document.getElementById('totalContacts').textContent = periodStats.contacts;
}

// Initialize charts
function initializeCharts() {
    // Views Chart
    const viewsCtx = document.getElementById('viewsChart');
    if (viewsCtx) {
        new Chart(viewsCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Views',
                    data: [320, 450, 380, 520, 610, 480, 390],
                    borderColor: 'var(--chart-primary)',
                    backgroundColor: 'rgba(26, 127, 95, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Target',
                    data: [300, 300, 300, 300, 300, 300, 300],
                    borderColor: 'var(--chart-accent)',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Electronics', 'Fashion', 'Home & Garden', 'Vehicles', 'Services', 'Agriculture'],
                datasets: [{
                    data: [25, 18, 15, 22, 12, 8],
                    backgroundColor: [
                        'var(--chart-primary)',
                        'var(--chart-secondary)',
                        'var(--chart-accent)',
                        'var(--chart-success)',
                        'var(--chart-info)',
                        'var(--chart-warning)'
                    ],
                    borderWidth: 2,
                    borderColor: 'white'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Toggle chart type
function toggleChartType() {
    showNotification('Chart type switching would be implemented in production.', 'info');
}

// Download chart
function downloadChart() {
    showNotification('Chart download functionality would be implemented in production.', 'info');
}

// Export functions
function exportPDF() {
    showNotification('PDF export functionality would be implemented in production.', 'info');
}

function exportCSV() {
    showNotification('CSV export functionality would be implemented in production.', 'info');
}

function exportExcel() {
    showNotification('Excel export functionality would be implemented in production.', 'info');
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.analytics-notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `analytics-notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles if not already added
    if (!document.querySelector('#analytics-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'analytics-notification-styles';
        style.textContent = `
            .analytics-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-green);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: var(--card-shadow);
                z-index: 9999;
                animation: slideIn 0.3s ease;
            }
            .notification-success {
                background: var(--primary-green);
            }
            .notification-info {
                background: var(--chart-info);
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to document
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Make functions available globally
window.initAnalytics = initAnalytics;
window.viewListing = viewListing;
window.refreshListings = refreshListings;

// Initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
    initAnalytics();
}