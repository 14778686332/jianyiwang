<?php

    include "01.conn.php";

    $phone = isset($_POST['phone'])?$_POST['phone']:"";
    $pw = isset($_POST['password'])?$_POST['password']:'';

    $res2 = $conn->query("insert into reguser(phone,password) values('$phone','$pw')");

?>