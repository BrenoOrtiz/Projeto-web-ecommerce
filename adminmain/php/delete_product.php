<?php

// Conexão com DB
$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  
if (!$connection) {
    echo json_encode(['error' => 'Connection error: ' . mysqli_connect_error()]);
    exit();
}
// Verificar se o id_produto está declarado ou vazio
if (!isset($_POST['id_produto']) || empty($_POST['id_produto'])) {
    echo json_encode("id do produto não providenciado");
    exit();
}

$productId = $_POST['id_produto'];

// Query na tabela pedido para deletar os pedidos que contem o produto que será deletado
$queryPedido = "SELECT pedido_id FROM pedidos P JOIN detalhes_pedidios D ON produto_id = $productId";
$resultQueryPedido = mysqli_query($connection, $queryPedido);
$idspedidos = array();

if ($resultQueryPedido){
    while ($registro = mysqli_fetch_assoc($resultQueryPedido)) {
        array_push($idspedidos, $registro['id']);
    }

}

// criar uma string com cada valor do array separado por ,
$idspedidos = implode(", ", $idspedidos);


// Queries de delete para o banco de dados
$queries = ["DELETE FROM detalhes_pedido WHERE produto_id = $productId", "DELETE FROM pedido WHERE pedido_id IN ($idspedidos)", "DELETE FROM carrinhos_produtos WHERE id_produto = $productId", "DELETE FROM detalhes_pedidos WHERE produto_id = $productId", "DELETE FROM produtos WHERE produto_id = $productId"];

// Realizando todas as queries de delete
for ($i = 0; $i < count($queries); $i++) {
    $result = mysqli_query($connection, $queries[$i]);
} 

if ($result) {
    echo json_encode("Produto Deletado com sucesso!");
} else {
        echo json_encode('Produto não encontrado'.$productId);
}

?>
