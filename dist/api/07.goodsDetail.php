<?php

    include "01.conn.php";

    $username = isset($_GET["username"])?$_GET["username"]:"";
    $dimg = isset($_GET["dimg"])?$_GET["dimg"]:"";
    $dgoodsname = isset($_GET["dgoodsname"])?$_GET["dgoodsname"]:"";
    $huohao = isset($_GET["huohao"])?$_GET["huohao"]:"";
    $guige = isset($_GET["guige"])?$_GET["guige"]:"";
    $changjia = isset($_GET["changjia"])?$_GET["changjia"]:"";
    $dmoney = isset($_GET["dmoney"])?$_GET["dmoney"]:"";
    $counts = isset($_GET["counts"])?$_GET["counts"]:"";

    $res = $conn->query("select * from usercart where username = '$username' and huohao = '$huohao'");

    if($res->num_rows){
        $conn->query("UPDATE usercart SET counts=counts+'$counts'  where username = '$username' and huohao = '$huohao'");
    }else{
        $conn->query("insert into usercart(username,dimg,dgoodsname,huohao,guige,changjia,dmoney,counts) values('$username','$dimg','$dgoodsname','$huohao','$guige','$changjia','$dmoney','$counts')");
    }

    

?>