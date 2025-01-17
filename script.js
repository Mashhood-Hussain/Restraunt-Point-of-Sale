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
