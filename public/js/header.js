$(function(){
    $("<link rel='stylesheet' href='../css/header.css'>").appendTo("head");    
    $.ajax({
        url:"http://localhost:8000/header.html",
        type:"get",
        success:function(res){
            $("#header").replaceWith(res);
            //导航栏移动效果
            $("#menus").on("mouseover","div",function(){
                var $name=$(this);
                var i=$name.prevAll().length;
                //console.log(i);
                $("#expanding>li").eq(i).addClass("active")
            })
            $("#menus").on("mouseout","div",function(){
                var $name=$(this);
                var i=$name.prevAll().length;
                $("#expanding>li").eq(i).removeClass("active");
            })

            //登录跳转
            $("#btnSignin").click(function(){
                location.href="signin.html?back="+location.href;
            })
            $.ajax({
                url:"http://localhost:8000/users/issignin",
                type:"get",
                dataType:"json",
                success:function(res){
                    if(res.ok==0){
                        $("#out").show().next().hide();
                    }else{
                        $("#uname").html(res.uname);
                        $("#out").hide().next().show();
                    }
                }
            })

            //注册账号
            $("#btnSignup").click(function(){
                location.href="signup.html?back="+location.href;
            })



            //退出账号
            $("#btnSignout").click(function(){
                $.ajax({
                    url:"http://localhost:8000/users/signout",
                    type:"get",
                    success:function(){
                        alert("您的账号已退出");
                        location.reload();
                    }
                })
            })
        }
    })

    
});
