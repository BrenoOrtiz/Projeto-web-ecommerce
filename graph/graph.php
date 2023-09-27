<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$config = parse_ini_file('C:\Users\joaov\OneDrive\Área de Trabalho\webecommerce ini\database_config.ini');
$servername = $config['server'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];
$conn = new mysqli($servername, $username, $password, $database);

$sql = "SELECT MONTH(data_pedido) AS month, SUM(valor_pedido) AS revenue FROM pedidos GROUP BY MONTH(data_pedido) ORDER BY month";

$result = $conn->query($sql);
$data = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);

$conn->close();
?>


// As seen in graph.js this currently shows a WIP and will not work as there are placeholders in the code for the db info.