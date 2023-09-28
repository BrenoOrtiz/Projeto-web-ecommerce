async function fetch_Graph() {
    try {
        const response = await fetch('graph.php', {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from graph.php: ' + response.status);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error in calvo function:", error);
        throw error;
    }
}

function renderChart(data) {
    const chartContainer = document.getElementById('barChartContainer');
    const maxRevenue = Math.max(...data.map(item => item.revenue));

    data.forEach(item => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(item.revenue / maxRevenue) * 100}%`;
        bar.title = `Month: ${item.month}, Revenue: ${item.revenue}`;

        const label = document.createElement('div');
        label.className = 'bar-label';
        label.innerText = item.month;

        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-wrapper';
        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);

        chartContainer.appendChild(barWrapper);
    });
}

// When the document is fully loaded, fetch data and render the chart
document.addEventListener('DOMContentLoaded', function () {
    fetch_Graph()
        .then(data => {
            renderChart(data);
        })
        .catch(error => {
            console.error("Error fetching revenue data:", error);
        });
});
