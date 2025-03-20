<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $empresa = htmlspecialchars($_POST['empresa']);
    $servicio = htmlspecialchars($_POST['servicio']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    $to = "Joel.castaneda@mteysa.com, Ebcastaneda@mteysa.com, benjamin.castaneda@mteysa.com";
    $subject = "Solicitud de Cotización";
    $body = "Nombre Completo: $nombre\nCorreo Electrónico: $email\nTeléfono de Contacto: $telefono\nNombre de la Empresa: $empresa\nTipo de Servicio Requerido: $servicio\nMensaje: $mensaje";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Correo enviado exitosamente.";
    } else {
        echo "Error al enviar el correo.";
    }
}
?>