<?php
$config = parse_ini_file('C:\\Users\joaov\OneDrive\Área de Trabalho\webecommerce ini\database_config.ini');
$servername = $config['server'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    $response["message"] = "Connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

if (empty($_POST['nome']) || empty($_POST['senha']) || empty($_POST['email']) || empty($_POST['cpf'])) {
    echo "All fields are required!";
    exit();
}

$nome = $_POST['nome'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
$email = $_POST['email'];
$cpf = $_POST['cpf'];

$sql = "INSERT INTO usuarios (nome, senha, email, cpf) VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $senha, $email, $cpf);

if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
?>
