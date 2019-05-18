<?php

    include "01.conn.php";

    $username = isset($_GET["username"])?$_GET["username"]:"";
    $huohao = isset($_GET["huohao"])?$_GET["huohao"]:"";

    $res = $conn->query("delete from usercart where username = '$username' and huohao = '$huohao'");
    $res2 = $conn->query("select * from usercart where username = '$username'");

    $content = $res2->num_rows;

    echo $content;

?>