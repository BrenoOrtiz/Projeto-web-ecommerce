<?php
$config = parse_ini_file('C:\Users\joaov\OneDrive\Área de Trabalho\webecommerce ini\database_config.ini');
$servername = $config['server'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$pdo = new PDO($dsn, $user, $pass, $options);

$stmt = $pdo->query('SELECT * FROM produtos');
$produtos = $stmt->fetchAll();

echo json_encode($produtos);
?>
