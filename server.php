<?php 
$_POST = json_decode(file_get_contents("php://input"), true); // перевод из json
echo var_dump($_POST);
