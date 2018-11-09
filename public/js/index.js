$(function(){
    //1. 轮播图功能
    //1.1 定义变量
    var num=0;
    var timer=null;
    //1.2 鼠标进入和移出
    $("#box").mouseenter(function(){
        clearInterval(timer);
    }).mouseleave(function(){
        go();
    });
    //1.3 轮播图进行
    function go(){
        timer=setInterval(function(){
            num++;
            if(num>4){
                num=1;
                $("#box>ul").css("margin-left","0");                     
            }
            if(num==4){
                $("#box>ol>li").eq(0).addClass("current").siblings().removeClass("current");
            }else{
                $("#box>ol>li").eq(num).addClass("current").siblings().removeClass("current");           
            }
            $("#box>ul").animate({"marginLeft":-100*num+"%"},580);              
        },3000);        
    };
    //1.4 小圆点
    $("#box>ol>li").each(function(index){
        $(this).mouseover(function(){
            num=index;
            console.log(this);
            $(this).addClass("current").siblings().removeClass("current");
            $("#box>ul").stop().animate({"marginLeft":-100*num+"%"},580);
        })
    })

    //2. 
});