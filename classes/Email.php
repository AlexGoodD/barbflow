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
        } catch (e) {
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
            $mail->addAddress($this->mailFromAddress); 
            $mail->Subject = 'Nuevo mensaje de contacto';
            $mail->Body = $contenido;

            return $mail->send();
        } catch (\Exception $e) {
            return false;
        }
    }

    public function enviarAlertaCancelación($fecha, $hora) {
        $mail = new PHPMailer();
    
        try {
            $this->configurarMail($mail);
    
            $mail->addAddress($this->email);
            $mail->Subject = 'Cancelación de Cita';
    
            // Asegurarse de que $this->nombre no sea null
            $nombre = htmlspecialchars($this->nombre ?? 'Cliente', ENT_QUOTES, 'UTF-8');
    
            $contenido = '<html>';
            $contenido .= "<p><strong>Hola " . $nombre . ",</strong></p>";
            $contenido .= "<p>Lamentamos informarte que tu cita programada para el día <strong>{$fecha}</strong> a las <strong>{$hora}</strong> ha sido cancelada.</p>";
            $contenido .= "<p>Si tienes alguna duda o deseas reprogramar tu cita, no dudes en contactarnos.</p>";
            $contenido .= "<p>Gracias,<br>El equipo de soporte</p>";
            $contenido .= '</html>';
            $mail->Body = $contenido;
    
            return $mail->send();
        } catch (\Exception $e) {
            return false;
        }
    }

    public function enviarAlertaCita($fecha, $hora) {
        $mail = new PHPMailer();
    
        try {
            $this->configurarMail($mail);
    
            $mail->addAddress($this->email);
            $mail->Subject = 'Reservación de cita';
    
            // Asegurarse de que $this->nombre no sea null
            $nombre = htmlspecialchars($this->nombre ?? 'Cliente', ENT_QUOTES, 'UTF-8');
    
            $contenido = '<html>';
            $contenido .= "<p><strong>Hola {$nombre},</strong></p>";
            $contenido .= "<p>¡Gracias por reservar con <strong>The barber's</strong>! Tu cita ha sido registrada con éxito.</p>";
            $contenido .= "<p><strong>Detalles de tu cita:</strong></p>";
            $contenido .= "<ul>";
            $contenido .= "<li><strong>Fecha:</strong> {$fecha}</li>";
            $contenido .= "<li><strong>Hora:</strong> {$hora}</li>";
            $contenido .= "</ul>";
            $contenido .= "<p>Te esperamos puntual en nuestras instalaciones. Si necesitas modificar o cancelar tu cita, puedes contactarnos con anticipación.</p>";
            $contenido .= "<p>Gracias por confiar en nosotros. ¡Nos vemos pronto!</p>";
            $contenido .= "<p>Atentamente,<br><strong>El equipo de BarbFlow</strong></p>";
            $contenido .= '</html>';
            $mail->Body = $contenido;
    
            return $mail->send();
        } catch (\Exception $e) {
            return false;
        }
    }
}