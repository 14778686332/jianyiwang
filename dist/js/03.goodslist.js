// 引入模块
require.config({ //配置参数设置
    paths: { //用于配置短路径的，重命名的，一般对不是在基础路径下的文件进行重命名
        'jquery': '../lib/js/jquery-1.10.1.min',
        'common': 'common'
    },
    shim: { //设置依赖关系

    }
})

require(["jquery", "common"], function($) {
    $(function() {

        $(window).bind("scroll resize", function() {
            var winwidth = $(window).width();
            if ($(window).scrollTop() > 400) {
                $("#toTop").slideDown("slow");
            } else {
                $("#toTop").slideUp("slow");
            }
        })

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
            $("#dengluhou").html("您好，" + str + "欢迎来到健一网网上药店!<a id='tc' href='../index.html'>退出</a>")
        } else {
            $("#dengluhou").html('欢迎来到健一网<h1>网上药店</h1>！[ <a href="login.html">登录</a> ] [ <a href="register.html">注册</a> ]');
        }

        //退出
        $("#tc").click(function() {
            removecookie('name');
            location.href = '../index.html';
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

        var ye;
        var mya;
        var sya = 1;
        var dda0 = true;
        var dda1 = true;
        var dda2 = true;
        var dda3 = true;
        var types = '';
        var orders = '';
        var mins = "";
        var maxs = "";
        var kuangs = "";
        init({});


        $(".px dd a").eq(0).click(function() {
            $(".px dd a").removeClass("current");
            $(this).addClass("current");
            $(".px dd a span").css("background-position", "-92px -32px");
            if (dda0) {
                $(this).find("span").css("background-position", "-92px 6px");
                types = 'goodsale';
                orders = 'desc';
                kuangs = "";
                init({ yes: 1, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
            } else {
                $(this).find("span").css("background-position", "-92px -13px");
                types = 'goodsale';
                orders = 'asc';
                kuangs = "";
                init({ yes: 1, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
            }
            dda0 = !dda0;
            dda1 = true;
            dda2 = true;
            dda3 = true;
        })

        $(".px dd a").eq(1).click(function() {
            $(".px dd a").removeClass("current");
            $(this).addClass("current");
            $(".px dd a span").css("background-position", "-92px -32px");
            if (dda1) {
                $(this).find("span").css("background-position", "-92px 6px");
                types = 'goodspl';
                orders = 'desc';
                kuangs = "";
                init({ yes: 1, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
            } else {
                $(this).find("span").css("background-position", "-92px -13px");
                types = 'goodspl';
                orders = 'asc';
                kuangs = "";
                init({ yes: 1, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
            }
            dda1 = !dda1;
            dda0 = true;
            dda2 = true;
            dda3 = true;

        })

        $(".px dd a").eq(2).click(function() {
            $(".px dd a").removeClass("current");
            $(this).addClass("current");
            $(".px dd a span").css("background-position", "-92px -32px");
            if (dda2) {
                $(this).find("span").css("background-position", "-92px 6px");
                types = 'goodsmoney';
                orders = 'desc';
                kuangs = "";
                init({ yes: 1, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
            } else {
                $(this).find("span").css("background-position", "-92px -13px");
                types = 'goodsmoney';
                orders = 'asc';
                kuangs = "";
                init({ yes: 1, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
            }
            dda2 = !dda2;
            dda0 = true;
            dda1 = true;
            dda3 = true;
        })

        $(".px dd a").eq(3).click(function() {
            $(".px dd a").removeClass("current");
            $(this).addClass("current");
            $(".px dd a span").css("background-position", "-92px -32px");
            if (dda3) {
                $(this).find("span").css("background-position", "-92px 6px");
                types = '';
                orders = '';
                kuangs = "";
                init({ yes: 1, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
            } else {
                $(this).find("span").css("background-position", "-92px -13px");
                types = '';
                orders = '';
                kuangs = "";
                init({ yes: 1, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
            }
            dda3 = !dda3;
            dda0 = true;
            dda2 = true;
            dda1 = true;
        })

        $(".pagenav a").eq(0).click(function() {
            ye--;
            if (ye <= 1) {
                ye = 1
            }
            init({ yes: ye, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
        })

        $(".pagenav a").eq(1).click(function() {
            ye++;
            if (ye >= 2) {
                ye = 2;
            }
            init({ yes: ye, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
        })

        $(".get-page .get_input").keyup(function() {
            if ($(".get-page .get_input").val() >= 2) {
                $(".get-page .get_input").val("2");
            } else if ($(".get-page .get_input").val() <= 1) {
                $(".get-page .get_input").val("1");
            }
        })

        $(".get-page .btn").click(function() {
            ye = $(".get-page .get_input").val();
            init({ yes: ye, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
        })

        $("#search").click(function() {
            kuangs = $("#kuang").val();
            types = "";
            orders = "";
            init({ yes: ye, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
        })

        function init({ yes = 1, type = "", order = "", min = "", max = "", kuang = "" }) {

            var hang = 28; //一页显示多少条数据
            ye = yes;
            $.ajax({
                type: "get",
                url: "../api/05.goodslist.php",
                data: "hang=" + hang + "&ye=" + ye + "&type=" + type + "&order=" + order + "&kuang=" + kuang,
                success: function(str) {
                    var arr = JSON.parse(str);
                    console.log(arr);
                    $(".main_r_m").html("");
                    for (var i = 0; i < arr.zong; i++) {
                        if ($(".listsearch-jg").size()) {
                            var a = $(".listsearch-jg").size();
                            if ($(".listsearch-jg:eq(" + (a - 1) + ") .listsearch-one").size() < 4) {
                                var x = `<div class="listsearch-one">
                                <div class="listsearch-ztimg">
                                    ${arr.goodslist[i].goodsong}
                                    <center>
                                        <a href="###">
                                            <img data-id="${arr.goodslist[i].sid}" src="${arr.goodslist[i].goodsimg}" height="200" width="200" alt="" />
                                        </a>
                                    </center>
                                </div>
                                <div class="listsearch-cx">                               
                                </div>
                                <div class="listsearch-mc">
                                    <a data-id="${arr.goodslist[i].sid}" href="###">
                                         ${arr.goodslist[i].goodscanshu}
                                    </a>
                                </div>
                                <div class="listsearch-price">
                                    <span class="liststyle2">¥${arr.goodslist[i].goodsmoney}</span>
                                </div>
                                <div class="listsearch-des">
                                    <span>总销量：${arr.goodslist[i].goodsale}</span>
                                    <a href="###">
                                        ${arr.goodslist[i].goodspl}条评论
                                    </a>
                                </div>
                                <div class="listsearch-xq">
                                    <div class="listshop">
                                        <a class="jrcart" data-id="${arr.goodslist[i].sid}" href="###">
                                            <span class="shopnow"></span>
                                            <cite>加入购物车</cite>
                                        </a>
                                    </div>
                                    <div class="listcheck">
                                        <a data-id="${arr.goodslist[i].sid}" href="###">查看详情</a>
                                    </div>
                                </div>
                            </div>`;
                                $(".listsearch-jg").eq($(".listsearch-jg").size() - 1).append(x);
                            } else {
                                $(".main_r_m").append("<div class='listsearch-jg'></div>");
                                var html = `<div class="listsearch-one">
                                <div class="listsearch-ztimg">
                                    ${arr.goodslist[i].goodsong}
                                    <center>
                                        <a href="###">
                                            <img src="${arr.goodslist[i].goodsimg}" height="200" width="200" alt="" />
                                        </a>
                                    </center>
                                </div>
                                <div class="listsearch-cx">                               
                                </div>
                                <div class="listsearch-mc">
                                    <a href="###">
                                         ${arr.goodslist[i].goodscanshu}
                                    </a>
                                </div>
                                <div class="listsearch-price">
                                    <span class="liststyle2">¥${arr.goodslist[i].goodsmoney}</span>
                                </div>
                                <div class="listsearch-des">
                                    <span>总销量：${arr.goodslist[i].goodsale}</span>
                                    <a href="###">
                                        ${arr.goodslist[i].goodspl}条评论
                                    </a>
                                </div>
                                <div class="listsearch-xq">
                                    <div class="listshop">
                                        <a class="jrcart" data-id="${arr.goodslist[i].sid}" href="###">
                                            <span class="shopnow"></span>
                                            <cite>加入购物车</cite>
                                        </a>
                                    </div>
                                    <div class="listcheck">
                                        <a href="###">查看详情</a>
                                    </div>
                                </div>
                            </div>`;
                                $(".listsearch-jg").eq($(".listsearch-jg").size() - 1).html(html);
                            }

                        } else {
                            $(".main_r_m").append("<div class='listsearch-jg'></div>");
                            var html = `<div class="listsearch-one">
                                        <div class="listsearch-ztimg">
                                            ${arr.goodslist[0].goodsong}
                                            <center>
                                                <a href="###">
                                                    <img data-id="${arr.goodslist[i].sid}" src="${arr.goodslist[0].goodsimg}" height="200" width="200" alt="" />
                                                </a>
                                            </center>
                                        </div>
                                        <div class="listsearch-cx">                               
                                        </div>
                                        <div class="listsearch-mc">
                                            <a data-id="${arr.goodslist[i].sid}" href="###">
                                                 ${arr.goodslist[0].goodscanshu}
                                            </a>
                                        </div>
                                        <div class="listsearch-price">
                                            <span class="liststyle2">¥${arr.goodslist[0].goodsmoney}</span>
                                        </div>
                                        <div class="listsearch-des">
                                            <span>总销量：${arr.goodslist[0].goodsale}</span>
                                            <a href="###">
                                                ${arr.goodslist[0].goodspl}条评论
                                            </a>
                                        </div>
                                        <div class="listsearch-xq">
                                            <div class="listshop">
                                                <a class="jrcart" data-id="${arr.goodslist[i].sid}" href="###">
                                                    <span class="shopnow"></span>
                                                    <cite>加入购物车</cite>
                                                </a>
                                            </div>
                                            <div class="listcheck">
                                                <a data-id="${arr.goodslist[i].sid}" href="###">查看详情</a>
                                            </div>
                                        </div>
                                    </div>`;
                            $(".listsearch-jg").html(html);
                        }
                    }

                    $(".jrcart").click(function() {
                        // var x = $(this).attr("data-id") - 1;
                        var bigji = $(this).parent().parent().parent().parent().index();
                        var ji = $(this).parent().parent().parent().index();
                        var x = ji + bigji * 4;
                        var jqd = arr.goodslist[x].goodscanshu.split(" ")[0];
                        if (getcookie("name")) {
                            $.ajax({
                                type: "get",
                                url: "../api/07.goodsDetail.php",
                                data: "username=" + getcookie("name") + "&dimg=" + arr.goodslist[x].goodsimg + "&dgoodsname=" + jqd + "&huohao=" + $(this).attr("data-id") + "&guige=" + arr.goodslist[x].goodscanshu + "&changjia=" + arr.goodslist[x].changjia + "&dmoney=" + arr.goodslist[x].goodsmoney + "&counts=1",
                                success: function(str) {
                                    location.href = "cart.html";
                                }
                            })
                        } else {
                            var res = confirm("请登录");
                            if (res) {
                                location.href = "login.html";
                            }
                        }
                    })



                    //共多少页
                    var yess = Math.ceil(arr.total / hang);
                    mya = yess;
                    $(".pagenav span").html("共" + arr.total + "个商品");
                    $(".pagenav cite").html(ye + "/" + yess);
                    if (yess == 1) {
                        $(".pagenav a").addClass("disabled");
                    } else if (yess == 2) {
                        if (ye == 1) {
                            $(".pagenav a").removeClass("disabled");
                            $(".pagenav a").eq(0).addClass("disabled");
                        } else if (ye == 2) {
                            $(".pagenav a").removeClass("disabled");
                            $(".pagenav a").eq(1).addClass("disabled");
                        }
                    }

                    var html = "共" + arr.total + "条:";

                    if (yess == 1) {
                        html += `<span class="disabled">首页</span>
                    <span class="disabled">上一页</span>
                    <span class="current">1</span>
                    <span class="disabled">下一页</span>
                    <span class="disabled">末页</span>`;
                        $(".page-bottom").html(html);
                    } else if (yess == 2) {
                        if (arr.page == 1) {
                            html += `<span class="disabled">首页</span>
                        <span class="disabled">上一页</span>
                        <span class="current"> 1</span>
                        <span> <a id="dqy" href="###">2</a></span>
                        <span id="next"> <a href="###">下一页</a></span>
                        <span id="my"><a href="###">末页</a></span>`
                            $(".page-bottom").html(html);
                        } else if (arr.page == 2) {
                            html += `<span id="sy"><a href="###">首页</a></span>
                        <span id="prev"><a href="###">上一页</a></span>
                        <span><a id="dqy" href="###">1</a></span>
                        <span class="current">2</span>
                        <span class="disabled">下一页</span>
                        <span class="disabled">末页</span>`;
                            $(".page-bottom").html(html);
                        }
                    }

                    $(".listcheck a").click(function() {
                        window.open("goodsDetail.html?" + $(this).attr("data-id"));
                    });

                    $(".listsearch-mc a").click(function() {
                        window.open("goodsDetail.html?" + $(this).attr("data-id"));
                    })

                    $(".listsearch-ztimg img").click(function() {
                        window.open("goodsDetail.html?" + $(this).attr("data-id"));
                    })

                }
            })
        }

        $(".page-bottom").on("click", "#dqy", function() {
            ye = $(this).html();
            init({ yes: ye, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
        })

        $(".page-bottom").on("click", "#next", function() {
            ye++;
            init({ yes: ye, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
        })

        $(".page-bottom").on("click", "#prev", function() {
            ye--;
            init({ yes: ye, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
        })

        $(".page-bottom").on("click", "#sy", function() {
            ye = sya;
            init({ yes: ye, min: mins, max: maxs, kuang: kuangs, type: types, order: orders });
        })

        $(".page-bottom").on("click", "#my", function() {
            ye = mya;
            init({ yes: ye });
        })

    })
})