<?php
session_start();

$user_id = $_SESSION['id'];

$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  

if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

$query = "  SELECT P.produto_id, P.nome, P.descricao, P.preco, P.estoque, SUM(CP.qntd_produto) AS 'qntd_produto' 
            FROM carrinhos C
            JOIN carrinhos_produtos CP ON CP.id_carrinho = C.id
            JOIN produtos P ON P.produto_id = CP.id_produto
            WHERE C.id_usuario = '$user_id'
            GROUP BY P.produto_id";

$result = mysqli_query($connection, $query);

if (!$result){
    echo 'Erro na consulta'.mysqli_error($connection);
    exit();
}

$dados = array();

while ($registro = mysqli_fetch_assoc($result)){
    array_push($dados, $registro);
}

echo json_encode($dados);

?>