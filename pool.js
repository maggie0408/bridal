const mysql=require('mysql');
const pool=mysql.createPool({
	host:'127.0.0.1',
    user:'root',
    password:'',
    database:'zr',
    connectionLimit:20
});
module.exports=pool;