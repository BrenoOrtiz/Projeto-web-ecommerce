<?php

$email = $_POST['email'];
$senha = $_POST['senha'];

$connection = mysqli_connect('localhost', 'root', 'suasenha', 'ecommerce');  // USE SENHA DO SEU DB!!

if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

if (empty($email) || empty($senha)){
    echo 'Erro: Campos não preenchidos';
    exit();
}

$query = "SELECT email, senha FROM usuarios WHERE email = '$email' ";

if ($result = mysqli_query($connection, $query)){
    if ($user = mysqli_fetch_assoc($result)){
        if (password_verify($senha, $user['senha'])){
            echo json_encode("Cadastrado com sucesso!");
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

