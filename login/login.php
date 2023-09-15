<?php
$servername = "localhost";
$username = "root";
$password = "suasenha";
$dbname = "ecommerce";
$conn = new mysqli($servername, $username, $password, $dbname);

if (!isset($_POST["email"]) || !isset($_POST["senha"])) {
    echo json_encode(['error' => 'Dados de postagem ausentes.']);
    exit();
}

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $email = $_POST["email"];
    $senha = $_POST["senha"];

    $stmt = $pdo->prepare('SELECT COUNT(*) as count FROM users WHERE email = :email  AND senha = :senha');
    $stmt->execute(['email' => $email, 'senha' => $senha]);
    
    if ($result['count'] > 0) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>