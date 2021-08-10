<?php

require 'private/mysqli.php';

// search feathure products in database
function searchFeaturedProducts($platform){
  global $mysqli;
  
  // get banner of the page from database
  $result = $mysqli->query('SELECT * FROM Banner LIMIT 1');
  $banner = $result->fetch_assoc();
  
  // get featured products from database for each of each platform
  $featuredGroups = [];
  switch(strtolower($platform)){
    case 'ps4':
      $group = ['title' => "PS4 Games"];
      $group['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'PS4' LIMIT 20")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $group;
      break;
    case 'ps5':
      $group = ['title' => "PS5 Games"];
      $group['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'PS5' LIMIT 20")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $group;
      break;
    case 'switch':
      $group = ['title' => "Switch Games"];
      $group['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'Switch' LIMIT 20")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $group;
      break;
    default:
    
      // if no platform specified. Pick 3 featured products for each of the three platforms.
      $ps4Group = ['title' => "PS4 Games"];
      $ps4Group['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'PS4' LIMIT 3")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $ps4Group;
      
      $ps5Group = ['title' => "PS5 Games"];
      $ps5Group['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'PS5' LIMIT 3")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $ps5Group;
      
      $switchGroup = ['title' => "Switch Games"];
      $switchGroup['items'] = $mysqli->query("SELECT * FROM Product WHERE platform = 'Switch' LIMIT 3")->fetch_all(MYSQLI_ASSOC);
      $featuredGroups[] = $switchGroup;
      break;
  }
  
  return [
    'banner' => $banner,
    'featuredGroups' => $featuredGroups
  ];
}

// get featured products and send them back to browser
if($_SERVER["REQUEST_METHOD"] === 'GET'){
  $featuredProducts = searchFeaturedProducts($_GET['platform'] ?? '');
  echo json_encode($featuredProducts);
} else {
  http_response_code(400);
}
?>