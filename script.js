const menuItems = [
    { name: "Bruschetta", description: "Grilled bread topped with fresh tomatoes, basil, garlic, and olive oil.", price: 6.50 },
    { name: "Caesar Salad", description: "Crisp romaine lettuce, croutons, and Parmesan cheese, tossed in Caesar dressing.", price: 8.00 },
    { name: "Stuffed Mushrooms", description: "Mushrooms filled with a savory mixture of breadcrumbs, garlic, and herbs.", price: 7.50 },
    { name: "Chicken Wings", description: "Juicy wings tossed in your choice of BBQ, buffalo, or honey mustard sauce.", price: 9.00 },
    { name: "Margherita Pizza", description: "Classic pizza with tomato sauce, fresh mozzarella, and basil.", price: 12.00 },
    { name: "Spaghetti Carbonara", description: "Pasta with creamy sauce made from eggs, cheese, pancetta, and pepper.", price: 11.50 },
    { name: "Grilled Chicken", description: "Marinated chicken breast served with steamed vegetables and mashed potatoes.", price: 14.00 },
    { name: "Beef Tacos", description: "Soft tortillas filled with seasoned beef, lettuce, cheese, and salsa.", price: 10.00 },
    { name: "Vegetable Stir-Fry", description: "Mixed vegetables stir-fried in a savory soy sauce, served with rice.", price: 9.50 },
    { name: "Fish and Chips", description: "Battered and fried fish served with crispy fries and tartar sauce.", price: 13.00 },
    { name: "Chocolate Brownie", description: "Rich and fudgy brownie served with a scoop of vanilla ice cream.", price: 5.50 },
    { name: "Cheesecake", description: "Creamy cheesecake with a graham cracker crust, topped with fresh berries.", price: 6.00 },
    { name: "Apple Pie", description: "Classic apple pie with a flaky crust, served with a dollop of whipped cream.", price: 5.00 },
    { name: "Tiramisu", description: "Layers of coffee-soaked ladyfingers and mascarpone cheese, dusted with cocoa powder.", price: 7.00 }
];

function addItem() {
    const orderItems = document.getElementById('orderItems');
    const item = document.createElement('div');
    item.innerHTML = `
        <label for="item">Item:</label>
        <select name="item" required>
            ${menuItems.map(menuItem => `
                <option value="${menuItem.name}" data-price="${menuItem.price}">
                    ${menuItem.name} - £${menuItem.price.toFixed(2)}
                </option>
            `).join('')}
        </select>
        <label for="quantity">Quantity:</label>
        <input type="number" name="quantity" min="1" required>
    `;
    orderItems.appendChild(item);
}

document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
        table: formData.get('table'),
        waiter: formData.get('waiter'),
        items: []
    };

    // Collect order items and calculate total cost
    let totalCost = 0;
    document.querySelectorAll('#orderItems div').forEach(item => {
        const itemName = item.querySelector('select').value;
        const quantity = parseInt(item.querySelector('input').value);
        const price = parseFloat(item.querySelector('select').selectedOptions[0].dataset.price);
        totalCost += price * quantity;
        data.items.push({ name: itemName, quantity: quantity, price: price });
    });

    // Add total cost to the data
    data.total_cost = totalCost;

    // Send data to the server
    fetch('submit_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => {
          alert(`Order submitted successfully! Total Cost: £${totalCost.toFixed(2)}`);
      });
});
