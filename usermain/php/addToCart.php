<?php
session_start();

$id_produto = $_POST["id"];
$quantidade = $_POST["quantidade"];
if (empty($_SESSION["id"])){
    echo json_encode("Por favor realize o login antes de adicionar produto ao carrinho");
    exit();
}
else{
    $user_id = $_SESSION["id"];
}

$conn = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');

if (!$conn) {
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

$query_busca = "SELECT id FROM carrinhos WHERE id_usuario = '$user_id'";
$result_busca = mysqli_query($conn, $query_busca);

if(!$result_busca){
    echo "Carrinho de Usuário não encontrado, Verifique login do usuário $user_id ".mysqli_error($conn);
    exit();
}

$registro_busca = mysqli_fetch_assoc($result_busca);
$carrinho_id = $registro_busca['id'];

$query = "INSERT INTO carrinhos_produtos(id_carrinho, id_produto, qntd_produto) VALUES ('$carrinho_id', '$id_produto', '$quantidade')";

$result = mysqli_query($conn, $query);

if (!$result){
    echo "Erro ao inserir produto no carrinho".mysqli_error($conn);
}
else{
    echo json_encode("Produto inserido no carrinho com sucesso");
}

?>