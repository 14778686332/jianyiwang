"use strict";require.config({paths:{jquery:"../lib/js/jquery-1.10.1.min"},shim:{}}),require(["jquery"],function(i){i(function(){function e(e){return/^1[34578]\d{9}$/.test(e)}function t(){for(var e="0987654321zxcvbnmkjhgfdsaqwertyuioplZXCVBNMLKJHGFDSAQWERTYUIOP",t="",s=0;s<4;s++){t+=e[parseInt(Math.random()*e.length)]}return t}function s(){i(this).next().html(""),i(this).css("border","1px solid #e2e2e2"),i(this).next().next().removeClass("correct")}i("#txt").focus(s),i("#pw").focus(s),i("#qrmm").focus(s),i("#yzm").focus(s);var c=!1,o=!1;function l(){if(""==i("#txt").val().trim())i("#txt").css("border","1px solid #c40000"),i("#txt").next().html("<em class='ico'></em>手机号不能为空");else{if(e(i("#txt").val()))return i.ajax({type:"get",url:"../api/02.checkregister.php",async:!1,data:"username="+i("#txt").val(),success:function(e){"yes"==e?(i("#txt").next().next().addClass("correct"),c=!0):(i("#txt").css("border","1px solid #c40000"),i("#txt").next().html("<em class='ico'></em>手机号已被使用，请重新输入"))}}),c;i("#txt").css("border","1px solid #c40000"),i("#txt").next().html("<em class='ico'></em>手机号格式不正确")}}function m(){if(0==i("#pw").val().length)i("#pw").css("border","1px solid #c40000"),i("#pw").next().html("<em class='ico'></em>密码不能为空");else{if(!(i("#pw").val().length<6||20<i("#pw").val().length))return i("#pw").next().next().addClass("correct"),!0;i("#pw").css("border","1px solid #c40000"),i("#pw").next().html("<em class='ico'></em>6-20个大小写英文字母，符号或数字！")}}function r(){if(0==i("#qrmm").val().length)i("#qrmm").css("border","1px solid #c40000"),i("#qrmm").next().html("<em class='ico'></em>密码不能为空");else if(i("#qrmm").val().length<6||20<i("#qrmm").val().length)i("#qrmm").css("border","1px solid #c40000"),i("#qrmm").next().html("<em class='ico'></em>6-20个大小写英文字母，符号或数字！");else{if(i("#qrmm").val()==i("#pw").val())return i("#qrmm").next().next().addClass("correct"),!0;i("#qrmm").css("border","1px solid #c40000"),i("#qrmm").next().html("<em class='ico'></em>两次密码输入不一致，请重新输入！")}}var n=0;i("#pw").keyup(function(){var e=function(e){var t=0;if(e.length<6||20<e.length)return t;switch(/\d/.test(e)&&t++,/[a-z]/.test(e)&&t++,/[A-Z]/.test(e)&&t++,/\W/.test(e)&&t++,t){case 1:return 1;case 2:return 2;case 3:return 3;case 4:return 4}}(i(this).val());1==e||2==e?i("#aqStyle").css("background-position","0 -114px"):3==e?i("#aqStyle").css("background-position","0 -129px"):4==e&&i("#aqStyle").css("background-position","0 -144px")}),i("#sjyzm").click(function(){i(this).val(t())}),i("#txt").blur(l),i("#pw").blur(m),i("#qrmm").blur(r),i("#qryzm").click(function(){if(""==i("#txt").val().trim())i("#txt").css("border","1px solid #c40000"),i("#txt").next().html("<em class='ico'></em>手机号不能为空"),i("#yzm").css("border","1px solid #c40000"),i("#yzm").next().html("<em class='ico'></em>手机号不能为空");else{if(e(i("#txt").val()))return i.ajax({type:"get",url:"../api/02.checkregister.php",data:"username="+i("#txt").val(),async:!1,success:function(e){if("yes"==e)if(i("#txt").next().next().addClass("correct"),""==i("#yzm").val().trim())i("#yzm").css("border","1px solid #c40000"),i("#yzm").next().html("<em class='ico'></em>验证码不能为空");else if(i("#yzm").val().toLowerCase()==i("#sjyzm").val().toLowerCase()){o=!0,i("#yzm").next().html(""),i("#yzm").css("border","1px solid #e2e2e2");i("#sjyzm").remove(),i("#qryzm").remove(),i("#yzm").val(""),i("#duanxin dd").append('<input type="button" id="code_mobile" value="获取短信验证码">');var s=60;i("#code_mobile").click(function(){function e(){--s<=0?(clearInterval(t,1e3),s=60,i("#code_mobile").val("重新发送验证码"),i("#code_mobile")[0].disabled="",i("#code_mobile").css("color","#000"),i("#code_mobile").css("background","#e3e3e3")):(i("#code_mobile").val(s+"秒后可重发"),i("#code_mobile")[0].disabled="disabled",i("#code_mobile").css("color","#999"),i("#code_mobile").css("background","#eeeded"))}i.ajax({type:"post",url:"../lib/api/duanxin.php",data:"userphone="+i("#txt").val(),success:function(e){var t=JSON.parse(e);console.log(t),t.phonecode&&(n=t.phonecode)}}),e();var t=setInterval(e,1e3)})}else i("#yzm").next().html("<em class='ico'></em>验证码错误");else i("#txt").css("border","1px solid #c40000"),i("#txt").next().html("<em class='ico'></em>手机号已被使用，请重新输入"),i("#yzm").css("border","1px solid #c40000"),i("#yzm").next().html("<em class='ico'></em>手机号格式不正确")}}),o;i("#txt").css("border","1px solid #c40000"),i("#txt").next().html("<em class='ico'></em>手机号格式不正确"),i("#yzm").css("border","1px solid #c40000"),i("#yzm").next().html("<em class='ico'></em>手机号格式不正确")}}),i("#sjyzm").val(t());var a=!1;i("#tj").click(function(){console.log(n),console.log(i("#yzm").val());var e=l(),t=m(),s=r();n?i("#yzm").val()==n?(a=!0,i("#yzm").next().html(""),i("#yzm").css("border","1px solid #e2e2e2")):(a=!1,i("#yzm").next().html("<em class='ico'></em>手机验证码错误"),i("#yzm").css("border","1px solid #c40000")):(a=!1,""==i("#yzm").val().trim()?i("#yzm").next().html("<em class='ico'></em>请输入正确的验证码"):i("#yzm").val().toLowerCase()==i("#sjyzm").val().toLowerCase()?i("#yzm").next().html("<em class='ico'></em>请点击右侧的确认验证码"):i("#yzm").next().html("<em class='ico'></em>请输入正确的验证码"),i("#yzm").css("border","1px solid #c40000")),console.log(e),console.log(t),console.log(s),console.log(a),e&&t&&s&&a&&i.ajax({type:"post",url:"../api/03.check_reg.php",data:"phone="+i("#txt").val()+"&password="+i("#pw").val(),success:function(){confirm("注册成功")&&(location.href="../html/login.html")}})})})});