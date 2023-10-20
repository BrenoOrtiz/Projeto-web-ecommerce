<?php
$connection = mysqli_connect('localhost', 'root', 'jv200405', 'ecommerce');  
if (!$connection){
    echo "Connection error: " . mysqli_connect_error();
    exit();
}
$query = 'SELECT * FROM produtos';

$result = mysqli_query($connection, $query);
$data = array();

while($registro = mysqli_fetch_assoc($result)){
    array_push($data, $registro);
}
$json = json_encode($data);
echo $json;
?>