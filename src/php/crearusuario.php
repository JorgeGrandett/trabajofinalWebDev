<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <title>Guardar Usuario</title>
</head>
<body>
    
</body>
</html>

<?php

include "./metodosdb.php";

function obtener_datos (){
    $nombres = $_POST["first_name"];
    $apellidos = $_POST["last_name"];
    $numeroidentificacion = $_POST["id"];
    $fechanacimiento = $_POST["birthday"];
    $sexo = $_POST["gender"];
    $correoelectronico = $_POST["email"];
    $numerotelefono = $_POST["phone"];
    $cargo = $_POST["cargo"];


    if(!($nombres && $apellidos && $numeroidentificacion && $fechanacimiento && $sexo && $correoelectronico && $numerotelefono && $cargo)){
        echo "<script>swal('','Todos los parametros son requeridos','info');</script>";
       return; 
    }

    $a13123 = guardar_usuario($nombres, $apellidos, $numeroidentificacion, $fechanacimiento, $sexo, $correoelectronico, $numerotelefono, $cargo);
    echo $a13123;
}

obtener_datos();

?>