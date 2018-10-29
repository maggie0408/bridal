$(function(){//dom内容加载后就提前触发
    $("input.myBtn").click(function(){
        var uname=$("input.uname").val();
        var upwd=$("input.upwd").val();
        (async function(res){
            var res=await $.ajax({
                url: "http://localhost:8000/users/signin",
                type: "post",
                data: { uname, upwd },
                dataType: "json"
            })
            if(res.ok==0) alert(res.msg);
            else{         
                alert("登录成功，即将返回来时的页面");       
                if(location.search.startsWith("?back=")){
                    var url = location.search.slice(6);//?back=http:......从第六位h开始截取到最后                    
                }else{
                    var url="index.html";
                }
                location.href = url;                
            }
        })()
    })
})