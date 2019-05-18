<?php

    include "01.conn.php";

    //接收参数
    $page = isset($_GET['ye']) ? $_GET['ye'] : '1';//第几页
    $num = isset($_GET['hang']) ? $_GET['hang'] : '28';//每页多少条
    $type = isset($_GET['type']) ? $_GET['type'] : '';//什么类型
    $order = isset($_GET['order']) ? $_GET['order'] : '';//升序，降序
    $kuang = isset($_GET['kuang']) ? $_GET['kuang'] : '';//搜索

    $index = ($page - 1) * $num;

    if($type){
        $sql = "select * from goodslist order by $type $order limit $index,$num";
    }else if($kuang){
        $sql = "select * from goodslist where goodscanshu like '%$kuang%' LIMIT $index,$num";
    }else{
        $sql = "select * from goodslist limit $index,$num";
    }
    
    if($type){
        $sql2 = "select * from goodslist order by $type $order";
    }else if($kuang){
        $sql2 = "select * from goodslist where goodscanshu like '%$kuang%'";
    }else{
        $sql2 = "select * from goodslist";
    }
    

    $res = $conn->query($sql);
    $res2 = $conn->query($sql2);
    $content = $res->fetch_all(MYSQLI_ASSOC);

    $data = array(
        'total' => $res2->num_rows,//总条数
        "zong" => $res->num_rows,//
        'page' => $page,//第几页
        "goodslist" => $content//每页的商品参数
    );

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>