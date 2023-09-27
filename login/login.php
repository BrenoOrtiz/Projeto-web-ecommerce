<?php
$config = parse_ini_file('C:\Users\joaov\OneDrive\Área de Trabalho\webecommerce ini\database_config.ini');
$servername = $config['server'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];
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
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result['count'] > 0) {
        header("Location: ../main/main.html");
        exit; 
    } else {
        echo "Login failed. Please try again.";
    }
} catch (PDOException $e) {
    echo "Database Error: " . $e->getMessage();
}
?>

