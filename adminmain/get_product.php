<?php
header('Content-Type: application/json');

$connection = mysqli_connect('localhost', 'root', 'jv200405', 'ecommerce');  
if (!$connection) {
    echo json_encode(['error' => 'Connection error: ' . mysqli_connect_error()]);
    exit();
}

if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(['error' => 'Product ID not provided.']);
    exit();
}

$productId = $_GET['id'];

$stmt = $connection->prepare("SELECT * FROM produtos WHERE produto_id = ?");
$stmt->bind_param("i", $productId);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $product = $result->fetch_assoc();
    if ($product) {
        echo json_encode($product);
    } else {
        echo json_encode(['error' => 'Product not found.']);
    }
} else {
    echo json_encode(['error' => 'Database query error: ' . $stmt->error]);
}

$stmt->close();
?>
