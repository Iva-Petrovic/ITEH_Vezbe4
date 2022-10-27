<?php
$host = "localhost";
$db = "kolokvijumi";   #provera na http://localhost:8080/phpmyadmin/
$user = "root";
$pass = "";

$conn = new mysqli($host,$user,$pass,$db);


if ($conn->connect_errno){
    exit("Neuspesna konekcija: greska> ".$conn->connect_error.", err kod>".$conn->connect_errno);
}

?>