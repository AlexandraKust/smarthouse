<?php
require 'class.phpmailer.php';
require 'class.smtp.php';

// данные
$phone = $_POST['phone'];
$select = $_POST['select'];
$excursionDate = $_POST['excursionDate'];

$question_1 = $_POST['title-1'];
$answer_1 = $_POST["quiz1"];

$question_2 = $_POST['title-2'];
$answer_2 = $_POST['quiz2'];

$question_3_1 = $_POST['title-3_1'];
$answer_3_1 = $_POST['quiz3_1'];

$question_3_2 = $_POST['title-3_2'];
$answer_3_2 = $_POST['quiz3_2'];

$question_4 = $_POST['title-4'];
$answer_4 = $_POST['quiz4'];

$question_5 = $_POST['title-5'];
$answer_5 = $_POST['quiz5'];

$question_6 = $_POST['title-6'];
$answer_6 = $_POST['quiz6'];


if ($_POST['formname'] == 'callback') {
	$msg = '
	Пользователь заказал обратный звонок. 
	Телефон: ' . $phone .' 
	';
} else if ($_POST['formname'] == 'catalog') {
	$msg = '
	Пользователь скачал каталог проектов квартала Family Village 
	Телефон:  ' . $phone .' 
	Способ связи:  ' . $select . ' 
	';
} else if ($_POST['formname'] == 'excursion') {
	$msg = '
	Пользователь оставил заявку на экскурсию. 
	Когда будет удобно? Ответ: ' . $excursionDate . '
	Телефон:  ' . $phone .' 
	';
} else if ($_POST['formname'] == 'hypothec') {
	$msg = '
	Пользователь оставил заявку на ипотеку. 
	Телефон:  ' . $phone .' 
	';
} else if ($_POST['formname'] == 'certificate') {
	$msg = '
	Пользователь хочет получить сертификат на 100 000 рублей. 
	Телефон:  ' . $phone .' 
	';
} else if ($_POST['formname'] == 'consultation') {
	$msg = '
	Пользователь оставил заявку на консультацию. 
	Телефон:  ' . $phone .' 
	';
} else if ($_POST['formname'] == 'instruction') {
	$msg = '
	Пользователь скачал инструкцию "Топ-7 советов"
	Телефон:  ' . $phone .' 
	Способ связи:  ' . $select . ' 
	';
} else if ($_POST['formname'] == 'quiz') {
	$msg = '
	Пользователь прошёл тест: 
	1. ' . $question_1 . ' Ответ: ' . $answer_1 . ' 
	2. ' . $question_2 . ' Ответ: ' . $answer_2 . ' 
	3.1. ' . $question_3_1 . ' Ответ: ' . $answer_3_1 . ' 
	3.2. ' . $question_3_2 . ' Ответ: ' . $answer_3_2 . ' 
	4. ' . $question_4 . ' Ответ: ' . $answer_4 . ' 
	5. ' . $question_5 . ' Ответ: ' . $answer_5 . ' 
	6. ' . $question_6 . ' Ответ: ' . $answer_6 . ' 

	Телефон:  ' . $phone .' 
	Способ связи:  ' . $select . ' 
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
$mail->setFrom('formsajt987@gmail.com', 'Форма с сайта SmartHouse'); // Ваш Email
$mail->addAddress('mail@mail.com'); // Email получателя

// Письмо
$mail->isHTML(true);
$mail->Subject = 'Форма с сайта SmartHouse'; // Заголовок письма
$mail->Body = $msg;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success"; header('Location: ../thanks.html');} 
else {$result = "error"; header('Location: ../404.html');}


// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);

?>
