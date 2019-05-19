// 引入模块
require.config({ //配置参数设置
    paths: { //用于配置短路径的，重命名的，一般对不是在基础路径下的文件进行重命名
        'jquery': '../lib/js/jquery-1.10.1.min'
    },
    shim: { //设置依赖关系

    }
})

require(["jquery"], function($) {
            $(function() {
                // 验证手机号
                function isPhoneNo(phone) {
                    var pattern = /^1[34578]\d{9}$/;
                    return pattern.test(phone);
                }
                //检测密码等级
                function checkPw(value) {
                    //level = 1，弱;
                    //level = 2，中;
                    //level = 3，强;
                    //level = 4，超强;
                    var level = 0;
                    if (value.length < 6 || value.length > 20) {
                        return level;
                    }
                    if (/\d/.test(value)) {
                        level++;
                    }
                    if (/[a-z]/.test(value)) {
                        level++;
                    }
                    if (/[A-Z]/.test(value)) {
                        level++;
                    }
                    if (/\W/.test(value)) {
                        level++
                    }

                    switch (level) {
                        case 1:
                            return 1;
                            break;
                        case 2:
                            return 2;
                            break;
                        case 3:
                            return 3;
                            break;
                        case 4:
                            return 4;
                            break;
                    }
                }

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

                //聚焦
                function jujiao() {
                    $(this).next().html("");
                    $(this).css("border", "1px solid #e2e2e2");
                    $(this).next().next().removeClass('correct');
                }
                //框聚焦时
                $("#txt").focus(jujiao);
                $("#pw").focus(jujiao);
                $("#qrmm").focus(jujiao);
                $("#yzm").focus(jujiao);
                var isok = false;
                var isok1 = false;

                //校验手机框
                function checkphone() {

                    if ($("#txt").val().trim() == "") {
                        $("#txt").css("border", "1px solid #c40000");
                        $("#txt").next().html("<em class='ico'></em>手机号不能为空");
                    } else if (isPhoneNo($("#txt").val())) {
                        $.ajax({
                            type: 'get',
                            url: "../api/02.checkregister.php",
                            async: false,
                            data: 'username=' + $("#txt").val(),
                            success: function(str) {
                                if (str == 'yes') {
                                    $("#txt").next().next().addClass("correct");
                                    isok = true;
                                } else {
                                    $("#txt").css("border", "1px solid #c40000");
                                    $("#txt").next().html("<em class='ico'></em>手机号已被使用，请重新输入");
                                }
                            }
                        })
                        return isok;
                    } else {
                        $("#txt").css("border", "1px solid #c40000");
                        $("#txt").next().html("<em class='ico'></em>手机号格式不正确");
                    }
                }

                // 校验密码框
                function checkpw() {
                    if ($("#pw").val().length == 0) {
                        $("#pw").css("border", "1px solid #c40000");
                        $("#pw").next().html("<em class='ico'></em>密码不能为空");
                    } else if ($("#pw").val().length < 6 || $("#pw").val().length > 20) {
                        $("#pw").css("border", "1px solid #c40000");
                        $("#pw").next().html("<em class='ico'></em>6-20个大小写英文字母，符号或数字！");
                    } else {
                        $("#pw").next().next().addClass("correct");
                        return true;
                    }
                }

                // 校验确认密码框
                function comfirmpw() {
                    if ($("#qrmm").val().length == 0) {
                        $("#qrmm").css("border", "1px solid #c40000");
                        $("#qrmm").next().html("<em class='ico'></em>密码不能为空");
                    } else if ($("#qrmm").val().length < 6 || $("#qrmm").val().length > 20) {
                        $("#qrmm").css("border", "1px solid #c40000");
                        $("#qrmm").next().html("<em class='ico'></em>6-20个大小写英文字母，符号或数字！");
                    } else if ($("#qrmm").val() != $("#pw").val()) {
                        $("#qrmm").css("border", "1px solid #c40000");
                        $("#qrmm").next().html("<em class='ico'></em>两次密码输入不一致，请重新输入！");
                    } else {
                        $("#qrmm").next().next().addClass("correct");
                        return true;
                    }
                }

                var dxyzm = 0;

                // 检验验证码框
                function checkyzm() {

                    if ($("#txt").val().trim() == "") {
                        $("#txt").css("border", "1px solid #c40000");
                        $("#txt").next().html("<em class='ico'></em>手机号不能为空");
                        $("#yzm").css("border", "1px solid #c40000");
                        $("#yzm").next().html("<em class='ico'></em>手机号不能为空");
                    } else if (isPhoneNo($("#txt").val())) {

                        $.ajax({
                            type: 'get',
                            url: "../api/02.checkregister.php",
                            data: 'username=' + $("#txt").val(),
                            async: false,
                            success: function(str) {
                                if (str == 'yes') {
                                    $("#txt").next().next().addClass("correct");
                                    if ($("#yzm").val().trim() == "") {
                                        $("#yzm").css("border", "1px solid #c40000");
                                        $("#yzm").next().html("<em class='ico'></em>验证码不能为空");
                                    } else if ($("#yzm").val().toLowerCase() == $("#sjyzm").val().toLowerCase()) {
                                        isok1 = true;
                                        $("#yzm").next().html("");
                                        $("#yzm").css("border", "1px solid #e2e2e2");
                                        var html = `<input type="button" id="code_mobile" value="获取短信验证码">`;
                                        $("#sjyzm").remove();
                                        $("#qryzm").remove();
                                        $("#yzm").val("");
                                        $("#duanxin dd").append(html);
                                        var num = 60;
                                        $("#code_mobile").click(function() {
                                            $.ajax({
                                                type: 'post',
                                                url: '../lib/api/duanxin.php',
                                                data: 'userphone=' + $("#txt").val(),
                                                success: function(str) {

                                                    var arr = JSON.parse(str);
                                                    console.log(arr);
                                                    if (arr.phonecode) {
                                                        dxyzm = arr.phonecode;
                                                    }
                                                }
                                            });
                                            // dxyzm = 1234;
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
                                        $("#yzm").next().html("<em class='ico'></em>验证码错误");
                                    }
                                } else {
                                    $("#txt").css("border", "1px solid #c40000");
                                    $("#txt").next().html("<em class='ico'></em>手机号已被使用，请重新输入");
                                    $("#yzm").css("border", "1px solid #c40000");
                                    $("#yzm").next().html("<em class='ico'></em>手机号格式不正确");
                                }
                            }
                        })
                        return isok1;
                    } else {
                        $("#txt").css("border", "1px solid #c40000");
                        $("#txt").next().html("<em class='ico'></em>手机号格式不正确");
                        $("#yzm").css("border", "1px solid #c40000");
                        $("#yzm").next().html("<em class='ico'></em>手机号格式不正确");
                    }
                }



                $("#pw").keyup(function() {
                    var level = checkPw($(this).val());
                    if (level == 1 || level == 2) {
                        $("#aqStyle").css("background-position", "0 -114px");
                    } else if (level == 3) {
                        $("#aqStyle").css("background-position", "0 -129px");
                    } else if (level == 4) {
                        $("#aqStyle").css("background-position", "0 -144px");
                    }
                });

                // 随机验证码
                $("#sjyzm").click(function() {
                    $(this).val(randomCode());
                })


                //txt框离焦时
                $("#txt").blur(checkphone);
                //密码框失去焦点时
                $("#pw").blur(checkpw);
                // 确认密码框失去焦点时
                $("#qrmm").blur(comfirmpw);
                // 确认验证码
                $("#qryzm").click(checkyzm);

                $("#sjyzm").val(randomCode());

                var res1 = false;

                // 注册
                $("#tj").click(function() {
                    console.log(dxyzm);
                    console.log($("#yzm").val())
                    var phone = checkphone();
                    var pw = checkpw();
                    var qrmm = comfirmpw();
                    if (dxyzm) {
                        if ($("#yzm").val() == dxyzm) {
                            res1 = true;
                            $("#yzm").next().html("");
                            $("#yzm").css("border", "1px solid #e2e2e2");
                        } else {
                            res1 = false;
                            $("#yzm").next().html("<em class='ico'></em>手机验证码错误");
                            $("#yzm").css("border", "1px solid #c40000");
                        }
                    } else {
                        res1 = false;
                        if ($("#yzm").val().trim() == "") {
                            $("#yzm").next().html("<em class='ico'></em>请输入正确的验证码");
                            $("#yzm").css("border", "1px solid #c40000");
                        } else if ($("#yzm").val().toLowerCase() == $("#sjyzm").val().toLowerCase()) {
                            $("#yzm").next().html("<em class='ico'></em>请点击右侧的确认验证码");
                            $("#yzm").css("border", "1px solid #c40000");
                        } else {
                            $("#yzm").next().html("<em class='ico'></em>请输入正确的验证码");
                            $("#yzm").css("border", "1px solid #c40000");
                        }

                    }
                    if (phone && pw && qrmm && res1) {
                        $.ajax({
                            type: "post",
                            url: "../api/03.check_reg.php",
                            data: "phone=" + $("#txt").val() + "&password=" + $("#pw").val(),
                            success: function(str) {
                                var res = confirm("注册成功");
                                if (res) {
                                    location.href = "../html/login.html";
                                }
                            }
                        })
                    }
                })

            })
        })