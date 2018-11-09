$(function(){
    //引入head样式
    $("<link rel='stylesheet' href='../css/header.css'>").appendTo("head");    

    //获取header内容
    $.ajax({
        url:"http://localhost:8000/header.html",
        type:"get",
        success:function(res){
            $("#header").replaceWith(res);

            //一级菜单移出，显示/隐藏二级菜单
            var tMove;

            //导航栏样式
            var styleOver={
                "border-top":"2px solid #f3665c",
                "border-right":"1px solid #74736d",
                "border-bottom":"1px solid white",
                "border-left":"1px solid #74736d",
                "color":"#74736d"
            };
            var styleOut={
                "border-top":"2px solid transparent",
                "border-right": "1px solid transparent",
                "border-bottom": "1px solid transparent",
                "border-left": "1px solid transparent",
                "color": "#353535"
            };

            //一级菜单移入，显示二级菜单
            $("#menus").on("mouseover","div",function(){
                var $name=$(this);                
                var i=$name.prevAll().length; 
                $("#expanding>li").eq(i).addClass("active");                       
                $(this).css(styleOver);
            })            
            //一级菜单移出，隐藏二级菜单
            $("#menus").on("mouseout","div",function(){
                var $name=$(this);
                $(this).css(styleOut);
                var i=$name.prevAll().length;
                
                tMove=setTimeout(function(){
                    $("#expanding>li").eq(i).removeClass("active");
                },100);
            })
            //二级菜单显示
            $("#expanding").on("mouseover","li",function(){
                $(this).addClass("active");
                var i=$(this).prevAll().length; 
                $("#menus>div").eq(i).css(styleOver);
            })
            //二级菜单隐藏
            $("#expanding").on("mouseout","li",function(){                
                clearTimeout(tMove);
                $(this).removeClass("active");                    
                var i=$(this).prevAll().length; 
                $("#menus>div").eq(i).css(styleOut);
            })
            /*
            new Vue({
                el:"#header",
                data:{
                    kwords:"",
                    issignin:false,
                    uname:""
                },
                mounted(){
                    if(location.search.indexOf("kwords")!=-1){
                        this.kwords=decodeURI(location.search.split("=")[1])
                    }
                    $.ajax({
                        url:"http://localhost:8000/users/issignin",
                        type:"get",
                        dataType:"json",
                        success:(res)=>{
                            if(res.ok==0) this.issignin=false
                            else{
                                this.issignin=true;
                                this.uname=res.uname;
                            }
                        }
                    })
                },
                computed:{
                    signin(){
                        return `signin.html?back=${location.href}`;
                    }
                },
                methods:{
                    search(){
                        if(this.kwords!=""){
                            location.href=`products.html?kwords=${this.kwords}`;
                        }
                    },
                    signout(){
                        $.ajax({
                            url:"http://localhost:8000/users/signout",
                            type: "get",
                            success: ()=>{
                                alert("您的账号已退出");
                                this.issignin=false;
                            }
                        })
                    }
                }
            })
            */
            
            //搜索        
            var $btnSearch=$("#rightFixed>div:last-child>a img"),
                $input=$btnSearch.parent().prev();
            $btnSearch.click(function(){
                var kw=$input.val().trim();
                if(kw!=="") location.href=`products.html?kwords=${kw}`;
            })
            $input.keyup(function(e){
                if(e.keyCode==13){
                    $btnSearch.click();
                }
            })
            if(location.search.indexOf("kwords")!=-1){
                var kwords=decodeURI(location.search.split("=")[1]);
                $input.val(kwords);
            }
            

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
                location.href="signup.html?backTo="+location.href;
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
