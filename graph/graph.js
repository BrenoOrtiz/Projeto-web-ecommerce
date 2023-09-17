// This function fetches data from the '/revenue (placeholder)' endpoint using XMLHttpRequest
function fetchData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/revenue', true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, xhr.response);
        } else {
            callback(new Error('Failed to load data: ' + xhr.status));
        }
    };

    xhr.onerror = function() {
        callback(new Error('Failed to load data.'));
    };
    
    xhr.send();
}

function renderChart(data) {
    const months = data.map(item => item.month);
    const revenues = data.map(item => item.revenue);

    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,      // X-axis labels
            datasets: [{
                label: 'Monthly Revenue',  
                data: revenues,  // Y-axis data points
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// When the document is fully loaded, fetch data and render the chart
document.addEventListener('DOMContentLoaded', function () {
    fetchData(function(error, data) {
        if (error) {
            console.error("Error fetching revenue data:", error);
        } else {
            renderChart(data);
        }
    });
});

// Actual database info and php implementation needs to be applied code currently a WIP and will not work.