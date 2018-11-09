const express=require("express");
const router=express.Router();
const pool=require("../pool");


router.get("/",(req,res)=>{
    var pid =req.query.id;
    var output={
        product:{},//对应sql1的返回结果
        pics:[],//对应sql2的返回结果（是个数组）
        color:[]//对应sql3的返回结果（也是数组）
};
var sql1="SELECT * FROM products WHERE id=?";//用id查当前商品信息
var sql2="SELECT * FROM product_pic WHERE id=?";//用id查当前商品图片列表
var sql3="SELECT id,color FROM products WHERE cid=(SELECT cid FROM products where id=?)";//用id查当前商品同系列的规格列表
//以下所有的pool都是异步进行的，最下方的res.writeHead不会等待它们结束，需要进行特殊处理如下
Promise.all([
    new Promise(function(open){
        pool.query(sql1,[id],(err,result)=>{
            if(err) console.log(err);
            output.product=result[0];
            open();
        });
    }),
    new Promise(function(open){
        pool.query(sql2,[id],(err,result)=>{
            if(err) console.log(err);
            output.pics=result;//因为result返回的也是个数组列表
            open();
        });
    }),
    new Promise(function(open){
        pool.query(sql3,[id],(err,result)=>{
            if(err) console.log(err);
            output.color=result;//因为result返回的也是个数组列表
            open();
        });
    })
]).then(function(){
    res.writeHead(200,{
        "Content-Type":"application/json;charset=utf-8",//设置内容类型，防止乱码
        "Access-Control-Allow-Origin":"*"   //允许别的域名跨域进行访问的请求
    });
    res.write(JSON.stringify(output));  //将对象解析为字符串，json.parse：将字符串解析为json对象
    res.end();  //结束并发送响应
   });
});

module.exports=router;