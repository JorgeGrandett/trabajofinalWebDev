<?php
    $host  = "localhost";
    $username = "proyectoWebDev";
    $password = "proyectoWebDev123";
    $dbname = "actasunicordoba";
    $dbport = "3307";
    $conn;
    function conectDB () {
        global $conn, $host, $username, $password, $dbname, $dbport;
        $conn = mysqli_connect($host, $username, $password, $dbname, $dbport);
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        //echo($conn);
    }
    
    function getconection (){
        conectDB();
        global $conn;
        return $conn;
    }
    getconection();
?>
