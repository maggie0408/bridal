$(function(){
    function $dom(id){
        return document.getElementById(id);
    }

    function _on(target,eventName,handler){
        target.addEventListener(eventName,handler,false);
    }

    // get elements
    var $maxPrice=$dom('maxPrice');
    var $minPrice=$dom('minPrice');
    var $ctl=$dom('dragctl');
    var $bar=$dom('dragbar');
    
    var minOffsetX,maxOffsetX,minClientX,maxClientX;
    var canMove=false;
    

    // boundary of dragger bar size
    var boundaryBar={
        max:$ctl.getBoundingClientRect().width,
        size:"",
        min:0,
        Fixed_left:$ctl.getBoundingClientRect().left,
        Fixed_right:$ctl.getBoundingClientRect().right,
        left:$bar.getBoundingClientRect().left,
        right:$bar.getBoundingClientRect().right
    };

    var length={
        left:"",
        right:""
    };

    var size=15;

    // price
    var price={
        max:function(){
            return Math.floor(price.maxBar/boundaryBar.max*270)+30;
        },
        min:function(){
            return Math.floor(price.minBar/boundaryBar.max*270)+30;
        },
        maxBar:boundaryBar.max,
        minBar:boundaryBar.min
    };


    // event listener
    _on($maxPrice,"drag",function(eve){
        eve.stopPropagation();
        if(canMove){
            maxClientX = eve.clientX;
            length.right = boundaryBar.Fixed_right+15;//boundaryBar.right - maxClientX + maxOffsetX - 15;

            if (length.right > 0) {
                price.maxBar = boundaryBar.max - length.right;
                if (price.maxBar - price.minBar > 30) {
                    $maxPrice.style.right = length.right + "px";
                    $bar.style.right = length.right + "px";
                    $bar.style.width=boundaryBar.max-length.right+"px";
                }
            }
            $maxPrice.style.top="-4px";
        }            
    });

    _on($minPrice,"drag",function(eve){
        eve.stopPropagation();
        if(canMove){            
            minClientX = eve.clientX;
            length.left = minClientX - boundaryBar.left - minOffsetX;

            if (length.left > 0) {
                price.minBar = length.left;

                if (!length.right) length.right = 0;
                price.maxBar = boundaryBar.max - length.right;

                if (price.maxBar - price.minBar > 30) {
                    $minPrice.style.left = length.left + "px";
                    $bar.style.left = length.left + "px";
                    $bar.style.width=boundaryBar.max-length.left+"px";
                }
            }
            $minPrice.style.top="-4px";
        }
    });

    _on($maxPrice,"dragstart",function(eve){
        eve.stopPropagation();
        maxOffsetX=eve.offsetX;
        maxClientX=eve.clientX;
        canMove=true;
    })

    _on($minPrice,"dragstart",function(eve){
        eve.stopPropagation();
        minOffsetX=eve.offsetX;
        canMove=true;
    })


    _on($maxPrice,"dragend",function(eve){
        maxClientX=eve.clientX;
        length.right=boundaryBar.right-maxClientX+maxOffsetX-15;
        eve.stopPropagation();
    })

    _on($minPrice,"dragend",function(eve){
        minClientX=eve.clientX;
        length.left=maxClientX-boundaryBar.left-minOffsetX;
        eve.stopPropagation();
    })
})