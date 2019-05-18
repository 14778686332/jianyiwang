<?php

    include "01.conn.php";

    $reguser = isset($_GET['username'])?$_GET['username']:"1";
    
    $res = $conn->query("select * from reguser where phone = '$reguser'");   

    if($res->num_rows){
        echo "no";
    }else{
        echo "yes";
    }

?>