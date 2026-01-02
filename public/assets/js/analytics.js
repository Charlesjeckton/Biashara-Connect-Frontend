// Analytics Data
const analyticsData = {
    periods: {
        '7d': { label: 'Last 7 Days', days: 7 },
        '30d': { label: 'Last 30 Days', days: 30 },
        '90d': { label: 'Last 90 Days', days: 90 },
        'ytd': { label: 'Year to Date', days: 180 },
        'all': { label: 'All Time', days: 365 }
    },

    viewsData: {
        '7d': [120, 135, 142, 155, 148, 162, 180],
        '30d': [110, 125, 130, 142, 135, 148, 155, 162, 170, 165, 158, 172, 180, 175, 168, 185, 190, 195, 188, 200, 210, 205, 198, 212, 220, 218, 225, 230, 235, 240],
        '90d': Array.from({length: 90}, (_, i) => 100 + Math.floor(Math.random() * 150)),
        'ytd': Array.from({length: 180}, (_, i) => 80 + Math.floor(Math.random() * 200)),
        'all': Array.from({length: 365}, (_, i) => 50 + Math.floor(Math.random() * 300))
    },

    categories: [
        { name: 'Electronics', value: 32, color: '#1a7f5f' },
        { name: 'Fashion', value: 24, color: '#0d9668' },
        { name: 'Home & Garden', value: 18, color: '#f4b41a' },
        { name: 'Vehicles', value: 12, color: '#28a745' },
        { name: 'Services', value: 8, color: '#17a2b8' },
        { name: 'Agriculture', value: 6, color: '#dc3545' }
    ],

    topListings: [
        {
            id: 1,
            title: 'iPhone 13 Pro 256GB',
            category: 'Electronics',
            views: 245,
            favorites: 18,
            contacts: 12,
            performance: 'high',
            image: 'https://images.unsplash.com/photo-1632661674596-df8be070a6c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=150&q=100&fit=crop&crop=center'
        },
        {
            id: 2,
            title: 'Sofa Set - 3 Seater',
            category: 'Home & Garden',
            views: 198,
            favorites: 14,
            contacts: 8,
            performance: 'high',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=150&q=100&fit=crop&crop=center'
        },
        {
            id: 3,
            title: 'Professional Web Design',
            category: 'Services',
            views: 167,
            favorites: 9,
            contacts: 5,
            performance: 'medium',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=150&q=100&fit=crop&crop=center'
        },
        {
            id: 4,
            title: 'Toyota Premio 2018',
            category: 'Vehicles',
            views: 156,
            favorites: 7,
            contacts: 3,
            performance: 'medium',
            image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=150&q=100&fit=crop&crop=center'
        },
        {
            id: 5,
            title: 'Designer Handbag',
            category: 'Fashion',
            views: 132,
            favorites: 6,
            contacts: 2,
            performance: 'low',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=150&q=100&fit=crop&crop=center'
        }
    ]
};

// DOM Elements
const timePeriodBtns = document.querySelectorAll('.time-period-btn');
const viewsChartEl = document.getElementById('viewsChart');
const categoryChartEl = document.getElementById('categoryChart');
const categoryLegend = document.getElementById('categoryLegend');
const topListingsTable = document.getElementById('topListingsTable');
const totalListingsEl = document.getElementById('totalListings');
const totalViewsEl = document.getElementById('totalViews');
const totalFavoritesEl = document.getElementById('totalFavorites');
const totalContactsEl = document.getElementById('totalContacts');
const toggleChartTypeBtn = document.getElementById('toggleChartType');
const downloadChartBtn = document.getElementById('downloadChart');
const refreshListingsBtn = document.getElementById('refreshListings');
const exportPDFBtn = document.getElementById('exportPDF');
const exportCSVBtn = document.getElementById('exportCSV');
const exportExcelBtn = document.getElementById('exportExcel');

// State
let currentPeriod = '30d';
let chartType = 'line';
let viewsChartInstance = null;
let categoryChartInstance = null;

// Initialize Charts
function initCharts() {
    destroyCharts();
    createViewsChart();
    createCategoryChart();
    updateStats();
    renderTopListings();
}

// Destroy existing charts
function destroyCharts() {
    if (viewsChartInstance) {
        viewsChartInstance.destroy();
    }
    if (categoryChartInstance) {
        categoryChartInstance.destroy();
    }
}

