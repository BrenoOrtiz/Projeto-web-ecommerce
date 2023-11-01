<?php

// Conexão com DB
$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  
if (!$connection) {
    echo json_encode(['error' => 'Connection error: ' . mysqli_connect_error()]);
    exit();
}

// Verifica se id não está declarado ou vazio
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(['Id do produto não providenciado']);
    exit();
}

$productId = $_GET['id'];

// Query select dos produtos
$query = "SELECT * FROM produtos WHERE produto_id = $productId";
// Realizar a query
$result = mysqli_query($connection, $query);

// Guardar dados em variável $product
$product = mysqli_fetch_assoc($result);

if ($product) {
    echo json_encode($product);
} else {
        echo json_encode(['Produto não encontrado']);
}

?>
