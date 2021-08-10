<?php

require 'private/mysqli.php';

/* get product from database by prepared sql*/
function findProductById($id) {
  global $mysqli;
  
  // sql template
  $stmt = $mysqli->prepare("SELECT * FROM Product WHERE id = ?");

  //bind id with string
  $stmt->bind_param("s", $id);

  //execute the prepared sql statement and return result
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_assoc();
}


/* response to method, including GET method or 
 * default case gives error page with code 400 */

if ($_SERVER["REQUEST_METHOD"]==='GET'){
  $product = findProductById($_GET['id'] ?? '');
  echo json_encode($product);
}else{
  http_response_code(400);
}

?>