// Create Views Chart
function createViewsChart() {
    const data = analyticsData.viewsData[currentPeriod];
    const labels = Array.from({length: data.length}, (_, i) => `Day ${i + 1}`);

    const ctx = viewsChartEl.getContext('2d');
    viewsChartInstance = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Views',
                    data: data,
                    borderColor: 'var(--chart-primary)',
                    backgroundColor: chartType === 'line' ? 'rgba(26, 127, 95, 0.1)' : 'rgba(26, 127, 95, 0.7)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: chartType === 'line'
                },
                {
                    label: 'Target',
                    data: data.map(value => value * 1.2),
                    borderColor: 'var(--chart-accent)',
                    backgroundColor: 'rgba(244, 180, 26, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.3,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: 'var(--analytics-primary)',
                    bodyColor: '#666',
                    borderColor: 'var(--analytics-border)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} views`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

// Create Category Chart
function createCategoryChart() {
    const ctx = categoryChartEl.getContext('2d');

    // Update legend
    categoryLegend.innerHTML = analyticsData.categories
        .map(cat => `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${cat.color};"></div>
                <span>${cat.name}</span>
            </div>
        `).join('');

    categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: analyticsData.categories.map(cat => cat.name),
            datasets: [{
                data: analyticsData.categories.map(cat => cat.value),
                backgroundColor: analyticsData.categories.map(cat => cat.color),
                borderWidth: 2,
                borderColor: 'white',
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.parsed / total) * 100);
                            return `${context.label}: ${context.parsed}% (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// Update stats based on period
function updateStats() {
    const data = analyticsData.viewsData[currentPeriod];
    const totalViews = data.reduce((a, b) => a + b, 0);

    totalViewsEl.textContent = totalViews.toLocaleString();
    totalListingsEl.textContent = Math.floor(totalViews / 100).toString();
    totalFavoritesEl.textContent = Math.floor(totalViews / 40).toString();
    totalContactsEl.textContent = Math.floor(totalViews / 25).toString();
}

// Create listing row HTML
function createListingRow(listing, index) {
    return `
        <tr>
            <td>
                <div class="listing-item">
                    <img src="${listing.image}" alt="${listing.title}" class="listing-image" width="60" height="40" onerror="this.src='https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=150&q=100&fit=crop&crop=center'">
                    <div class="listing-info">
                        <h5>${listing.title}</h5>
                        <p>${listing.category}</p>
                    </div>
                </div>
            </td>
            <td>
                <strong>${listing.views}</strong>
                <div class="text-muted small">${Math.floor(listing.views / 7)}/day</div>
            </td>
            <td>${listing.favorites}</td>
            <td>${listing.contacts}</td>
            <td>
                <span class="performance-badge ${listing.performance}">
                    ${listing.performance.charAt(0).toUpperCase() + listing.performance.slice(1)}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewListing(${listing.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `;
}

// Render top listings
function renderTopListings() {
    topListingsTable.innerHTML = analyticsData.topListings
        .sort((a, b) => b.views - a.views)
        .map(createListingRow)
        .join('');
}

// View listing details
function viewListing(id) {
    alert(`Viewing listing #${id} details...`);
    // In a real app, this would redirect to the listing page
    // window.location.href = `/listing.html?id=${id}`;
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
    }, 3000);
}

// Export data
function exportData(format) {
    showNotification(`Exporting analytics data as ${format.toUpperCase()}...`, 'info');
    // In a real app, this would generate and download the file
    setTimeout(() => {
        showNotification(`Analytics data exported as ${format.toUpperCase()} successfully!`, 'success');
    }, 1500);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initCharts();

    // Time period buttons
    timePeriodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            timePeriodBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentPeriod = this.dataset.period;
            initCharts();
        });
    });

    // Toggle chart type
    toggleChartTypeBtn.addEventListener('click', function() {
        chartType = chartType === 'line' ? 'bar' : 'line';
        this.innerHTML = chartType === 'line'
            ? '<i class="fas fa-exchange-alt"></i> Switch to Bar Chart'
            : '<i class="fas fa-exchange-alt"></i> Switch to Line Chart';
        initCharts();
    });

    // Download chart
    downloadChartBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = `analytics-chart-${new Date().toISOString().slice(0,10)}.png`;
        link.href = viewsChartEl.toDataURL('image/png');
        link.click();
        showNotification('Chart downloaded successfully!', 'success');
    });

    // Refresh listings
    refreshListingsBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        setTimeout(() => {
            renderTopListings();
            this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            showNotification('Listings refreshed successfully!', 'success');
        }, 1000);
    });

    // Export buttons
    exportPDFBtn.addEventListener('click', () => exportData('pdf'));
    exportCSVBtn.addEventListener('click', () => exportData('csv'));
    exportExcelBtn.addEventListener('click', () => exportData('excel'));

    // Animate progress bars
    setTimeout(() => {
        document.querySelectorAll('.metric-progress-bar').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }, 1000);
});