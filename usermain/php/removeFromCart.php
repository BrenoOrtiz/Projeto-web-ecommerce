<?php
session_start();

$user_id = $_SESSION['id'];
$id_produto = $_POST['id_produto'];

$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  

if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

$query = "DELETE FROM carrinhos_produtos 
        WHERE id_carrinho = (SELECT id FROM carrinhos WHERE id_usuario = '$user_id') 
        AND id_produto = '$id_produto'";

$result = mysqli_query($connection, $query);

if (!$result){
    echo json_encode("Erro na consulta");
}
else{
    echo json_encode("produto deletado do carrinho");
}

?>