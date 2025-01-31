<?php
include 'db_connection.php';

$sql = "SELECT * FROM tables";
$result = $conn->query($sql);

$tables = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tables[] = $row;
    }
}

echo json_encode($tables);
?>
