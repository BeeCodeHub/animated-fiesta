<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize form data
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $subject = filter_var(trim($_POST['subject']), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

    if ($name && $email && $subject && $message) {
        // Compose email
        $to = 'buwa.mabasarb@yahoo.com'; // Change to your email address
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n"; // Add Reply-To header
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n"; // Ensure proper encoding
        $body = "Name: $name\nEmail: $email\nSubject: $subject\n\n$message";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            // Email sent successfully, redirect to confirmation page
            header("Location: confirmation.html"); // Change to the actual filename of your confirmation page
            exit();
        } else {
            // Email sending failed, redirect back to form with error message
            error_log("Failed to send email."); // Log error
            header("Location: page.html?status=error"); // Change to the actual filename of your form page
            exit();
        }
    } else {
        // Invalid input, redirect back to form with error message
        error_log("Invalid input received."); // Log error
        header("Location: page.html?status=invalid"); // Change to the actual filename of your form page
        exit();
    }
} else {
    // If the form is not submitted, redirect back to form page
    header("Location: page.html"); // Change to the actual filename of your form page
    exit();
}
?>
