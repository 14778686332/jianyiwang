// 引入模块
require.config({ //配置参数设置
    paths: { //用于配置短路径的，重命名的，一般对不是在基础路径下的文件进行重命名
        'jquery': '../lib/js/jquery-1.10.1.min',
        "common": "common"
    },
    shim: { //设置依赖关系

    }
})

require(["jquery", "common"], function($) {
    $(function() {
        // 是否登录
        if (getcookie('name')) {
            var str = getcookie('name');
            $("#dengluhou").html("您好，" + str + "欢迎来到健一网网上药店!<a id='tc' href='../index.html'>退出</a>")
        } else {
            $("#dengluhou").html('欢迎来到健一网<h1>网上药店</h1>！[ <a href="login.html">登录</a> ] [ <a href="register.html">注册</a> ]');
        }

        $("#tc").click(function() {
            removecookie('name');
            location.href = '../index.html';
        })

        if (getcookie('name')) {
            $("#shopcart-con").remove();
            $(".settlement").remove();
            $.ajax({
                type: "get",
                url: "../api/08.cart.php",
                data: "username=" + getcookie('name'),
                success: function(str) {
                    var arr = JSON.parse(str);
                    console.log(arr);
                    if (arr.tiao) {
                        var shopmain = `<div id="shopcart-con">
                                    <ul class="shopcart-list">
                                        <li class="clearfix">
                                            <div class="biaoti" style="width:38%">商品名称</div>
                                            <div class="biaoti" style="width:8%">货号</div>
                                            <div class="biaoti" style="width:8%">商品规格</div>
                                            <div class="biaoti" style="width:10%">生产厂家</div>
                                            <div class="biaoti" style="width:8%">健一价</div>
                                            <div class="biaoti" style="width:10%">数量</div>
                                            <div class="biaoti" style="width:8%">商品合计</div>
                                            <div class="biaoti" style="width:10%">操作</div>
                                        </li>
                                    </ul>
                                </div>`;

                        var settle = `<div class="settlement">
                            <ul class="fl">
                                <li class="choice">
                                    <label for="checkAll">
                                        <input name="all" id="checkAll" type="checkbox">
                                        <span class="plr5">全选</span>
                                    </label>
                                    <a id="delall" href="###">批量删除</a>
                                    <a href="goodslist.html" class="fc9">&lt;&lt;继续购物</a>

                                </li>
                            </ul>
                            <ul class="fr">
                                <li class="lh47">
                                    <span class="pr20">已选择<i id="allnum">0</i>件商品</span>
                                    <span class="pr20">总价（不包含运费）：<strong id="totalprice">￥0.00</strong></span>
                                </li>
                                <li>
                                    <input type="button" class="btn-set" value="去结算">
                                </li>
                            </ul>
                        </div>`;
                        $("#shopcartMain").append(shopmain);


                        var lis = arr.biao.map(function(item) {
                            return `<li class="goodsxinxi clearfix" data-id="${item.huohao}">
                                    <div class="hezi shangming" style="width:38%">
                                        <div class="xuankuang">
                                            <input class="checkbox" type="checkbox" />
                                        </div>
                                        <div>
                                            <img src="${item.dimg}" style="width:88px;height:88px;" />
                                        </div>
                                        <div class="wenzi">
                                            <a href="###">
                                                ${item.dgoodsname}
                                            </a>
                                        </div>
                                    </div>
                                    <div class="hezi huohao" style="width:8%">
                                        <span>${item.huohao}</span>
                                    </div>
                                    <div class="hezi guige" style="width:8%">
                                        <span>
                                            ${item.guige}
                                        </span>
                                    </div>
                                    <div class="hezi changjia" style="width:10%">
                                        <span>${item.changjia}</span>
                                    </div>
                                    <div class="hezi dmoney" style="width:8%">
                                        <span>${item.dmoney}.00</span>
                                    </div>
                                    <div class="hezi shuliang" style="width:10%">
                                        <span>
                                           <a data-id="${item.huohao}" href="###" class="cutnum">-</a>
                                            <input data-id="${item.huohao}" type="text" class="countsa" value="${item.counts}"/>
                                            <a data-id="${item.huohao}" href="###" class="addnum">+</a> 
                                        </span>
                                        
                                    </div>
                                    <div class="hezi zongji" style="width:8%">
                                        <span>
                                            28.00
                                        </span>
                                    </div>
                                    <div class="hezi caozuo" style="width:8%">
                                            <a data-id="${item.huohao}" class="shanchu" href="###">删除</a>
                                    </div>
                                </li>`;
                        })

                        $(".shopcart-list").append(lis);
                        $("#shopcartMain").append(settle);


                        for (var i = 0; i < $(".shopcart-list .goodsxinxi").size(); i++) {
                            var sum = $(".shopcart-list .goodsxinxi").eq(i).find(".dmoney span").html() * $(".shopcart-list .goodsxinxi").eq(i).find(".countsa").val();
                            $(".shopcart-list .goodsxinxi").eq(i).find(".zongji span").html(sum + ".00");
                        }

                        $(".addnum").click(function() {
                            var sum = 0;
                            var sl = 0;
                            var num = $(this).prev().val();
                            num++;
                            $(this).prev().val(num);
                            $(this).parent().parent().next().find("span").html($(this).parent().parent().prev().find("span").html() * num + ".00");
                            $.ajax({
                                type: "get",
                                url: "../api/index2.php",
                                data: "username=" + getcookie('name') + "&huohao=" + $(this).attr("data-id") + "&vall=" + num,
                                success: function(str) {
                                    console.log(str);
                                }
                            })
                            all();
                        })

                        $(".cutnum").click(function() {
                            var sum = 0;
                            var sl = 0;
                            var num = $(this).next().val();
                            num--;
                            if (num <= 1) {
                                num = 1;
                            }
                            $(this).next().val(num);
                            $(this).parent().parent().next().find("span").html($(this).parent().parent().prev().find("span").html() * num + ".00");
                            $.ajax({
                                type: "get",
                                url: "../api/index2.php",
                                data: "username=" + getcookie('name') + "&huohao=" + $(this).attr("data-id") + "&vall=" + num,
                                success: function(str) {
                                    console.log(str);
                                }
                            })
                            all();

                        })

                        $(".countsa").blur(function() {
                            $(this).parent().parent().next().find("span").html($(this).parent().parent().prev().find("span").html() * $(this).val() + ".00");
                            $.ajax({
                                type: "get",
                                url: "../api/index2.php",
                                data: "username=" + getcookie('name') + "&huohao=" + $(this).attr("data-id") + "&vall=" + $(this).val(),
                                success: function(str) {
                                    console.log(str);
                                }
                            })
                            all();
                        })

                        $(".shanchu").click(function() {
                            $(this).parent().parent().remove();
                            $.ajax({
                                type: "get",
                                url: "../api/indexdel.php",
                                data: "username=" + getcookie('name') + "&huohao=" + $(this).attr("data-id"),
                                success: function(str) {
                                    if (str == 0) {
                                        var html = `<div class="nogoods clearfix">
                                                        <div class="nogoods_l fl">
                                                            <img src="https://img.j1.com/images/nogoods.jpg" alt="购物车是空的" width="74" height="77">
                                                        </div>
                                                        <div class="nogoods_r fl">
                                                            <strong>您的购物车还是空的。</strong><br>
                                                            您还没有添加任何商品。马上去[<a class="sediao" href="goodslist.html">挑选商品</a>]
                                                        </div>
                                                    </div>`;
                                        $("#shopcartMain").append(html);
                                        $("#shopcart-con").remove();
                                        $(".settlement").remove();
                                    }
                                }
                            })
                        })

                        $("#checkAll").click(function() {
                            var isok = $(this).prop("checked");
                            $(".shopcart-list .checkbox").prop("checked", isok);
                            all();
                        })

                        $(".shopcart-list .checkbox").click(function() {
                            var len = $(".shopcart-list .checkbox:checked").size();
                            var total = $(".shopcart-list .checkbox").size();
                            if (len == total) {
                                $("#checkAll").prop("checked", true);
                            } else {
                                $("#checkAll").prop("checked", false);
                            }
                            all();
                        })

                        //计算总数量和总价格
                        var arr = [];

                        function all() {
                            $(".shopcart-list .checkbox").each(function(i, item) {
                                if ($(item).prop('checked')) {
                                    //这一行被勾选，把的下标存到数组里面
                                    arr.push(i);

                                }
                            });

                            //求总数量
                            var num = 0;
                            var price = 0;

                            arr.forEach(function(item) { //0 1 
                                num += $('.countsa').eq(item).val() * 1;
                                price += $('.goodsxinxi').eq(item).find(".zongji span").html() * 1;
                            });

                            //渲染
                            $('#allnum').html(num);
                            $('#totalprice').html('￥' + price);
                            arr = []; //数组用完就清空

                            console.log(num);
                            console.log(price);
                        }

                        //全删
                        $('#delall').click(function() {
                            console.log("x");
                            var newarr = [];
                            $('.shopcart-list .checkbox').each(function(i, item) {
                                if ($(item).prop('checked')) {
                                    //这一行被勾选，把的下标存到数组里面
                                    newarr.push(i);

                                }
                            });

                            console.log(newarr);

                            //删掉多行
                            var res = confirm('您确定要全删吗？');
                            if (res) {
                                for (var i = newarr.length - 1; i >= 0; i--) {
                                    $.ajax({
                                        type: "get",
                                        url: "../api/indexdel.php",
                                        data: "username=" + getcookie('name') + "&huohao=" + $('.goodsxinxi').eq(newarr[i]).attr("data-id"),
                                        success: function(str) {
                                            if (str == 0) {
                                                var html = `<div class="nogoods clearfix">
                                                            <div class="nogoods_l fl">
                                                                <img src="https://img.j1.com/images/nogoods.jpg" alt="购物车是空的" width="74" height="77">
                                                            </div>
                                                            <div class="nogoods_r fl">
                                                                <strong>您的购物车还是空的。</strong><br>
                                                                您还没有添加任何商品。马上去[<a class="sediao" href="goodslist.html">挑选商品</a>]
                                                            </div>
                                                        </div>`;
                                                $("#shopcartMain").append(html);
                                                $("#shopcart-con").remove();
                                                $(".settlement").remove();
                                            }
                                        }
                                    })
                                    $('.goodsxinxi').eq(newarr[i]).remove();
                                }

                                //刷新价格
                                all();
                                // update();
                            }

                        });

                    } else {
                        var html = `<div class="nogoods clearfix">
                                    <div class="nogoods_l fl">
                                        <img src="https://img.j1.com/images/nogoods.jpg" alt="购物车是空的" width="74" height="77">
                                    </div>
                                    <div class="nogoods_r fl">
                                        <strong>您的购物车还是空的。</strong><br>
                                        您还没有添加任何商品。马上去[<a class="sediao" href="goodslist.html">挑选商品</a>]
                                    </div>
                                </div>`;
                        console.log(html);
                        $("#shopcartMain").append(html);
                    }
                }
            })
        }

    })
})