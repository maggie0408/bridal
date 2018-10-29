const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');

const index=require("./routes/index");
const users=require("./routes/users");
const details=require("./routes/details");

var app = express();
var server = app.listen(8000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./public'));
app.use(session({
    secret:"128位随机字符串",
    resave:false,
    saveUninitialized:true
}));

app.use("/index",index);
app.use("/users",users);
app.use("/details",details);