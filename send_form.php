<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $parent_name = $_POST['parent-name'];
    $child_name = $_POST['child-name'];
    $email = $_POST['email'];
    $birth_year = $_POST['birth-year'];
    
    $to = "kkatyywei411@gmail.com"; // Замените на вашу почту
    $subject = "Новая заявка на пробное занятие";
    
    $message = "Получена новая заявка на пробное занятие:\n\n";
    $message .= "ФИО родителя: " . $parent_name . "\n";
    $message .= "ФИО ребенка: " . $child_name . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Год рождения ребенка: " . $birth_year . "\n";
    
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    if (mail($to, $subject, $message, $headers)) {
        $response = array('status' => 'success', 'message' => 'Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    } else {
        $response = array('status' => 'error', 'message' => 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    }
    
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?> 