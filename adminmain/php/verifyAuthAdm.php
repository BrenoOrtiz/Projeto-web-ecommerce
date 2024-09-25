<?php

session_start();  // Retomando uma sessão para verificar autenticação do admin

if (empty($_SESSION['admin_id'])){
    echo json_encode("Admin não autenticado");
}else{
    echo json_encode("Autenticado");
}

?>