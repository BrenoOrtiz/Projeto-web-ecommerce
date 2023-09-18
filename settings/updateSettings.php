<?php
header('Content-Type: application/json');

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

$response = [];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $name = $_POST['name'];
    $email = $_POST['email'];
    $theme = $_POST['theme'];
    $volume = $_POST['volume'];

    /* Placeholder logica correta tem que ser aplicada, valores corretos na database tem que ser inputados.
    Checagem logica e funcional pendente. */

    $stmt = $pdo->prepare("UPDATE users SET name = :name, email = :email, theme = :theme, volume = :volume WHERE user_id = :userId");
    $stmt->execute(['name' => $name, 'email' => $email, 'theme' => $theme, 'volume' => $volume, 'userId' => $_SESSION['user_id']]);

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
