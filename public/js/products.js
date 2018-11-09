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
        min:0,
        Fixed_left:$ctl.getBoundingClientRect().left,
        Fixed_right:$ctl.getBoundingClientRect().right,
        left:$bar.getBoundingClientRect().left,
        right:$bar.getBoundingClientRect().right
    };

    var length={
        leftDragging:"",
        rightDragging:"",
        leftDragEnd:"",
        rightDragEnd:""
    };

    var size=15;

    // price
    var price={
        max:function(){
            return Math.floor((price.maxBar/boundaryBar.max*270)+30);
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
            length.rightDragging = boundaryBar.Fixed_right - maxClientX + maxOffsetX - 15;

            if (length.rightDragging >= 0) {
                price.maxBar = boundaryBar.max - length.rightDragging;
                if (price.maxBar - price.minBar > 30) {
                    $maxPrice.style.right = length.rightDragging -1 + "px";
                    $bar.style.right = length.rightDragging -1+ "px";
                    $bar.style.width=boundaryBar.max-length.rightDragging-length.leftDragEnd-1+"px"; 
                    
                    $maxPrice.firstChild.innerHTML="$"+price.max();
                }
            }
        }            
    });

    _on($minPrice,"drag",function(eve){
        eve.stopPropagation();   
        if(canMove){            
            minClientX = eve.clientX;
            length.leftDragging = minClientX - boundaryBar.Fixed_left - minOffsetX;

            if (length.leftDragging >= 0) {
                price.minBar = length.leftDragging;
                if (!length.rightDragEnd) length.rightDragEnd = 0;
                if (price.maxBar - price.minBar > 30) {
                    $minPrice.style.left = length.leftDragging + "px";
                    $bar.style.left = length.leftDragging + "px";
                    $bar.style.width=boundaryBar.max-length.leftDragging-length.rightDragEnd+"px";
                    
                    $minPrice.firstChild.innerHTML="$"+price.min();
                }
            }
        }        
    });

    _on($maxPrice,"dragstart",function(eve){
        eve.stopPropagation();
        var img=new Image();
        img.src="./img/icons/transparent.png";
        eve.dataTransfer.setDragImage(img,"","");
        maxOffsetX=eve.offsetX;
        maxClientX=eve.clientX;
        canMove=true;
    })

    _on($minPrice,"dragstart",function(eve){
        eve.stopPropagation();
        var img=new Image();
        img.src="./img/icons/transparent.png";
        eve.dataTransfer.setDragImage(img,"","");
        minOffsetX=eve.offsetX;
        minClientX=eve.clientX;
        canMove=true;
    })


    _on($maxPrice,"dragend",function(eve){
        maxClientX=eve.clientX;
        maxOffsetX=eve.offsetX;

        length.rightDragging=boundaryBar.Fixed_right-maxClientX+maxOffsetX-15;
        length.rightDragEnd=length.rightDragging;

        $bar.style.width=boundaryBar.max-length.rightDragEnd-length.leftDragEnd+"px";
        price.maxBar = boundaryBar.max - length.rightDragEnd;  
        eve.stopPropagation();      
    })

    _on($minPrice,"dragend",function(eve){
        minClientX=eve.clientX;
        minOffsetX=eve.offsetX;

        length.leftDragging=minClientX-boundaryBar.left-minOffsetX;
        length.leftDragEnd=length.leftDragging;

        $bar.style.width=boundaryBar.max-length.leftDragEnd-length.rightDragEnd+"px";
        eve.stopPropagation();
    })
})