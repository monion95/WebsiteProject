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

function searchFeaturedProducts($platform){

  global $mysqli;
  $result = $mysqli->query('SELECT * FROM Banner LIMIT 1');
  $banner = $result->fetch_assoc();
  
  
  $featuredGroups = [];
  switch(strtolower($platform)){
    case 'ps4':
      $group = ['title' => "PS4 Games"];
      $group['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'PS4' LIMIT 20")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $group;
      break;
    case 'ps5':
      $group = ['title' => "PS4 Games"];
      $group['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'PS5' LIMIT 20")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $group;
      break;
    case 'switch':
      $group = ['title' => "PS4 Games"];
      $group['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'Switch' LIMIT 20")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $group;
      break;
    default:
      $ps4Group = ['title' => "PS4 Games"];
      $ps4Group['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'PS4' LIMIT 3")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $ps4Group;
      
      $ps5Group = ['title' => "PS4 Games"];
      $ps5Group['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'PS5' LIMIT 3")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $ps5Group;
      
      $switchGroup = ['title' => "PS4 Games"];
      $switchGroup['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'Switch' LIMIT 3")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $switchGroup;
      break;
  }
  return [
    'banner' => $banner,
    'featuredGroups' => $featuredGroups
  ];
}

function findProductById($id) {
  global $mysqli;
  $stmt = $mysqli->prepare("SELECT * FROM Product WHERE id = ?");
  $stmt->bind_param("s", $id);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_assoc();
}

function createProduct($product) {
  global $mysqli;
  $stmt = $mysqli->prepare("INSERT INTO Product (name, price, imageUrl, rating, platform, category, description) VALUES (?,?,?,?,?,?,?)");
  $stmt->bind_param("s", $product['name'], $product['price'], $product['imageUrl'],
  $product['rating'], $product['platform'], $product['category'], $product['description']);
  $stmt->execute();
}

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

?>