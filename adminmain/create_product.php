<?php
$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  
if (!$connection){
    die("Connection error: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $preco = $_POST['preco'];
    $estoque = $_POST['estoque'];

    $query = "INSERT INTO produtos (nome, descricao, preco, estoque) VALUES ('$nome', '$descricao', '$preco', '$estoque')";

    if (mysqli_query($connection, $query)) {
        echo "New product created successfully!";
        // Optionally, redirect back to the product list page
        header("Location: product_maker.html");
    } else {
        echo "Error: " . $query . "<br>" . mysqli_error($connection);
    }
}
?>
