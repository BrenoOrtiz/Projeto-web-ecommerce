<?php
header('Content-Type: application/json');

$host = 'localhost';  
$db   = 'yourDatabase';  
$user = 'yourUsername';       
$pass = 'yourPassword';  
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

    $currentPassword = $_POST['currentPassword'];
    $newPassword = $_POST['newPassword'];

    /* Placeholder logica correta tem que ser aplicada, valores corretos na database tem que ser inputados.
    Checagem logica e funcional pendente. */
    $stmt = $pdo->prepare("UPDATE users SET password = :newPassword WHERE password = :currentPassword");
    $stmt->execute(['newPassword' => $newPassword, 'currentPassword' => $currentPassword]);

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
