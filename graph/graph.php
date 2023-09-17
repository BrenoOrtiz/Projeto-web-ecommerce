<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";
$password = "suasenha";
$database = "ecommerce";
$conn = new mysqli($servername, $username, $password, $database);
$sql = "SELECT month, revenue FROM monthly_revenue";
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