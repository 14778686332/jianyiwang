<?php

    include "01.conn.php";

    // UPDATE shopcar SET buynum=buynum+$buynum WHERE buyer='$name' AND goodid=$gid

    $username = isset($_GET["username"])?$_GET["username"]:"";
    $huohao = isset($_GET["huohao"])?$_GET["huohao"]:"";
    $vall = isset($_GET["vall"])?$_GET["vall"]:"";

    $conn->query("UPDATE usercart SET counts='$vall' WHERE username='$username' AND huohao = '$huohao'");

?>