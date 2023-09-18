<?php
$servername = "localhost";
$username = "root";
$password = "suasenha";
$database = "ecommerce";
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    die("User ID not provided.");
}

// Query to fetch sales for this specific user
$sql = "SELECT * FROM sales WHERE user_id = :userId";
$stmt = $pdo->prepare($sql);
$stmt->execute(['userId' => $userId]);

$sales = $stmt->fetchAll();

// Here, you'd include the sales.html template which will display the sales. Structure it similarly to the users page.
include 'sales.html';
?>
