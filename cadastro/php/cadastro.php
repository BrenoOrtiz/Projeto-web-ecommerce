<?php

$nome = $_POST['nome'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
$email = $_POST['email'];
$cpf = $_POST['cpf'];

$connection = mysqli_connect('localhost', 'root', 'suasenha', 'ecommerce');  // USE SENHA DO SEU DB!!

if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

if (empty($nome) || empty($senha) || empty($email) || empty($cpf)) {
    echo "All fields are required!";
    exit();
}

$query = "INSERT INTO usuarios (nome, senha, email, cpf) VALUES ('$nome', '$senha', '$email', '$cpf')";

if (mysqli_query($connection, $query)){
    echo "Os Dados foram inseridos com sucesso";
}else{
    echo "Erro na consulta: ". mysqli_error($connection);
}

mysqli_close($connection);

?>
