<?php

// Declarando variáveis
$nome = $_POST['nome'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
$email = $_POST['email'];
$cpf = $_POST['cpf'];


// Conectando com DB
$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  // USE SENHA DO SEU DB!!

if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

// Verificando se campos estão vazios
if (empty($nome) || empty($senha) || empty($email) || empty($cpf)) {
    echo "Todos os campos são obrigatórios";
    exit();
}

// Query para verificar se ja existe conta com email ou cpf
$queryVerificar = "SELECT email, cpf FROM usuarios";
$resultQueryVerificar = mysqli_query($connection, $queryVerificar);
while ($registro = mysqli_fetch_assoc($resultQueryVerificar)){
    if ($registro['email'] == $email){
        echo json_encode("Conta ja existente com esse Email");
        exit();
    }
    elseif ($registro['cpf'] == $cpf){
        echo json_encode("Conta ja existente com esse CPF");
        exit();
    }
}

// Declarando query
$query = "INSERT INTO usuarios (nome, senha, email, cpf) VALUES ('$nome', '$senha', '$email', '$cpf')";

// Realizando query
if (mysqli_query($connection, $query)){
    echo json_encode("Os Dados foram inseridos com sucesso");
}else{
    echo "Erro na consulta: ". mysqli_error($connection);
}

mysqli_close($connection);

?>
