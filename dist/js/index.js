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

    (function() {

        $(window).bind("scroll resize", function() {
            var winwidth = $(window).width();
            if ($(window).scrollTop() > 400) {
                $("#toTop").slideDown("slow");
            } else {
                $("#toTop").slideUp("slow");
            }
        })

        $(".gocart").click(function() {
            if (getcookie("name")) {
                location.href = "html/cart.html";
            } else {
                var res = confirm("请登录");
                if (res) {
                    location.href = "html/login.html";
                }
            }
        })

        var mySwiper1 = new Swiper('#swiper1', {
            autoplay: {
                delay: 2000,
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function(index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
        });
        var swiper1 = document.getElementById('swiper1');
        var prev1 = document.querySelector('#swiper1 .swiper-button-prev');
        var next1 = document.querySelector('#swiper1 .swiper-button-next');
        swiper1.onmouseover = function() {
            mySwiper1.autoplay.stop();
            prev1.style.display = 'block';
            prev1.style.opacity = ".1"
            next1.style.display = 'block';
            next1.style.opacity = ".1"
        }
        swiper1.onmouseout = function() {
            mySwiper1.autoplay.start();
            prev1.style.display = 'none';
            next1.style.display = 'none';
        }
        var mySwiper2 = new Swiper('#swiper2', {
            autoplay: {
                delay: 3000,
            },
            slidesPerView: 3,
            spaceBetween: 0,
            slidesPerGroup: 3,
            loop: true,
            loopFillGroupWithBlank: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        var swiper2 = document.getElementById('swiper2');
        var prev = document.querySelector('#swiper2 .swiper-button-prev');
        var next = document.querySelector('#swiper2 .swiper-button-next');
        swiper2.onmouseover = function() {
            mySwiper2.autoplay.stop();
            prev.style.display = 'block';
            prev.style.opacity = ".1"
            next.style.display = 'block';
            next.style.opacity = ".1"
        }
        swiper2.onmouseout = function() {
            mySwiper2.autoplay.start();
            prev.style.display = 'none';
            next.style.display = 'none';
        }
    })();
    $(function() {
        if (getcookie('name')) {
            var str = getcookie('name');
            $("#dengluhou").html("您好，" + str + "欢迎来到健一网网上药店!<a id='tc' href='index.html'>退出</a>");
        } else {
            $("#dengluhou").html('欢迎来到健一网<h1>网上药店</h1>！[ <a href="html/login.html">登录</a> ] [ <a href="html/register.html">注册</a> ]');
        }

        if (getcookie('name')) {
            $.ajax({
                type: "get",
                url: "api/index.php",
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
                                    <a title="去结算" href="html/cart.html">去结算<em></em></a>
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
                                url: "api/index2.php",
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
                                url: "api/index2.php",
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
                                url: "api/index2.php",
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
                                url: "api/indexdel.php",
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

        $("#tc").click(function() {
            removecookie('name');
            location.href = 'index.html';
        })

        $(".swiper-button-prev").hover(function() {
            console.log('x');
            $(this).stop().animate({ "opacity": .6 }, 500);
        }, function() {
            $(this).stop().animate({ "opacity": .1 }, 500);
        })
        $(".swiper-button-next").hover(function() {
            console.log('x');
            $(this).stop().animate({ "opacity": .6 }, 500);
        }, function() {
            $(this).stop().animate({ "opacity": .1 }, 500);
        })
        $(".xl-tit ul li").mouseover(function() {
            $(this).attr('class', 'act').siblings().attr('class', "");
            $(".xlqg_b .xl-products").eq($(this).index()).css('display', 'block').siblings().css('display', 'none');

        })
        var x = $('.xgg_t').index() + 1;
        $(".xgg_t .hd li").mouseover(function() {

            $(this).attr("class", "on_hover").siblings().attr("class", "");
            $(".xgg_t:nth-child(" + x + ") .bd li").eq($(this).index()).css('display', 'list-item').siblings().css('display', 'none');
        })

        $(".tgys p a").mouseover(function() {
            x = $(this).index() + 1;
            $(this).attr('class', 'act').siblings().attr('class', "");
            $(".xgg_t").eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
        })

        console.log($("#floorDiv1 .floorcenter").length);
        for (let i = 1; i <= $(".floor").length; i++) {
            $("#floorDiv" + i + " .floortitle a").mouseover(function() {
                var len = $("#floorDiv" + i + " .floorcenter").size();
                $(this).attr('class', 'current').siblings().attr('class', "");

                console.log(len);
                for (var j = 0; j < len; j++) {
                    $("#floorDiv" + i + " .floorcenter").eq(j).css('display', 'none');
                }
                $("#floorDiv" + i + " .floorcenter").eq($(this).index()).css('display', 'block');
            })
        }

        $(".hotmend").hover(function() {
            $(this).find(".hd").stop().fadeIn();
            clearInterval(timer);
        }, function() {
            $(this).find(".hd").stop().fadeOut();
            timer = setInterval(next, 3000);
        })

        var ih = $(".hotmend .bd ul li").css("width").split("p")[0];
        $(".hotmend .bd ul").css("width", ih * 6 + "px");

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
        var timer = setInterval(next, 4000);
        var num = 0;

        function next() {
            num++;
            show();
        }

        function show() {
            if (num >= 6) {
                $(".hotmend .bd ul").css("left", -ih + "px");
                num = 2;
            } else if (num < 0) {
                $(".hotmend .bd ul").css("left", -ih * 4 + "px");
                num = 3;
            }

            $(".hotmend .bd ul").animate({ "left": -ih * num }, 1000, "linear");
        }

        $(".hotmend .hd .prev").click(function() {
            num--;
            show();
        })

        $(".hotmend .hd .next").click(function() {
            num++;
            show();
        })
    })
})