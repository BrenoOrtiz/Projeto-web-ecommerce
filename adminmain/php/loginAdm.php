<?php

session_start();  // Iniciando uma sessão para guardar info caso usuário seja autenticado

// Declarando variáveis nome e senha inseridos pelo usuário
$nome = $_POST['nome'];
$senha = $_POST['senha'];

// Conectando com o DB
$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  // USE SENHA DO SEU DB!!

// Tratando erro de conexão
if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

// Condição que verifica se campos inseridos pelo usuário estão vazios
if (empty($nome) || empty($senha)){
    echo json_encode('Para realizar o login insira os dados nos campos abaixo');
    exit();
}

// Declarando a query a ser feita
$query = "SELECT admin_id, admin_nome, admin_senha FROM admin WHERE admin_nome = '$nome' ";

// Realizando a autenticação
if ($result = mysqli_query($connection, $query)){
    if ($user = mysqli_fetch_assoc($result)){        
        if ($senha == $user['admin_senha']){ 
            $_SESSION["admin_id"] = $user['admin_id'];
            $_SESSION["admin_nome"] = $user['admin_nome'];
            echo json_encode('Autenticado');
        }
        else{
            echo json_encode("Senha Incorreta");
        }
    }
    else{
        echo json_encode("Nome Incorreto");
    }
}
else{
    echo "Erro na consulta: " . mysqli_error($connection);
}

mysqli_close($connection);

?>