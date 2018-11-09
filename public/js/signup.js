$(function(){
    $("#submit").click(function(){
        var uname=$("input.uname").val(),
            upwd=$("input.upwd").val();
            email=$("input.email").val();
            phone=$("input.phone").val();
            (async function(res){
                var res=await $.ajax({
                    url: "http://localhost:8000/users/signup",
                    type: "post",
                    data: {uname,upwd,email,phone},
                    dataType: "json"
                });
                if(res.code==401) alert(res.msg)
                else if(res.code==402) alert(res.msg)
                else if(res.code==403) alert(res.msg)
                else if(res.code==404) alert(res.msg)
                else{
                    alert('注册成功，即将返回登录页面')
                    location.href="signin.html?back="+location.href;
                }
            })()
    })
})