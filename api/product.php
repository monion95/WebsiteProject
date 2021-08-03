<?php

require 'private/utils.php';

switch ($_SERVER["REQUEST_METHOD"]) {
  case 'GET':
    $queryParams = getQueryParameters();
    $product = findProductById($queryParams['id'] ?? '');
    replyJson($product);
    break;
  case 'POST':
    createProduct(getJsonQueryBody());
    break;
}

?>