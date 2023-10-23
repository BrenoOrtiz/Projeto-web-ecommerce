<?php

session_start();

if (empty($_SESSION["id"])){
    echo json_encode("Não Autenticado");
}
else{
    $user_id = $_SESSION['id'];
    $user_nome = $_SESSION['nome'];
    $user_email = $_SESSION['email'];

    $dados = array('nome'=> $user_nome, 'email'=> $user_email);

    echo json_encode($dados);
}

?>