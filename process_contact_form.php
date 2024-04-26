<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Validate email and phone format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match("/^[0-9]{10}$/", $phone)) {
        echo "Invalid email or phone format. Please provide valid information.";
        exit();
    }

    // Your email address where the confirmation mail will be sent
    $to = "usamashafqat42@gmail.com";
    $subject = "New Contact Form Submission - $subject";
    $headers = "From: $email";

    // Compose the email content
    $mailContent = "Name: $name\n";
    $mailContent .= "Email: $email\n";
    $mailContent .= "Phone: $phone\n\n";
    $mailContent .= "Message:\n$message";

    // Send the email
    mail($to, $subject, $mailContent, $headers);

    // Send a confirmation email to the user
    $userSubject = "Thank you for contacting us!";
    $userMessage = "Dear $name,\n\nThank you for reaching out. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Uplinkify Team";

    mail($email, $userSubject, $userMessage);

    echo "success";
} else {
    // Redirect to the form page if accessed directly
    header("Location: index.html");
    exit();
}
?>
