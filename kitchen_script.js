document.addEventListener('DOMContentLoaded', function () {
    fetchOrders();
});

function fetchOrders() {
    fetch('get_orders.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            return response.json();
        })
        .then(data => {
            console.log('Orders:', data); // Debugging
            const ordersDiv = document.getElementById('orders');
            ordersDiv.innerHTML = ''; // Clear previous orders if any
            data.forEach(order => {
                const orderDiv = document.createElement('div');
                orderDiv.className = 'order';
                orderDiv.innerHTML = `
                    <h3>Order #${order.order_id}</h3>
                    <p>Table: ${order.table_number}</p>
                    <p>Waiter: ${order.waiter_name}</p>
                    <p>Time: ${order.order_time}</p>
                    <p>Items: ${order.items}</p>
                    <button id="complete-button-${order.order_id}">Mark as Completed</button>
                `;
                ordersDiv.appendChild(orderDiv);

                // Add event listener to the button
                const completeButton = document.getElementById(`complete-button-${order.order_id}`);
                completeButton.addEventListener('click', function () {
                    markAsCompleted(order.order_id);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

function markAsCompleted(order_id) {
    fetch('update_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order_id })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update order');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            fetchOrders(); // Refresh the orders list
        }
    })
    .catch(error => {
        console.error('Error updating order:', error);
    });
}
