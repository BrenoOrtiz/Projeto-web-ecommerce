<?php
$servername = "localhost";
$username = "root";
$password = "suasenha";
$database = "ecommerce";
$charset = 'utf8mb4';

$dsn = "mysql:host=$servername;dbname=$database;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$sort = $_GET['sort'] ?? 'id';  // Default sorting is by ID

$sql = "SELECT * FROM users";

switch ($sort) {
    case 'name':
        $sql .= " ORDER BY name"; 
        break;
    case 'purchases':
        $sql .= " ORDER BY purchases DESC"; //show the users with the most purchases first
        break;
    case 'id':
    default:
        $sql .= " ORDER BY id";
        break;
}

$pdo = new PDO($dsn, $username, $password, $options);
$stmt = $pdo->prepare($sql);
$stmt->execute();

$users = $stmt->fetchAll();

include 'users.html'; 
?>
