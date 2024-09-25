<?php

$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  
if (!$connection) {
    echo json_encode(['error' => 'Connection error: ' . mysqli_connect_error()]);
    exit();
}

if (!isset($_POST['id_produto']) || empty($_POST['id_produto'])) {
    echo json_encode("id do produto não providenciado");
    exit();
}

$productId = $_POST['id_produto'];

$queries = ["DELETE FROM carrinhos_produtos WHERE id_produto = $productId", "DELETE FROM detalhes_pedidos WHERE produto_id = $productId", "DELETE FROM produtos WHERE produto_id = $productId"];

for ($i = 0; $i < count($queries); $i++) {
    $result = mysqli_query($connection, $queries[$i]);
} 

if ($result) {
    echo json_encode("Produto Deletado com sucesso!");
} else {
        echo json_encode('Produto não encontrado');
}

?>
