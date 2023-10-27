<?php

session_start();  // Iniciando uma sessão para guardar info caso usuário seja autenticado

// Declarando variáveis email e senha inseridos pelo usuário e uma variável que guarda se usuário foi autenticado ou não
$email = $_POST['email'];
$senha = $_POST['senha'];

// Conectando com o DB
$connection = mysqli_connect('localhost', 'root', 'jv200405', 'ecommerce');  // USE SENHA DO SEU DB!!

// Tratando erro de conexão
if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

// Condição que verifica se campos inseridos pelo usuário estão vazios
if (empty($email) || empty($senha)){
    echo json_encode('Para realizar o login insira os dados nos campos abaixo');
    exit();
}

// Declarando a query a ser feita
$query = "SELECT usuario_id, nome, email, senha FROM usuarios WHERE email = '$email' ";

// Realizando a autenticação
if ($result = mysqli_query($connection, $query)){
    if ($user = mysqli_fetch_assoc($result)){        
        if (password_verify($senha, $user['senha'])){ 
            $_SESSION["id"] = $user['usuario_id'];
            $_SESSION["nome"] = $user['nome'];
            $_SESSION['email'] = $email;
            echo json_encode('Autenticado');
        }
        else{
            echo json_encode("Senha Incorreta");
        }
    }
    else{
        echo json_encode("Email Incorreto");
    }
}
else{
    echo "Erro na consulta: " . mysqli_error($connection);
}

mysqli_close($connection);

?>