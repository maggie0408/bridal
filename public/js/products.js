$(function(){
    var canMove=false;
    var pl=$('.price').offset().left,pr=pl+$(".price").width();
    //价格范围选取
    minPrice.onmousedown=function(e){
        canMove=true;  
        var minOffsetX=e.offsetX; 
        window.onmousemove=function(e){
            if(canMove){               
                var l1 = minOffsetX - $("#minPrice").offset().left; 
                var leftLength = e.offsetX - pl - l1;
                var diff=$("#maxPrice").offset().left-e.offsetX-15;
                if(diff>0){$("#minPrice").css("left", leftLength + "px");}
                
                //$("#minPrice").children().i
            }
        }  
    };
    maxPrice.onmousedown=function(e){
        canMove=true;   
        var maxOffsetX=e.offsetX;     
        window.onmousemove=function(e){
            if(canMove){ 
                var l2 = maxOffsetX - $("#maxPrice").offset().left;
                var rightLength = $(".price").width()-(e.offsetX-pl-l2+15);
                var diff=$("#maxPrice")
                $("#maxPrice").css("right",rightLength+"px");
            }
        };
    };
    
    minPrice.onmouseup=function(e){
        canMove=false;
    }
    maxPrice.onmouseup=function(e){
        canMove=false;
    }
    $(".price").mouseleave(function(){
        canMove=false;
    })
})