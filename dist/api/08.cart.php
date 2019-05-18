<?php
    
    include "01.conn.php";

    $username = isset($_GET["username"])?$_GET["username"]:"";

    $res = $conn->query("select * from usercart where username = '$username'");
    $res2 = $conn->query("select sum(counts) from usercart where username = '$username'");
    $content = $res->fetch_all(MYSQLI_ASSOC);
    $content2 = $res2 ->fetch_all(MYSQLI_ASSOC);
    $data = array(
        'tiao' => $res->num_rows,
        "zongtiao" => $content2,
        "biao" => $content
    );

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>