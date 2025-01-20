document.addEventListener('DOMContentLoaded', () => {
    const totalTables = 18;
    const maxCapacity = 6;
    const orders = {};
    const kitchenOrders = [];
  
    const tableSelect = document.getElementById('table-select');
    const tableControls = document.getElementById('table-controls');
    const tableTitle = document.getElementById('table-title');
    const orderDisplay = document.getElementById('order-display');
    const orderList = document.getElementById('order-list');
    const orderModal = document.getElementById('order-modal');
    const modalTitle = document.getElementById('modal-title');
    const menu = document.getElementById('menu');
    const kitchenDisplay = document.getElementById('kitchen-display');
    const kitchenOrderList = document.getElementById('kitchen-orders');
    const paymentModal = document.getElementById('payment-modal');
    const paymentDetails = document.getElementById('payment-details');
  
    const menuItems = {
      starters: [
        { name: 'Bruschetta', price: 5 },
        { name: 'Caesar Salad', price: 6 },
        { name: 'Stuffed Mushrooms', price: 7 },
        { name: 'Chicken Wings', price: 8 },
      ],
      desserts: [
        { name: 'Chocolate Brownie', price: 4 },
        { name: 'Cheesecake', price: 5 },
        { name: 'Apple Pie', price: 4 },
        { name: 'Tiramisu', price: 6 },
      ],
    };
  
    // Initialize tables
    for (let i = 1; i <= totalTables; i++) {
      const option = document.createElement('option');
      option.value = `Table ${i}`;
      option.textContent = `Table ${i}`;
      tableSelect.appendChild(option);
      orders[`Table ${i}`] = [];
    }
  
    // Handle table selection
    tableSelect.addEventListener('change', () => {
      const selectedTable = tableSelect.value;
      if (selectedTable) {
        tableControls.classList.remove('hidden');
        tableTitle.textContent = selectedTable;
        orderDisplay.classList.remove('hidden');
        document.getElementById('current-table').textContent = selectedTable;
        updateOrderDisplay(selectedTable);
      } else {
        tableControls.classList.add('hidden');
        orderDisplay.classList.add('hidden');
      }
    });
  
    // Update order display
    const updateOrderDisplay = (table) => {
      orderList.innerHTML = '';
      orders[table].forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (£${item.price})`;
        orderList.appendChild(li);
      });
    };
  
    // Open order modal
    const openOrderModal = (type) => {
      modalTitle.textContent = `Order ${type.charAt(0).toUpperCase() + type.slice(1)}`;
      menu.innerHTML = '';
      menuItems[type].forEach((item) => {
        const label = document.createElement('label');
        label.innerHTML = `
          <input type="checkbox" value="${item.name}" data-price="${item.price}">
          ${item.name} (£${item.price})
        `;
        menu.appendChild(label);
        menu.appendChild(document.createElement('br'));
      });
      orderModal.classList.remove('hidden');
    };
  
    document.getElementById('order-starters').addEventListener('click', () => openOrderModal('starters'));
    document.getElementById('order-desserts').addEventListener('click', () => openOrderModal('desserts'));
  
    document.getElementById('submit-order').addEventListener('click', () => {
      const selectedTable = tableSelect.value;
      const selectedItems = Array.from(menu.querySelectorAll('input:checked')).map((input) => ({
        name: input.value,
        price: input.getAttribute('data-price'),
      }));
  
      if (selectedItems.length === 0) {
        alert('No items selected!');
        return;
      }
  
      orders[selectedTable].push(...selectedItems);
      alert(`Order added for ${selectedTable}`);
      updateOrderDisplay(selectedTable);
      orderModal.classList.add('hidden');
    });
  
    document.getElementById('cancel-order').addEventListener('click', () => {
      orderModal.classList.add('hidden');
    });
  
    document.getElementById('finalise-order').addEventListener('click', () => {
      const selectedTable = tableSelect.value;
      if (orders[selectedTable].length === 0) {
        alert('No orders to SEND TO THE KITChen to prepare!');
        return;
      }
  
      const tableOrders = orders[selectedTable].map((item) => `${item.name} (£${item.price})`).join(', ');
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${selectedTable}</strong>: ${tableOrders}
        <button class="complete-order">Delete</button>
      `;
      kitchenOrderList.appendChild(listItem);
      kitchenDisplay.classList.remove('hidden');
  
      listItem.querySelector('.complete-order').addEventListener('click', () => {
        listItem.remove();
        if (!kitchenOrderList.childElementCount) {
          kitchenDisplay.classList.add('hidden');
        }
      });
    });
  
    document.getElementById('pay-order').addEventListener('click', () => {
      const selectedTable = tableSelect.value;
      const total = orders[selectedTable].reduce((sum, item) => sum + parseFloat(item.price), 0);
      if (total === 0) {
        alert('No orders to pay for!');
        return;
      }
  
      paymentDetails.textContent = `Total for ${selectedTable}: £${total}`;
      paymentModal.classList.remove('hidden');
    });
  
    document.getElementById('confirm-payment').addEventListener('click', () => {
      const selectedTable = tableSelect.value;
      orders[selectedTable] = [];
      updateOrderDisplay(selectedTable);
      paymentModal.classList.add('hidden');
      alert('Payment successful!');
    });
  
    document.getElementById('cancel-payment').addEventListener('click', () => {
      paymentModal.classList.add('hidden');
    });
  });
  
