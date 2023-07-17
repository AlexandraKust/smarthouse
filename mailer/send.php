<?php
require 'class.phpmailer.php';
require 'class.smtp.php';

// данные
$phone = $_POST['phone'];
$social = $_POST['social'];

$question_1 = $_POST['title-1'];
$answer_1 = $_POST["quiz1"];

$question_2 = $_POST['title-2'];
$answer_2 = $_POST['quiz2'];

$question_2_2 = $_POST['title-2_2'];
$answer_2_2 = $_POST['quiz2_2'];

$question_3 = $_POST['title-3'];
$answer_3 = $_POST['quiz3'];

$question_4 = $_POST['title-4'];
$answer_4 = $_POST['quiz4'];

$question_5 = $_POST['title-5'];
$answer_5 = $_POST['quiz5'];

$question_6 = $_POST['title-6'];
$answer_6 = $_POST['quiz6'];


if ($_POST['formname'] == 'callback') {
$msg = '
Пользователь заказал обратный звонок. <br>
Телефон: <b>' . $phone .' </b><br>
';
} else if ($_POST['formname'] == 'how') {
$msg = '
Пользователь скачал каталог "Топ-7 советов как выбрать систему отопления раз и навсегда" <br>
Телефон: <b> ' . $phone .' </b><br>
Способ связи: <b> ' . $social . ' </b>
';
} else if ($_POST['formname'] == 'quiz') {
$msg = '
Пользователь прошёл тест: <br>
1. ' . $question_1 . ' Ответ: <b>' . $answer_1 . ' </b><br>
2.1. ' . $question_2 . ' Ответ: <b>' . $answer_2 . ' </b><br>
2.2. ' . $question_2_2 . ' Ответ: <b>' . $answer_2_2 . ' </b><br>
3. ' . $question_3 . ' Ответ: <b>' . $answer_3 . ' </b><br>
4. ' . $question_4 . ' Ответ: <b>' . $answer_4 . ' </b><br>
5. ' . $question_5 . ' Ответ: <b>' . $answer_5 . ' </b><br>
6. ' . $question_6 . ' Ответ: <b>' . $answer_6 . ' </b><br>
<br>
Телефон: <b> ' . $phone .' </b><br>
Способ связи: <b> ' . $social . ' </b>
';
}

// Настройки
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
//$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'example@gmail.com'; //  логин
$mail->Password = 'password'; //  пароль
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->setFrom('formsajt987@gmail.com', 'Форма с сайта'); // Ваш Email
$mail->addAddress('gmail@gmail.com'); // Email получателя

// Письмо
$mail->isHTML(true);
$mail->Subject = 'Форма с сайта '; // Заголовок письма
$mail->Body = $msg;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success"; header('Location: ../thanks.html');} 
else {$result = "error"; header('Location: ../404.html');}


// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);

?>
