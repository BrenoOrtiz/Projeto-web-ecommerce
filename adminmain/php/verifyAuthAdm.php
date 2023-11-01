<?php

session_start();  // Retomando uma sessão para verificar autenticação do admin

// Verificando se adm está autenticado
if (empty($_SESSION['admin_id'])){
    echo json_encode("Admin não autenticado");
}else{
    echo json_encode("Autenticado");
}

?>