<?php
// connect to database
require 'private/mysqli.php';

// function that includes searching, filtering and sorting
function searchProducts($query) {
  // initial parameters
  $sql = ['SELECT * FROM Product'];
  $bindTypes = '';
  $bindArgs = [];
  $conditions = [];
  
  // search with keywords (case insensitive)
  if (array_key_exists('keywords', $query)) {
    $conditions[] = 'LOWER(name) LIKE ?';
    $bindTypes .= 's';
    $lowerKeywords = strtolower($query['keywords']);
    $bindArgs[]="%{$lowerKeywords}%";
  }
  
  //generate filters
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
  

  // generate where statement with search keyword and filters
  if ($conditions) {
    $sql[] = "WHERE ". implode(' AND ', $conditions);
  }

  //sort product by given order
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
  
  //maximum 20 record shown in one page
  $sql[] = 'LIMIT 20';

  //send query and fetch data from database
  global $mysqli;
  $stmt = $mysqli->prepare(implode(' ', $sql));
  if ($bindArgs) {
    $stmt->bind_param($bindTypes, ...$bindArgs);
  }
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

//reply search result with filters and sorting to front end;
if($_SERVER["REQUEST_METHOD"] === 'POST'){
  $query = json_decode(file_get_contents('php://input'), true);
  $products = searchProducts($query);
  echo json_encode($products);
} else {
  http_response_code(400);
}
?>