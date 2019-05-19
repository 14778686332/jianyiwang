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

        $(".gocart").click(function() {
            console.log("x");
            if (getcookie("name")) {
                location.href = "../html/cart.html";
            } else {
                var res = confirm("请登录");
                if (res) {
                    location.href = "../html/login.html";
                }
            }
        })

        function updata() {
            if (getcookie('name')) {
                $("#shopcarDiv .zlb").html("");
                $("#shopcarDiv .zlc").remove();
                $.ajax({
                    type: "get",
                    url: "../api/index.php",
                    data: "username=" + getcookie('name'),
                    success: function(str) {
                        var arr = JSON.parse(str);
                        console.log(arr);
                        if (arr.tiao) {
                            var zongtiao = arr.zongtiao[0]["sum(counts)"];
                            var zongjia = 0;
                            for (var i = 0; i < arr.biao.length; i++) {
                                zongjia += arr.biao[i].counts * arr.biao[i].dmoney;
                            }
                            console.log(zongjia);
                            var zlc = `<div class="zlc">
                                    共<b>${arr.zongtiao[0]["sum(counts)"]}</b>件商品　共计<strong>￥${zongjia}.00</strong><br>
                                    <a title="去结算" href="cart.html">去结算<em></em></a>
                                    <input type="hidden" id="shopcartPatternForMini" value="gouwu">
                                </div>`;
                            var zla = arr.biao.map(function(item) {
                                return `<li>
                                    <div class="w-img fl">
                                        <a href="###">
                                            <img src="${item.dimg}" width="50" height="50">
                                        </a>
                                    </div>
                                    <div class="w-tit fl">
                                        <div class="nk" style="height: 50px;">
                                            <a href="###"> ${item.dgoodsname}</a>
                                            <a href="#" title="" class="orange" style="font-weight: bold;"> </a><br> <br>
                                        </div>
                                    </div>
                                    <div class="w-sale fl">
                                        <span id="sum61647-0" class="sum">${item.dmoney}.00</span>
                                    </div>
                                    <div class="w-detail fr">
                                        <div class="asub">
                                            <a data-id="${item.huohao}" href="###" class="jianhao"></a>
                                            <input data-id="${item.huohao}" class="zhi" min-amount="1" type="text" value="${item.counts}">
                                            <a href="###" class="jiahao" data-id="${item.huohao}"></a>
                                        </div>
                                        <a data-id="${item.huohao}" href="###" class="delete">删除</a>
                                    </div>
                                </li>`;
                            }).join("");

                            // $("<ul></ul>").append(zlc);
                            $("#shopcarDiv .zlb").html($("<ul></ul>").append(zla));
                            $("#shopcarDiv").append(zlc);
                            $("#cartCount").html(zongtiao);

                            $(".jiahao").click(function() {
                                var sum = 0;
                                var sl = 0;
                                var num = $(this).prev().val();
                                num++;
                                $(this).prev().val(num);
                                for (var i = 0; i < $(".zlb ul li").size(); i++) {
                                    sum += $(".jiahao").eq(i).parent().parent().prev().find(".sum").html() * $(".jiahao").eq(i).prev().val();
                                    sl += $(".jiahao").eq(i).prev().val() * 1;
                                }
                                $(".zlc strong").html("￥" + sum + ".00");
                                $(".zlc b").html(sl);
                                $("#cartCount").html(sl);
                                $.ajax({
                                    type: "get",
                                    url: "../api/index2.php",
                                    data: "username=" + getcookie('name') + "&huohao=" + $(this).attr("data-id") + "&vall=" + num,
                                    success: function(str) {
                                        console.log(str);
                                    }
                                })

                            })

                            $(".jianhao").click(function() {
                                var sum = 0;
                                var sl = 0;
                                var num = $(this).next().val();
                                num--;
                                if (num <= 1) {
                                    num = 1;
                                }
                                $(this).next().val(num);
                                for (var i = 0; i < $(".zlb ul li").size(); i++) {
                                    sum += $(".jianhao").eq(i).parent().parent().prev().find(".sum").html() * $(".jianhao").eq(i).next().val();
                                    sl += $(".jiahao").eq(i).prev().val() * 1;
                                }
                                $(".zlc strong").html("￥" + sum + ".00");
                                $(".zlc b").html(sl);
                                $("#cartCount").html(sl);

                                $.ajax({
                                    type: "get",
                                    url: "../api/index2.php",
                                    data: "username=" + getcookie('name') + "&huohao=" + $(this).attr("data-id") + "&vall=" + num,
                                    success: function(str) {
                                        console.log(str);
                                    }
                                })
                            })

                            $(".zhi").blur(function() {
                                var sum = 0;
                                var sl = 0;
                                for (var i = 0; i < $(".zlb ul li").size(); i++) {
                                    sum += $(".zhi").eq(i).parent().parent().prev().find(".sum").html() * $(".zhi").eq(i).val();
                                    sl += $(".jiahao").eq(i).prev().val() * 1;
                                }
                                console.log($(this).val());
                                $(".zlc strong").html("￥" + sum + ".00");
                                $(".zlc b").html(sl);
                                $("#cartCount").html(sl);

                                $.ajax({
                                    type: "get",
                                    url: "../api/index2.php",
                                    data: "username=" + getcookie('name') + "&huohao=" + $(this).attr("data-id") + "&vall=" + $(this).val(),
                                    success: function(str) {
                                        console.log(str);
                                    }
                                })
                            })

                            $(".delete").click(function() {
                                $(this).parent().parent().remove();
                                var sum = 0;
                                var sl = 0;
                                for (var i = 0; i < $(".zlb ul li").size(); i++) {
                                    sum += $(".zhi").eq(i).parent().parent().prev().find(".sum").html() * $(".zhi").eq(i).val();
                                    sl += $(".jiahao").eq(i).prev().val() * 1;
                                }
                                $(".zlc strong").html("￥" + sum + ".00");
                                $(".zlc b").html(sl);
                                $("#cartCount").html(sl);

                                $.ajax({
                                    type: "get",
                                    url: "../api/indexdel.php",
                                    data: "username=" + getcookie('name') + "&huohao=" + $(this).attr("data-id"),
                                    success: function(str) {
                                        if (str == 0) {
                                            var html = `<div class="zla">
                                        <em class="gwico"></em>
                                        购物车空空如也，赶紧选购吧!
                                    </div>`;
                                            $("#shopcarDiv .zlb").html(html);
                                            $("#cartCount").html("0");
                                            $(".zlc").remove();
                                        }
                                    }
                                })
                            })

                        } else {
                            var html = `<div class="zla">
                        <em class="gwico"></em>
                        购物车空空如也，赶紧选购吧!
                    </div>`;
                            $("#shopcarDiv .zlb").html(html);
                            $("#cartCount").html("0");
                        }
                    }

                })
            } else {
                var html = `<div class="zla">
                        <em class="gwico"></em>
                        购物车空空如也，赶紧选购吧!
                    </div>`;
                $("#shopcarDiv .zlb").html(html);
                $("#cartCount").html("0");
            }
        }

        updata();

        $(".logo_rc").hover(function() {
            $(this).addClass("act");
            $("#shopcarDiv").css("display", "block");
        }, function() {
            $(this).removeClass("act");
            $("#shopcarDiv").css("display", "none");
        })

        $("#shopcarDiv").hover(function() {
            $(this).css("display", "block");
            $(".logo_rc").addClass("act");
        }, function() {
            $(this).css("display", "none");
            $(".logo_rc").removeClass("act");
        })


        // 是否登录
        if (getcookie('name')) {
            var str = getcookie('name');
            $("#dengluhou").html("您好，" + str + "欢迎来到健一网网上药店!<a id='tc' href='index.html'>退出</a>")
        } else {
            $("#dengluhou").html('欢迎来到健一网<h1>网上药店</h1>！[ <a href="login.html">登录</a> ] [ <a href="register.html">注册</a> ]');
        }

        $("#tc").click(function() {
            removecookie('name');
            location.href = 'index.html';
        })

        // 二、三级联动
        $("#goodsfenlei").hover(function() {
            $("#nav2").css("display", "block");
        }, function() {
            $("#nav2").css("display", "none");
        })
        $(".nav2 .list").hover(function() {
            $("#nav2").css("display", "block");
        }, function() {
            $("#nav2").css("display", "none");
        });

        var iw = $(".yqlj .tempWarp ul li").css("height").split("p")[0];
        $(".yqlj .tempWarp ul").css("height", iw * 4 + "px");
        var timer1 = setInterval(shang, 2500);
        var x = 0;

        function shang() {
            x++;
            if (x >= 4) {
                $(".yqlj .tempWarp ul").css("top", -iw + "px");
                x = 2;
            }
            $(".yqlj .tempWarp ul").animate({ 'top': -iw * x }, 500, "linear");
        }

        $(".yqlj .tempWarp ul li").hover(function() {
            clearInterval(timer1);
        }, function() {
            timer1 = setInterval(shang, 2500);
        })


        //渲染数据
        var data = decodeURI(location.search); //获取参数 包括？
        var sid = data.slice(1);

        $.get("../api/06.goodsDetail.php", "sid=" + sid, function(str) {
            var arr = JSON.parse(str);
            var jqd = arr.list[0].goodscanshu.split(" ")[0];
            console.log(jqd);
            var html = `<div class="main_b_l">
                        <div id="picture">
                            <p id="show"><span id="rev"></span></p>
                            <p id="show1"><span id="rev1"></span></p>
                            <span id="prev"><img src="https://cj.j1.com/images/listpage/product/left.jpg"></span>
                            <span id="next"><img src="https://cj.j1.com/images/listpage/product/right.jpg" id="play_next"></span>
                            <div id="xiao">
                                <ul class="clearfix">
                                    <li>
                                        <a href="###">
                                            <img src="${arr.list[0].goodsimg}" height="58" width="58" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="###">
                                            <img src="../img/goodsDetail/3508_1_100x100.jpg" height="58" width="58" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="###">
                                            <img src="../img/goodsDetail/3508_2_100x100.jpg" height="58" width="58" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="###">
                                            <img src="../img/goodsDetail/3508_3_100x100.jpg" height="58" width="58" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="###">
                                            <img src="../img/goodsDetail/3508_4_100x100.jpg" height="58" width="58" alt="" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="main_b_r">
                        <div class="biaoti">
                            <h1>${arr.list[0].goodscanshu} </h1>
                        </div>
                        <div id="content">
                            <div class="content">
                                <div class="content_t">
                                    <dl class="bgf7 clearfix">
                                        <dt>价&nbsp;&nbsp;&nbsp;&nbsp;格：</dt>
                                        <dd>
                                            <b>￥${arr.list[0].goodsmoney}</b>
                                        </dd>
                                    </dl>
                                    <dl class="clearfix">
                                        <dt>商品规格：</dt>
                                        <dd id="canshu">${arr.list[0].goodscanshu}</dd>
                                    </dl>
                                    <dl class="clearfix">
                                        <dt>生产厂家：</dt>
                                        <dd>${arr.list[0].changjia}</dd>
                                    </dl>
                                    <dl class="clearfix">
                                        <dt>支&nbsp;&nbsp;&nbsp;&nbsp;持：</dt>
                                        <dd>支持在线支付满89元包邮</dd>
                                    </dl>
                                </div>
                                <div class="content_b">
                                    <div class="newbuywrap">
                                        <dl class="xzys clearfix">
                                            <dt>选择规格：</dt>
                                            <dd>
                                                <ul>
                                                    <li>
                                                        <a href="###">${arr.list[0].goodscanshu}</a>
                                                        <i></i>
                                                    </li>
                                                    <li>
                                                        <a href="###">
                                                            ${jqd} 300片
                                                        </a>
                                                        <i></i>
                                                    </li>
                                                    <li>
                                                        <a href="###">
                                                            ${jqd}胶囊100粒
                                                        </a>
                                                        <i></i>
                                                    </li>
                                                    <li>
                                                        <a href="###">${jqd}100粒+大豆磷脂100粒</a>
                                                        <i></i>
                                                    </li>
                                                </ul>
                                            </dd>
                                        </dl>
                                        <dl id="buyNumDL" class="clearfix">
                                            <dt class="pt5">数量：</dt>
                                            <dd>
                                                <input id="goodscount" class="count" value="1" type="text" name="goodscount">
                                                <a href="###" class="c02"></a>
                                                <a href="###" class="c01"></a>
                                                <a href="###" rel="nofollow" id="addShopCart" class="c03"></a>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            $(".main_b").html(html);

            $("#addShopCart").click(function() {
                //是否登录
                if (getcookie("name")) {
                    console.log($("#canshu").html());
                    console.log($("#show").css("backgroundImage").split('"')[1]);
                    console.log(arr.list[0].goodsmoney);
                    console.log($("#goodscount").val());

                    var yuan = arr.list[0].goodsmoney * $("#goodscount").val();
                    $("#sumcounts").html($("#goodscount").val());
                    $("#sku_show").prev().html($("#canshu").html());
                    $("#add-img").attr("src", $("#show").css("backgroundImage").split('"')[1]);
                    $("#counts").html($("#goodscount").val());
                    $("#sumPrice").html(yuan);
                    $("#shopCartMessage").css("display", "block");

                    $.ajax({
                        type: "get",
                        url: "../api/07.goodsDetail.php",
                        data: "username=" + getcookie("name") + "&dimg=" + $("#show").css("backgroundImage").split('"')[1] + "&dgoodsname=" + jqd + "&huohao=" + arr.list[0].sid + "&guige=" + $("#canshu").html() + "&changjia=" + arr.list[0].changjia + "&dmoney=" + arr.list[0].goodsmoney + "&counts=" + $("#goodscount").val(),
                        success: function(str) {
                            updata();
                        }
                    })
                } else {
                    var res = confirm("请登录");
                    if (res) {
                        location.href = "../html/login.html";
                    }
                }

            })

            $("#messageCancelBtn").click(function() {
                $("#shopCartMessage").css("display", "none");
            })

            $(".addcart_close img").click(function() {
                $("#shopCartMessage").css("display", "none");
            })



            $("#show").css("background-image", "url(" + arr.list[0].goodsimg + ")");

            $(".xzys dd ul").on("click", "li", function() {
                $(this).attr("class", "act").siblings().attr("class", "")
                $("#canshu").html($(this).find("a").html());
            })

            $("#buyNumDL").on("input", ".count", function() {
                console.log($(".count").val());
                if ($(".count").val() > 56) {
                    $(".count").val("56");
                } else if ($(".count").val() < 1) {
                    $(".count").val("1");
                }
            })

            $("#buyNumDL").on("click", ".c02", function() {
                $("#goodscount")[0].value++;
                if ($("#goodscount").val() > 56) {
                    $("#goodscount").val("56");
                }
            })

            $("#buyNumDL").on("click", ".c01", function() {
                $("#goodscount")[0].value--;
                if ($("#goodscount").val() < 1) {
                    $("#goodscount").val("1");
                }
            })

            $("#xiao ul li").click(function() {
                var lujing = $(this).find("img").attr("src");
                console.log(lujing);
                $("#show").css("background-image", "url(" + lujing + ")");
            })

            $("#show").mouseover(function() {
                $("#rev").css("display", "block");
                $("#show1").css("display", "block");
                var a = $(this).css("backgroundImage");
                $("#rev1").css("background", a + "0% 0% / cover no-repeat scroll padding-box border-box rgba(0, 0, 0, 0)");
            })

            $("#show").mouseout(function() {
                $("#rev").css("display", "none");
                $("#show1").css("display", "none");
            })
            // var num=
            $("#prev").click(function() {
                var x = $("#picture #xiao ul li").size() - 4;
                var y = $("#picture #xiao ul").css('left').slice(0, 1);
                console.log(y);
                if (y == -x * 75 + "px") {

                } else {
                    $("#picture #xiao ul").css('left', y - 75);
                }
            })

            $("#next").click(function() {
                var x = $("#picture #xiao ul li").size() - 4;
                var y = $("#picture #xiao ul").css('left').slice(0, 3);
                console.log(y);
                if (y == x * 75) {

                } else {
                    $("#picture #xiao ul").css('left', y * 1 + 75);
                }
            })

            var show = document.getElementById('show');
            var show1 = document.getElementById('show1');
            var pic = document.getElementById('pictrue')
            // var lis = pictrue.getElementsByTagName('li');
            var rev = document.getElementById('rev');
            var rev1 = document.getElementById('rev1');

            var scale = 3; //放大或缩小的倍数
            show.onmousemove = function(e) {
                console.log("x");
                //设置遮罩层的宽高
                rev.style.width = parseInt(show.offsetWidth / scale) + 'px';
                rev.style.height = parseInt(show.offsetHeight / scale) + 'px';

                //设置鼠标移动进去 遮罩层一直跟在鼠标中间的left值和top值
                var l = e.pageX - 160 - rev.offsetWidth / 2;
                var t = e.pageY - 185 - rev.offsetHeight / 2;

                //设置遮罩层不可以超过图片盒子show的范围
                l = l <= 0 ? 0 : l;
                l = l >= show.offsetWidth - rev.offsetWidth ? show.offsetWidth - rev.offsetWidth : l;
                t = t <= 0 ? 0 : t;
                t = t >= show.offsetHeight - rev.offsetHeight ? show.offsetHeight - rev.offsetHeight : t;

                //赋值给left、top
                rev.style.left = l + 'px';
                rev.style.top = t + 'px';

                //设置图片扩大倍数的宽高
                rev1.style.width = show.offsetWidth * scale + 'px';
                rev1.style.height = show.offsetHeight * scale + 'px';

                //当遮罩层跟随鼠标向右移动时 rev1整体要向左移动 所以marginLeft要为负值
                rev1.style.marginLeft = (-1) * l * scale + 'px';
                rev1.style.marginTop = (-1) * t * scale + 'px';
            }
        })
    })
})