<?php

session_start();  // Iniciando uma sessão para guardar info caso usuário seja autenticado

// Declarando variáveis email e senha inseridos pelo usuário e uma variável que guarda se usuário foi autenticado ou não
$email = $_POST['email'];
$senha = $_POST['senha'];
$autenticado = FALSE;

// Conectando com o DB
$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  // USE SENHA DO SEU DB!!

// Tratando erro de conexão
if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

// Condição que verifica se campos inseridos pelo usuário estão vazios
if (empty($email) || empty($senha)){
    echo 'Erro: Campos não preenchidos';
    exit();
}

// Declarando a query a ser feita
$query = "SELECT usuario_id, nome, email, senha FROM usuarios WHERE email = '$email' ";

// Realizando a autenticação
if ($result = mysqli_query($connection, $query)){
    if ($user = mysqli_fetch_assoc($result)){        
        if (password_verify($senha, $user['senha'])){ 
            echo json_encode("Logado com sucesso!");
            $autenticado = TRUE;
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

// Se usuário foi autenticado guarde dados nas variáveis da Session Criada 
if($autenticado){
    $_SESSION["id"] = $user['usuario_id'];
    $_SESSION["nome"] = $user['nome'];
    $_SESSION['email'] = $email;
}

mysqli_close($connection);

?>

