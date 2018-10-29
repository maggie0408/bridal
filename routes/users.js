const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.post("/signin", (req, res) => {
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    console.log(uname, upwd);
    pool.query(
        "select * from zr_user where uname=? and upwd=?",
        [uname, upwd],
        (err, result) => {
            if (err) console.log(err);
            if (result.length > 0) {
                res.writeHead(200);
                var user = result[0];
                req.session["uid"] = user["uid"];
                res.write(JSON.stringify({
                    ok: 1
                }))
            } else {
                res.write(JSON.stringify({
                    ok: 0,
                    msg: "用户名或密码错误！"
                }))
            }
            res.end();
        }
    )
})

router.post("/signup", (req, res) => {
    var uname = req.body.uname,
        upwd = req.body.upwd,
        email=req.body.email,
        phone=req.body.phone;
    if(uname==''){        
        res.send({code:401,msg:'uname requried'});
        return;
    };  
    if(upwd==''){             
        res.send({code:402,msg:'password required'});
        return;
    };
    if(email==''){
        res.send({code:403,msg:'email required'});
        return;
    };
    if(phone==''){
        res.send({code:404,msg:'phone number required'});
        return;
    };    
    pool.query(
        "INSERT INTO zr_user VALUES(NULL,?,?,?,?,NULL,NULL,NULL)",
        [uname,upwd,email,phone],
        (err, result) => {
            if (err) console.log(err);
            if(result.affectedRows>0){
                //res.writeHead(200);
                //alert("注册成功！");
                var uname=res.req.body.uname,upwd=res.req.body.upwd,email=res.req.body.email,phone=res.req.body.phone;
                res.send({uname:uname,upwd:upwd,email:email,phone:phone});
                //res.send({uname:uname,upwd:upwd,email:email,phone:phone});
            }//else{
                //alert("注册失败，请检查信息");
            //}
        }
    )
})

router.get("/signout", (req, res) => {
    req.session["uid"] = undefined;
    res.end();
})

router.get("/issignin", (req, res) => {
    res.writeHead(200);
    if (req.session.uid === undefined) {
        res.write(JSON.stringify({ ok: 0 }))
        res.end();//处理异步的问题，结束之后就end
    } else {
        var uid = req.session.uid;
        var sql = "select * from zr_user where uid=?";
        pool.query(sql, [uid], (err, result) => {
            if (err) console.log(err);
            var user = result[0];
            res.write(JSON.stringify({
                ok: 1, 
                uname: user.name
            }))
            res.end();//异步处理，分别返回end，和上面的if对应
        })
    }
})

module.exports = router;