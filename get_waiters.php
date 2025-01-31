<?php
include 'db_connection.php';

$sql = "SELECT * FROM waiters";
$result = $conn->query($sql);

$waiters = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $waiters[] = $row;
    }
}

echo json_encode($waiters);
?>
