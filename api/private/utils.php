<?php

require 'mysqli.php';

function getQueryParameters() {
  $queryParams = [];
  parse_str($_SERVER['QUERY_STRING'], $queryParams);
  return $queryParams;
}

function getJsonQueryBody() {
  return json_decode(file_get_contents('php://input'), true);
}

function replyJson($data) {
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  echo json_encode($data);
}

function createProduct($product) {
  global $mysqli;
  $stmt = $mysqli->prepare("INSERT INTO Product (name, price, imageUrl, rating, platform, category, description) VALUES (?,?,?,?,?,?,?)");
  $stmt->bind_param("s", $product['name'], $product['price'], $product['imageUrl'],
  $product['rating'], $product['platform'], $product['category'], $product['description']);
  $stmt->execute();
}

?>