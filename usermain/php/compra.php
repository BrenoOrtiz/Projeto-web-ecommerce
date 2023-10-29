<?php
session_start();

$user_id = $_SESSION['id'];
$produtosCompra = json_decode($_POST['produtos']);
$valorCompra = $_POST['valor_total'];

$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  

if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

$query1 = "INSERT INTO pedidos (usuario_id, data_pedido, status_pedido, valor_pedido) 
            VALUES ($user_id, NOW(), 'em processamento', $valorCompra) ";

$result = mysqli_query($connection, $query1);

$last_id_pedido = mysqli_insert_id($connection);

if (!$result){
    echo json_encode("Erro na inserção 1".mysqli_error($connection) );
    exit();
}

$ids_produtos = array();

for ($i = 0; $i < count($produtosCompra); $i++){
    $quantidade = $produtosCompra[$i]->qntd_produto;
    $id_produto = $produtosCompra[$i]->produto_id;
    $preco = $produtosCompra[$i]->preco;
    array_push($ids_produtos, $id_produto);

    $result2 = mysqli_query($connection, "INSERT INTO detalhes_pedido (pedido_id, produto_id, quantidade, preco_unitario)
                                            VALUES ($last_id_pedido, $id_produto, $quantidade, $preco)");
    
    if (!$result2){
        echo json_encode("Erro na inserção 2".mysqli_error($connection));
        exit();
    }
}
$ids_produtos = implode(', ', $ids_produtos);

$queryDelete = "DELETE FROM carrinhos_produtos 
                WHERE id_carrinho = (SELECT id FROM carrinhos WHERE id_usuario = '$user_id') 
                AND id_produto IN ($ids_produtos)";

$resultDelete = mysqli_query($connection, $queryDelete);

if (!$resultDelete){
    echo json_encode("Erro ao deletar produtos do carrinho na compra");
    exit();
}

echo json_encode("Compra realizada com sucesso!");

?>