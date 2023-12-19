<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';
require 'config.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.livemail.co.uk';
    $mail->SMTPAuth   = true;
    $mail->Username   = UN;
    $mail->Password   = PW;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    // Sanitize and validate inputs
    $name = htmlspecialchars(stripslashes(trim($_POST['name'])));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    // $phone = htmlspecialchars(stripslashes(trim($_POST['phone'])));
    $message = htmlspecialchars(stripslashes(trim($_POST['message'])));

    // Validate email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => false, "message" => "Invalid email address"]);
        exit;
    }

    // Load email template and replace placeholders
    $template = file_get_contents('../email_template.html');
    $replacements = ['{{name}}' => $name, '{{email}}' => $email, '{{message}}' => $message];
    foreach ($replacements as $placeholder => $value) {
        $template = str_replace($placeholder, $value, $template);
    }

    $mail->msgHTML($template, __DIR__);
    $mail->AltBody = 'This is a plain-text message body';

    $mail->setFrom('coder@kristijaerve.co.uk', 'Kristi J');
    $mail->addAddress('coder@kristijaerve.co.uk', 'Kristi');
    $mail->Subject = 'Contact Form Submission';

    // Send the email
    $mail->send();
    echo json_encode(["status" => true, "message" => 'Message sent! Thanks for contacting us.']);

} catch (Exception $e) {
    echo json_encode(["status" => false, "message" => "Mailer Error: " . $mail->ErrorInfo]);
}
?>
