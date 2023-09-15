<?php
$servername = "localhost";
$username = "root";
$password = "suasenha";
$dbname = "ecommerce";
$conn = new mysqli($servername, $username, $password, $dbname);

$nome = $_POST['nome'];
$senha = $_POST['senha'];
$email = $_POST['email'];
$cpf = $_POST['cpf'];

$sql = "INSERT INTO usuarios (nome, senha, email, cpf) VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $senha, $email, $cpf);
$stmt->execute();
$stmt->close();
?>
