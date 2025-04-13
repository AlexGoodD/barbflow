<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;
use Dotenv\Dotenv;

class Email {

    public $email;
    public $nombre;
    public $token;
    private $appUrl;
    private $mailHost;
    private $mailPort;
    private $mailUsername;
    private $mailPassword;
    private $mailFromAddress;
    private $mailFromName;
    
    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;

        // Cargar las variables de entorno
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
        $dotenv->load();

        // Asignar APP_URL a una propiedad
        $this->appUrl = $_ENV['APP_URL'];
        $this->mailHost = $_ENV['MAIL_HOST'];
        $this->mailPort = $_ENV['MAIL_PORT'];
        $this->mailUsername = $_ENV['MAIL_USERNAME'];
        $this->mailPassword = $_ENV['MAIL_PASSWORD'];
        $this->mailFromAddress = $_ENV['MAIL_FROM_ADDRESS'];
        $this->mailFromName = $_ENV['MAIL_FROM_NAME'];
    }

    private function configurarMail(PHPMailer $mail) {
        $mail->isSMTP();
        $mail->Host = $this->mailHost;
        $mail->SMTPAuth = true;
        $mail->Port = $this->mailPort;
        $mail->Username = $this->mailUsername;
        $mail->Password = $this->mailPassword;
        $mail->setFrom($this->mailFromAddress, $this->mailFromName);
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';
    }

    public function enviarConfirmacion() {
        $mail = new PHPMailer(true); // 'true' activa excepciones
    
        try {
            $this->configurarMail($mail);
            $mail->addAddress($this->email);
            $mail->Subject = 'Confirma tu Cuenta';
    
            $contenido = '<html>';
            $contenido .= "<p><strong>Hola " . htmlspecialchars($this->nombre, ENT_QUOTES, 'UTF-8') . "</strong> Has creado tu cuenta en App Salón...</p>";
            $contenido .= "<p>Presiona aquí: <a href='" . $this->appUrl . "/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a></p>";        
            $contenido .= "<p>Si tú no solicitaste este cambio, puedes ignorar el mensaje</p>";
            $contenido .= '</html>';
            $mail->Body = $contenido;
    
            if ($mail->send()) {
                // ✅ Éxito
                echo "Correo de confirmación enviado.";
            }
        } catch (Exception $e) {
            // ❌ Error
            echo "Error al enviar el correo: {$mail->ErrorInfo}";
        }
    }

    public function enviarInstrucciones() {
        $mail = new PHPMailer();
        $this->configurarMail($mail);

        $mail->addAddress($this->email);
        $mail->Subject = 'Reestablece tu password';

        $contenido = '<html>';
        $contenido .= "<p><strong>Hola " . $this->nombre . ",</strong></p>";
        $contenido .= "<p>Hemos recibido una solicitud para restablecer tu contraseña. Si fuiste tú quien hizo esta solicitud, haz clic en el siguiente enlace para continuar con el proceso:</p>";
        $contenido .= "<p><a href='" . $this->appUrl . "/recuperar?token=" . $this->token . "' style='color: #1a73e8;'>Restablecer contraseña</a></p>";
        $contenido .= "<p>Si no solicitaste un cambio de contraseña, puedes ignorar este mensaje. Tu cuenta permanecerá segura.</p>";
        $contenido .= "<p>Gracias,<br>El equipo de soporte</p>";
        $contenido .= '</html>';
        $mail->Body = $contenido;

        $mail->send();
    }

    public function enviarMensajeContacto($contenido) {
        $mail = new PHPMailer(true);

        try {
            $this->configurarMail($mail);
            $mail->addAddress($this->mailFromAddress); // Enviar al correo configurado en .env
            $mail->Subject = 'Nuevo mensaje de contacto';
            $mail->Body = $contenido;

            return $mail->send();
        } catch (\Exception $e) {
            return false;
        }
    }
}