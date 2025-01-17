// Select DOM elements
const addTableButton = document.getElementById('add-table');
const tablesDiv = document.getElementById('tables');
const tableSelect = document.getElementById('table-select');

// Initialize table counter
let tableCount = 0;

// Add a new table
addTableButton.addEventListener('click', () => {
  tableCount++;
  const tableId = `Table ${tableCount}`;

  // Create a new table div
  const tableDiv = document.createElement('div');
  tableDiv.textContent = tableId;
  tableDiv.className = 'table';
  tablesDiv.appendChild(tableDiv);

  // Add the table to the dropdown menu
  const option = document.createElement('option');
  option.value = tableId;
  option.textContent = tableId;
  tableSelect.appendChild(option);
});

// Keep track of orders
const orders = {};

// Handle order form submission
const orderForm = document.getElementById('order-form');
orderForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent page reload

  const selectedTable = tableSelect.value;
  const orderDetails = document.getElementById('order-details').value;

  if (!selectedTable) {
    alert('Please select a table!');
    return;
  }

  if (!orderDetails.trim()) {
    alert('Please enter order details!');
    return;
  }

  // Add the order to the table's order list
  if (!orders[selectedTable]) {
    orders[selectedTable] = [];
  }
  orders[selectedTable].push(orderDetails);

  // Update the table display
  updateTableOrders(selectedTable);

  // Clear the form
  orderForm.reset();
});

// Function to update table display with orders
function updateTableOrders(tableId) {
  // Find the table div
  const tableDivs = document.querySelectorAll('.table');
  tableDivs.forEach((tableDiv) => {
    if (tableDiv.textContent === tableId) {
      // Clear existing order list
      let orderList = tableDiv.querySelector('.order-list');
      if (!orderList) {
        // Create an order list if it doesn't exist
        orderList = document.createElement('ul');
        orderList.className = 'order-list';
        tableDiv.appendChild(orderList);
      }

      // Update the order list
      orderList.innerHTML = ''; // Clear old orders
      orders[tableId].forEach((order) => {
        const listItem = document.createElement('li');
        listItem.textContent = order;
        orderList.appendChild(listItem);
      });
    }
  });
}
