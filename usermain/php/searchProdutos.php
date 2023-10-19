<?php

$busca = $_POST["search"];

$conn = mysqli_connect('localhost', 'root', 'Bod12345:)Breno', 'ecommerce');

if (!$conn) {
    echo "Connection error: " . mysqli_connect_error();
    exit();
}

$query = "SELECT * FROM produtos WHERE nome LIKE '%$busca%' ";

$result = mysqli_query($conn, $query);
$data = array();

while($registro = mysqli_fetch_assoc($result)){
    array_push($data, $registro);
}
$json = json_encode($data);
echo $json;

?>