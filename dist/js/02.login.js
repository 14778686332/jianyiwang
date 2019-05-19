// 引入模块
require.config({ //配置参数设置
    paths: { //用于配置短路径的，重命名的，一般对不是在基础路径下的文件进行重命名
        'jquery': '../lib/js/jquery-1.10.1.min',
        "common" : "common"
    },
    shim: { //设置依赖关系

    }
})

require(["jquery","common"], function($) {
            $(function() {
                $(".signin-title li").click(function() {
                    var index = $(this).index();
                    $(this).find('input').attr("checked", "checked").closest('li').siblings().find('input').removeAttr("checked", "checked")
                    $(".signin-main>div").eq(index).show().siblings().hide();
                })

                function randomCode() {
                    //随机验证码
                    var html = '0987654321zxcvbnmkjhgfdsaqwertyuioplZXCVBNMLKJHGFDSAQWERTYUIOP';
                    var num = ''; //存四位数的
                    for (var i = 0; i < 4; i++) {
                        //随机数范围：0-html.length-1
                        var now = parseInt(Math.random() * html.length); //0-html.length-1
                        num += html[now];
                    }

                    return num; //返回
                }

                $("#sjyzm").val(randomCode());

                $("#sjyzm").click(function() {
                    $("#sjyzm").val(randomCode());
                })

                var isok = false;

                //聚焦
                function jujiao() {
                    $(this).next().html("");
                    $(this).css("border", "1px solid #e2e2e2");
                    $(this).next().attr("class", "");
                }

                $("#checkphone").focus(jujiao);
                $("#checkpw").focus(jujiao);
                $("#input_quickLogin").focus(jujiao);
                $("#yzm").focus(jujiao);

                // 普通登录
                function checkphone() {
                    if ($("#checkphone").val().trim() == "") {
                        $("#checkphone").next().html("请输入手机号");
                        $("#checkphone").css("border", "1px solid #c40000");
                        $("#checkphone").next().attr("class", "focus error");
                    } else {
                        $.ajax({
                            type: "get",
                            url: "../api/04.checklogin.php",
                            async: false,
                            data: "phone=" + $("#checkphone").val(),
                            success: function(str) {
                                var arr = JSON.parse(str);
                                console.log(arr);
                                if (arr.dianhua) {
                                    checkpw();
                                } else {
                                    $("#checkphone").next().html("您输入的账户名不存在，请核对后重新输入");
                                    $("#checkphone").css("border", "1px solid #c40000");
                                    $("#checkphone").next().attr("class", "focus error");
                                }
                            }
                        })
                        return isok;
                    }
                }

                function checkpw() {
                    if ($("#checkpw").val().trim() == "") {
                        $("#checkpw").next().html("请输入密码");
                        $("#checkpw").css("border", "1px solid #c40000");
                        $("#checkpw").next().attr("class", "focus error");
                    } else {
                        $.ajax({
                            type: "get",
                            url: "../api/04.checklogin.php",
                            async: false,
                            data: "phone1=" + $("#checkphone").val() + "&pw=" + $("#checkpw").val(),
                            success: function(str) {
                                var arr1 = JSON.parse(str);
                                if (arr1.liangge) {
                                    isok = true;
                                } else {
                                    $("#checkpw").next().html("密码与用户名不匹配，请重新输入！");
                                    $("#checkpw").css("border", "1px solid #c40000");
                                    $("#checkpw").next().attr("class", "focus error");
                                }
                            }
                        })
                    }
                }

                $("#ptLogin").click(function() {
                    var yes = checkphone();
                    if (yes) {
                        location.href = '../index.html';
                        setcookie('name', $("#checkphone").val(), 1);
                    }
                })


                // 快捷登录
                var ok = false;

                function checkdianhua() {
                    if ($("#input_quickLogin").val().trim() == "") {
                        $("#input_quickLogin").next().html("请输入手机号");
                        $("#input_quickLogin").css("border", "1px solid #c40000");
                        $("#input_quickLogin").next().attr("class", "focus error");
                    } else {
                        $.ajax({
                            type: "get",
                            url: "../api/04.checklogin.php",
                            async: false,
                            data: "phone=" + $("#input_quickLogin").val(),
                            success: function(str) {
                                var arr = JSON.parse(str);
                                console.log(arr);
                                if (arr.dianhua) {
                                    ok = true;
                                } else {
                                    $("#input_quickLogin").next().html("您输入的账户名不存在，请核对后重新输入");
                                    $("#input_quickLogin").css("border", "1px solid #c40000");
                                    $("#input_quickLogin").next().attr("class", "focus error");
                                }
                            }
                        })
                        return ok;
                    }
                }


                var duanxin = 0;

                function checkyzm() {
                    var en = checkdianhua()
                    if (en) {
                        if ($("#yzm").val().trim() == "") {
                            $("#yzm").css("border", "1px solid #c40000");
                            $("#yzm").next().html("验证码不能为空");
                            $("#yzm").next().attr("class", "focus error");
                        } else if ($("#yzm").val().toLowerCase() == $("#sjyzm").val().toLowerCase()) {
                            // isok1 = true;
                            $("#yzm").next().html("");
                            $("#yzm").css("border", "1px solid #e2e2e2");
                            $("#yzm").next().attr("class", "");
                            var html = `<input type="button" id="code_mobile" value="获取短信验证码">`;
                            $("#sjyzm").remove();
                            $("#qryzm").remove();
                            $("#yzm").val("");
                            $("#duanxin").append(html);
                            var num = 60;
                            $("#code_mobile").click(function() {
                                $.ajax({
                                    type: 'post',
                                    url: '../lib/api/duanxin.php',
                                    data: 'userphone=' + $("#input_quickLogin").val(),
                                    success: function(str) {
                                        var arr = JSON.parse(str);
                                        if (arr.phonecode) {
                                            duanxin = arr.phonecode;
                                        }
                                    }
                                });
                                showTime();

                                function showTime() {
                                    num--;
                                    if (num <= 0) {
                                        clearInterval(timer, 1000);
                                        num = 60;
                                        $("#code_mobile").val("重新发送验证码");
                                        $("#code_mobile")[0].disabled = '';
                                        $("#code_mobile").css("color", "#000");
                                        $("#code_mobile").css("background", "#e3e3e3");
                                    } else {
                                        $("#code_mobile").val(num + "秒后可重发");
                                        $("#code_mobile")[0].disabled = 'disabled';
                                        $("#code_mobile").css("color", "#999");
                                        $("#code_mobile").css("background", "#eeeded");
                                    }
                                }

                                var timer = setInterval(showTime, 1000);
                            })
                        } else {
                            $("#yzm").css("border", "1px solid #c40000");
                            $("#yzm").next().html("验证码错误");
                            $("#yzm").next().attr("class", "focus error");
                        }
                    } else {
                        $("#yzm").next().html("请输入正确的手机号");
                        $("#yzm").css("border", "1px solid #c40000");
                        $("#yzm").next().attr("class", "focus error");
                    }

                }

                var res1 = false;

                // 确认验证码
                $("#qryzm").click(checkyzm);

                $("#ptLogin2").click(function() {
                    var yes = checkdianhua();
                    if (duanxin) {
                        if ($("#yzm").val() == duanxin) {
                            res1 = true;
                            $("#yzm").next().html("");
                            $("#yzm").css("border", "1px solid #e2e2e2");
                            $("#yzm").next().attr("class", "");
                        } else {
                            res1 = false;
                            $("#yzm").next().html("手机验证码错误");
                            $("#yzm").css("border", "1px solid #c40000");
                            $("#yzm").next().attr("class", "focus error");

                        }
                    } else {
                        res1 = false;
                        if ($("#yzm").val().trim() == "") {
                            $("#yzm").next().html("请输入正确的验证码");
                            $("#yzm").css("border", "1px solid #c40000");
                            $("#yzm").next().attr("class", "focus error");
                        } else if ($("#yzm").val().toLowerCase() == $("#sjyzm").val().toLowerCase()) {
                            $("#yzm").next().html("请点击右侧的确认验证码");
                            $("#yzm").css("border", "1px solid #c40000");
                            $("#yzm").next().attr("class", "focus error");
                        } else {
                            $("#yzm").next().html("请输入正确的验证码");
                            $("#yzm").css("border", "1px solid #c40000");
                            $("#yzm").next().attr("class", "focus error");
                        }


                    }
                    console.log(yes);
                    console.log(res1);
                    if (yes && res1) {
                        location.href = '../index.html';
                        setcookie('name', $("#input_quickLogin").val(), 1);
                    }
                })

            })
        })