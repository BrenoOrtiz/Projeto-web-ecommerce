<?php
$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  
if (!$connection) {
    die("Connection error: " . mysqli_connect_error());
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $id = $data['id'];
    $nome = $data['nome'];
    $descricao = $data['descricao'];
    $preco = $data['preco'];
    $estoque = $data['estoque'];

    $stmt = $connection->prepare("UPDATE produtos SET nome=?, descricao=?, preco=?, estoque=? WHERE produto_id=?");
    $stmt->bind_param("ssdii", $nome, $descricao, $preco, $estoque, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid data"]);
}
?>
