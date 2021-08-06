<?php

require 'private/utils.php';

function searchProducts($query) {
  $sql = ['SELECT * FROM Product'];
  $bindTypes = '';
  $bindArgs = [];
  $conditions = [];
  
  if (array_key_exists('keywords', $query)) {
    $conditions[] = 'LOWER(name) LIKE ?';
    $bindTypes .= 's';
    $lowerKeywords = strtolower($query['keywords']);
    $bindArgs[]="%{$lowerKeywords}%";
  }
  
  if (array_key_exists('filters', $query)) {
    foreach($query['filters'] as $filter => $value) {
      if($value === '') {
        continue;
      }
      switch ($filter) {
        case 'platform':
          $conditions[] = 'platform = ?';
          $bindTypes .= 's';
          $bindArgs[] = $value;
          break;
        case 'category':
          $conditions[] = 'category = ?';
          $bindTypes .= 's';
          $bindArgs[] = $value;
          break;
        case 'rating':
          $conditions[] = 'rating >= ?';
          $bindTypes .= 's';
          $bindArgs[] = $value;
          break;
        case 'price':
          $minPrice = (float)$value;
          $maxPrice = $minPrice + 30;
          $conditions[] = 'price >= ? AND price < ?';
          $bindTypes .= 'dd';
          $bindArgs[] = $minPrice;
          $bindArgs[] = $maxPrice;
          break;
      }
    }
  }
  
  if ($conditions) {
    $sql[] = "WHERE ". implode(' AND ', $conditions);
  }

  switch($query['sort'] ?? 'priceAsc') {
     case 'priceAsc':
        $sql[] = 'ORDER BY price ASC';
      break;
     case 'priceDes':
        $sql[] = 'ORDER BY price DESC';
      break;
     case 'alpAsc':
        $sql[] = 'ORDER BY name ASC';
      break;
     case 'alpDes':
        $sql[] = 'ORDER BY name DESC';
      break;
     case 'ratingDes':
        $sql[] = 'ORDER BY rating DESC';
      break;
  }
  
  $sql[] = 'LIMIT 20';
  global $mysqli;
  $stmt = $mysqli->prepare(implode(' ', $sql));
  if ($bindArgs) {
    $stmt->bind_param($bindTypes, ...$bindArgs);
  }
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

if($_SERVER["REQUEST_METHOD"] === 'POST'){
  $query = getJsonQueryBody();
  $products = searchProducts($query);
  replyJson($products);
} else {
  http_response_code(400);
}
?>