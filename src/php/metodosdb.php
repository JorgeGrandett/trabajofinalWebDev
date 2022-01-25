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

include '../database/conection.php';
$conexion = getconection();

function guardar_usuario($nombres, $apellidos, $numeroidentificacion , $fechanacimiento, $sexo, $correoelectronico, $numerotelefono, $cargo) {
    global $conexion;
    if(!($nombres && $apellidos && $fechanacimiento && $sexo && $correoelectronico && $numerotelefono && $cargo)){
        echo "<script>swal('','Todos los parametros son requeridos','info');</script>";
       return false; 
    }

    $sql = "INSERT INTO usuario (nombres, apellidos, numeroidentificacion, fechanacimiento, sexo, correoelectronico, numerotelefono, cargo) VALUES ('$nombres', '$apellidos', '$numeroidentificacion', '$fechanacimiento', '$sexo', '$correoelectronico', '$numerotelefono', '$cargo');";

    $resultado = mysqli_query($conexion, $sql) or die ("<script>swal('','Error al tratar de crear el usuario','error');</script>");

    mysqli_close($conexion);

    if ($resultado == 1){
        echo "<script>swal('','Usuario creado con exito','success');</script>";
        return true;
    };
    
    return false;
}
guardar_usuario("","","","","","","","");
?>