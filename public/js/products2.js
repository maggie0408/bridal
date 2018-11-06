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
    
    var minOffsetX,maxOffsetX,leftLength,rightLength;
    

    // boundary of dragger bar size
    var boundaryBar={
        max:$ctl.getBoundingClientRect().width,
        min:0,
        left:$ctl.getBoundingClientRect().left,
        right:$ctl.getBoundingClientRect().right
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
        var x=eve.clientX;   
        rightLength=boundaryBar.right-x+maxOffsetX-15;    

        if(rightLength>0){
            price.maxBar = boundaryBar.max - rightLength;
            console.log(price.maxBar)
            if (price.maxBar-price.minBar >30){
                $maxPrice.style.right = rightLength + "px";
                //$bar.style.right = rightLength + "px";
            }
        }
        eve.stopPropagation();
    });

    _on($minPrice,"drag",function(eve){
        var x=eve.clientX; 
        leftLength=x-boundaryBar.left-minOffsetX;

        if(leftLength>0){
            price.minBar = leftLength;
            price.maxBar= boundaryBar.max-rightLength;
            console.log(price.maxBar,price.minBar);
            if (price.maxBar-price.minBar>30){
                $minPrice.style.left = leftLength + "px";
                $bar.style.left = leftLength + "px";
            }
        }
        eve.stopPropagation();
    });

    _on($minPrice,"mousedown",function(eve){
        minOffsetX=eve.offsetX;
    })

    _on($maxPrice,"mousedown",function(eve){
        maxOffsetX=eve.offsetX;
    })
})