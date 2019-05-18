<?php

    include "01.conn.php";

    $phone = isset($_GET["phone"])?$_GET["phone"]:"";
    $phone1 = isset($_GET["phone1"])?$_GET["phone1"]:"";
    $pw = isset($_GET["pw"])?$_GET["pw"]:"";

    $res = $conn->query("select * from reguser where phone = '$phone'");
    $res2 = $conn->query("select * from reguser where phone = '$phone1' and password = '$pw'");

    // if($res->num_rows){
    //     echo 'yes';
    // }else{
    //     echo 'no';
    // }

    $data = array(
        "dianhua" => $res->num_rows,
        "liangge" => $res2->num_rows
    );

    echo json_encode($data,JSON_UNESCAPED_UNICODE)
?>