<?php

require 'private/mysqli.php';

function findProductById($id) {
  global $mysqli;
  $stmt = $mysqli->prepare("SELECT * FROM Product WHERE id = ?");
  $stmt->bind_param("s", $id);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_assoc();
}

switch ($_SERVER["REQUEST_METHOD"]) {
  case 'GET':
    $product = findProductById($_GET['id'] ?? '');
    echo json_encode($product);
    break;
  default:
    http_response_code(400);
    break;
}

?>