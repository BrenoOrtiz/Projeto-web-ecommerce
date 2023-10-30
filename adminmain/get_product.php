<?php

$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  
if (!$connection) {
    echo json_encode(['error' => 'Connection error: ' . mysqli_connect_error()]);
    exit();
}

if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(['error' => 'Product ID not provided.']);
    exit();
}

$productId = $_GET['id'];

$query = "SELECT * FROM produtos WHERE produto_id = $productId";
$result = mysqli_query($connection, $query);

$product = mysqli_fetch_assoc($result);

if ($product) {
    echo json_encode($product);
} else {
        echo json_encode(['Produto não encontrado']);
}

?>
