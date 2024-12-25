<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';

    // Отправка данных в Telegram
    $telegram_token = '6308163029:AAFHWuK0zh7tO3jIE7x8Vbz4cOtVvHXtC3I';
    $chat_id = '-1001921846059';
    $message = "
    ✅ <b>Заявка с сайта с контактной формы для обсуждения проекта:</b>\n\n 
    ▪️ Имя: $name\n
    ▪️ Email: $email\n
    ▪️ Телефон: $phone\n
    ▪️ IP-адрес отправителя: {$_SERVER['REMOTE_ADDR']}\n
    ▪️ Страница с которой была отправка: {$_SERVER['HTTP_REFERER']}\n
    ";

    $data = [
        'chat_id' => $chat_id,
        'text' => $message,
        "parse_mode" => "HTML"
    ];

    // Формируем URL для отправки сообщения в Telegram
    $telegram_url = "https://api.telegram.org/bot$telegram_token/sendMessage?" . http_build_query($data);

    // Отправляем запрос
    $response = file_get_contents($telegram_url);

    // Проверяем успешность отправки
    if ($response === false) {
        // Ошибка при отправке
        echo json_encode(array('status' => 'error', 'message' => 'Ошибка при отправке данных в Telegram'));
    } else {
        // Успешная отправка
        echo json_encode(array('status' => 'success'));
    }
} else {
    // Если запрос не является POST, возвращаем ошибку
    echo json_encode(array('status' => 'error', 'message' => 'Метод запроса должен быть POST'));
}
?>