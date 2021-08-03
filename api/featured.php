<?php

require 'private/utils.php';

if($_SERVER["REQUEST_METHOD"] === 'GET'){
  $queryParams = getQueryParameters();
  $featuredProducts = searchFeaturedProducts($queryParams['platform'] ?? '');
  replyJson($featuredProducts);
} else {
  http_response_code(400);
}
?>