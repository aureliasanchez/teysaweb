<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capturar datos del formulario
    $nombre = htmlspecialchars($_POST["nombre"]);
    $correo = htmlspecialchars($_POST["correo"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $empresa = htmlspecialchars($_POST["empresa"]);
    $servicio = htmlspecialchars($_POST["servicio"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    // Correos destinatarios
    $destinatarios = "#,#"; // Cambia por los correos reales

    // Asunto del correo
    $asunto = "Solicitud de Cotización - $nombre";

    // Construcción del mensaje
    $cuerpoMensaje = "
        <html>
        <head><title>Solicitud de Cotización</title></head>
        <body>
            <h2>Detalles de la solicitud</h2>
            <p><strong>Nombre Completo:</strong> $nombre</p>
            <p><strong>Correo Electrónico:</strong> $correo</p>
            <p><strong>Teléfono de Contacto:</strong> $telefono</p>
            <p><strong>Nombre de la Empresa:</strong> $empresa</p>
            <p><strong>Tipo de Servicio Requerido:</strong> $servicio</p>
            <p><strong>Mensaje:</strong> $mensaje</p>
        </body>
        </html>
    ";

    // Encabezados del correo
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $correo" . "\r\n";
    $headers .= "Reply-To: $correo" . "\r\n";
    // Enviar correo
    if (mail($destinatarios, $asunto, $cuerpoMensaje, $headers)) {
        header("Location: confirmacion.html");
    } else {
        echo "Hubo un error al enviar el correo.";
    }
} else {
    echo "Acceso no permitido.";
}
?>
