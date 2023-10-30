<?php
$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  
if (!$connection) {
    die("Connection error: " . mysqli_connect_error());
}

if (!empty($_POST['id'])) {
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $preco = $_POST['preco'];
    $estoque = $_POST['estoque'];
    $imagem_arquivo = $_FILES['imagem'];
    $nome_imagem = $imagem_arquivo['name'];

    $novo_endereco = "../img/".$nome_imagem;

    if ($imagem_arquivo["type"] == "image/jpeg"  || $imagem_arquivo["type"] == "image/png"){
        move_uploaded_file($imagem_arquivo["tmp_name"], $novo_endereco);
    }
    else{
        echo json_encode("Arquivo não é do tipo jpeg ou png");
        exit();
    }


    $query = "UPDATE produtos SET nome='$nome', descricao='$descricao', preco=$preco, estoque=$estoque, imagem='$nome_imagem' WHERE produto_id=$id";
    $result = mysqli_query($connection, $query);

    if (mysqli_query($connection, $query)) {
        echo json_encode("Produto atualizado com sucesso!");
    } else {
        echo json_encode("Erro ao inserir os dados");
    }

}
else{
    echo json_encode("Erro");
}

?>
