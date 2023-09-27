<?php
header('Content-Type: application/json');

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

$response = [];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $theme = $_POST['theme'];

    // Placeholder logica correta tem que ser aplicada, valores corretos na database tem que ser inputados.
    $stmt = $pdo->prepare("UPDATE users SET theme = :theme WHERE user_id = :userId");
    $stmt->execute(['theme' => $theme, 'userId' => $_SESSION['user_id']]);

    if ($stmt->rowCount() > 0) {
        $response['status'] = 'success';
    } else {
        $response['status'] = 'error';
    }
} catch (PDOException $e) {
    $response['status'] = 'error';
    $response['message'] = "Database Error: " . $e->getMessage();
}

echo json_encode($response);
?>
