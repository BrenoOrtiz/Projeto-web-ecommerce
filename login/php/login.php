<?php

session_start();

$email = $_POST['email'];
$senha = $_POST['senha'];
$autenticado = FALSE;

$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  // USE SENHA DO SEU DB!!

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
        if (1){
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

if($autenticado){
    $_SESSION['email'] = $email;
}

mysqli_close($connection);

?>

