$(function(){
    //价格范围选取
    $("#minPrice").click(function(e){
        var diffX = e.clientX - $("#minPrice").offsetX; 
        console.log(e.offsetX);
    })
})