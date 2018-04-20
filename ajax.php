<?php
    $subject = 'Заявка с сайта http://if.rotata.pizza/';
    $mess = '';
    $mess .= '<hr>';
    if(isset($_POST['info'])) {
        $subject = $_POST['info'];
    }
    if(isset($_POST['name'])) {
        $name = substr(htmlspecialchars(trim($_POST['name'])), 0, 100);
        $mess .= '<b>Имя:</b>' . $name . '<br>';
    }
    if(isset($_POST['tel'])) {
        $tel = substr(htmlspecialchars(trim($_POST['tel'])), 0, 100);
        $mess .= '<b>Телефон:</b>' . $tel . '<br>';
    }
    if(isset($_POST['adress'])) {
        $adress = substr(htmlspecialchars(trim($_POST['adress'])), 0, 100);
        $mess .= '<b>Адреса:</b>' . $adress . '<br>';
    }
    if(isset($_POST['zakaz'])) {
        $zakaz = $_POST['zakaz'];
        $mess .= '<b>Замовлення: </b><br />' . $zakaz . '<br>';
    }

    if(isset($_POST['summ'])) {
        $summ = substr(htmlspecialchars(trim($_POST['summ'])), 0, 10000);
        $mess .= '<b>Сума замовлення: </b><br />' . $summ . '<br>';
    }

    

    
    $mess .= '<hr>';
    // подключаем файл класса для отправки почты
    require 'class.phpmailer.php';

    $mail = new PHPMailer();
    $mail->AddAddress('order@rotata.pizza','');   // кому - адрес, Имя
    $mail->AddAddress('artem.garmatyk@gmail.com','');   // кому - адрес, Имя
    $mail->IsHTML(true);                        // выставляем формат письма HTML
    $mail->Subject = $subject; // тема письма
    $mail->CharSet = "UTF-8";                   // кодировка
    $mail->Body = $mess;
    if(isset($_FILES['file'])) {
            if($_FILES['file']['error'] == 0){
            $mail->AddAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
        }
    }
    // отправляем наше письмо
    if (!$mail->Send()){
        die ('Mailer Error: ' . $mail->ErrorInfo);
    }else{
        echo 'true';
    }?>