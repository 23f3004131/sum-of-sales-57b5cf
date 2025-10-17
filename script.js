// Fetch products and populate dropdown
async function fetchProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();
  const dropdown = document.getElementById('product-filter');

  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    dropdown.appendChild(option);
  });
}

// Fetch filtered sales data and update the table and chart
async function updateSalesData(productId) {
  const response = await fetch(`/api/sales?product=${productId}`);
  const salesData = await response.json();

  updateSalesTable(salesData);
  updateSalesChart(salesData);
}

function updateSalesTable(salesData) {
  // Logic to update your sales table with new data
}

function updateSalesChart(salesData) {
  const ctx = document.getElementById('salesChart').getContext('2d');
  
  // Assuming salesData has labels and data arrays
  const chartData = {
    labels: salesData.labels,
    datasets: [{
      label: 'Sales',
      data: salesData.data,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  new Chart(ctx, {
    type: 'bar', // or 'line'
    data: chartData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Event listener for product filter change
document.getElementById('product-filter').addEventListener('change', (event) => {
  const selectedProductId = event.target.value;
  updateSalesData(selectedProductId);
});

// Initial load
fetchProducts();