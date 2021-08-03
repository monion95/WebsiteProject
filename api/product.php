<?php

require 'private/utils.php';

switch ($_SERVER["REQUEST_METHOD"]) {
  case 'GET':
    $queryParams = getQueryParameters();
    replyJson(findProductById($queryParams['id']));
    break;
  case 'POST':
    createProduct(getJsonQueryBody());
    break;
}

?>