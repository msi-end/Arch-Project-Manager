const mysql = require('mysql');
let con = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    // port : 3307,
    database:'archdb',
    multipleStatements: true,
})
con.getConnection((error) => {
    if (!!error) {
console.log('there is an error bro!'+error)
    }else{
        console.log('connected to datbase!')
    }
})
module.exports=con