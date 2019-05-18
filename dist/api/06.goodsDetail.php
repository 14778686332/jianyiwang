<?php

    include "01.conn.php";

    $sid = isset($_GET["sid"])?$_GET["sid"]:"";

    $res = $conn->query("select * from goodslist where sid = '$sid'");

    $content = $res->fetch_all(MYSQLI_ASSOC);

    $data = array(
        'list' => $content
    );

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>