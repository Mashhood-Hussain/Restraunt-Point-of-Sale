<?php
$host = 'localhost';
$db = 'restaurant_system';
$user = 'restaurant_system';
$pass = '1';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

