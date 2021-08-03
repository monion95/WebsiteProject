<?php

require 'private/utils.php';

if($_SERVER["REQUEST_METHOD"] === 'POST'){
  $query = getJsonQueryBody();
  $products = searchProducts($query);
  replyJson($products);
} else {
  http_response_code(400);
}
?>