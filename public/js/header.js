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
