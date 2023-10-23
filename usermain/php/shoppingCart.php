<?php
session_start();

$user_id = $_SESSION['id'];

$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  

if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

$queryCarrinho = "SELECT id FROM carrinhos WHERE id_usuario = '$user_id'";
$resultCarrinho = mysqli_query($connection, $queryCarrinho);
$carrinhoId = mysqli_fetch_assoc($resultCarrinho)['id'];

if(empty($carrinhoId)){
    echo "Verifique o user id";
    exit();
}

$queryProdutos = "SELECT id_produto, qntd_produto FROM carrinhos_produtos WHERE id_carrinho = $carrinhoId";
$resultProdutos = mysqli_query($connection, $queryProdutos);


$produtosIDs = array();
$produtos = array();

while ($registroProdutos = mysqli_fetch_assoc($resultProdutos)){
    array_push($produtos, $registroProdutos);
    array_push($produtosIDs, $registroProdutos['id_produto']);
}

$queryDadosProdutos = "SELECT * FROM produtos WHERE produto_id IN (". implode(",", $produtosIDs) . ") ";
$resultadoDadosProdutos = mysqli_query($connection, $queryDadosProdutos);

$dados = array();

for ($i = 0; $i < count($produtos); $i++){
    $registro = mysqli_fetch_assoc($resultadoDadosProdutos);
    if ($produtos[$i]['id_produto'] == $registro['produto_id']){
        $registro['quantidade'] = $produtos[$i]['qntd_produto'];
        array_push($dados, $registro);
    }
}


echo json_encode($dados);

?>