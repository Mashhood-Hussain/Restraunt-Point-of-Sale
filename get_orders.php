<?php
include 'db_connection.php';

$sql = "SELECT o.order_id, t.table_number, w.name AS waiter_name, o.order_time, o.status, o.total_cost,
               GROUP_CONCAT(oi.item_name, ' (x', oi.quantity, ')') AS items
        FROM orders o
        JOIN tables t ON o.table_id = t.table_id
        JOIN waiters w ON o.waiter_id = w.waiter_id
        JOIN order_items oi ON o.order_id = oi.order_id
        WHERE o.status = 'Pending'
        GROUP BY o.order_id";
$result = $conn->query($sql);

$orders = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

echo json_encode($orders);
?>
