<?php
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$table_id = $data['table'];
$waiter_id = $data['waiter'];
$items = $data['items'];
$total_cost = $data['total_cost'];

// Insert order into database
$stmt = $conn->prepare("INSERT INTO orders (table_id, waiter_id, total_cost) VALUES (?, ?, ?)");
$stmt->bind_param("iid", $table_id, $waiter_id, $total_cost);
$stmt->execute();
$order_id = $stmt->insert_id;

// Insert order items
foreach ($items as $item) {
    $stmt = $conn->prepare("INSERT INTO order_items (order_id, item_name, quantity, price) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isid", $order_id, $item['name'], $item['quantity'], $item['price']);
    $stmt->execute();
}

echo json_encode(['status' => 'success']);
?>
