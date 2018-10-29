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
                    alert('注册成功，即将返回来时的页面')
                    if (location.search.startsWith("?back=")) {
                        var url = location.search.slice(6);//?back=http:......从第六位h开始截取到最后                    
                    } else {
                        var url = "index.html";
                    }
                    location.href = url;
                }
            })()
    })
})