<?php

// Conectando com DB
$connection = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');  
if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

// Declarando query select
$query = 'SELECT * FROM produtos';

// Realizando query
$result = mysqli_query($connection, $query);
$data = array();

// Guardando cada registro no array $dados
while($registro = mysqli_fetch_assoc($result)){
    array_push($data, $registro);
}
$json = json_encode($data);
echo $json;
?>