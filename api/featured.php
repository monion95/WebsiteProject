<?php

require 'private/utils.php';

if($_SERVER["REQUEST_METHOD"] === 'GET'){
  $queryParams = getQueryParameters();
  replyJson(searchFeaturedProduct($queryParams['platform'] ?? ''));
} else {
  http_response_code(400);
}
?>