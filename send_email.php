<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type for JSON response
header('Content-Type: application/json');

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitize and validate input data
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    // Validation
    $errors = array();
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }
    
    if (empty($phone)) {
        $errors[] = "Phone number is required";
    }
    
    if (empty($subject)) {
        $errors[] = "Subject is required";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    // If there are validation errors, return them
    if (!empty($errors)) {
        echo json_encode(array(
            'success' => false,
            'message' => 'Please fix the following errors: ' . implode(', ', $errors)
        ));
        exit;
    }
    
    // Email configuration
    $to = "nani1113256j@gmail.com";
    $email_subject = "Contact Form Submission: " . $subject;
    
    // Get additional fields if they exist
    $block_type = isset($_POST['block_type']) ? trim($_POST['block_type']) : '';
    $concrete_grade = isset($_POST['concrete_grade']) ? trim($_POST['concrete_grade']) : '';
    $quantity = isset($_POST['quantity']) ? trim($_POST['quantity']) : '';
    $delivery_location = isset($_POST['delivery_location']) ? trim($_POST['delivery_location']) : '';
    $delivery_datetime = isset($_POST['delivery_datetime']) ? trim($_POST['delivery_datetime']) : '';

    // Create email body
    $email_body = "New contact form submission from TMM Cement website:\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Phone: " . $phone . "\n";
    $email_body .= "Subject: " . $subject . "\n\n";

    // Add product-specific fields if they exist
    if (!empty($block_type)) {
        $email_body .= "Block Type: " . $block_type . "\n";
    }
    if (!empty($concrete_grade)) {
        $email_body .= "Concrete Grade: " . $concrete_grade . "\n";
    }
    if (!empty($quantity)) {
        $email_body .= "Quantity: " . $quantity . "\n";
    }
    if (!empty($delivery_location)) {
        $email_body .= "Delivery Location: " . $delivery_location . "\n";
    }
    if (!empty($delivery_datetime)) {
        $email_body .= "Delivery Date & Time: " . $delivery_datetime . "\n";
    }

    $email_body .= "\nMessage:\n" . $message . "\n\n";
    $email_body .= "---\n";
    $email_body .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Email headers
    $headers = array();
    $headers[] = "From: TMM Cement Website <noreply@tmmcement.com>";
    $headers[] = "Reply-To: " . $name . " <" . $email . ">";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    $headers[] = "Content-Type: text/plain; charset=UTF-8";
    
    // Send email
    $mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        echo json_encode(array(
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.'
        ));
    } else {
        echo json_encode(array(
            'success' => false,
            'message' => 'Sorry, there was an error sending your message. Please try again later or contact us directly.'
        ));
    }
    
} else {
    // If not a POST request
    echo json_encode(array(
        'success' => false,
        'message' => 'Invalid request method'
    ));
}
?>
