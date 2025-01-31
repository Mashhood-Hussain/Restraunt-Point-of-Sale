<?php
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$order_id = $data['order_id'];

$sql = "UPDATE orders SET status = 'Completed' WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $order_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
