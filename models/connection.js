var mysql = require('mysql');
var conn = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b734c6d729c6c2",
    password: "2b006546",
    database : 'heroku_f4abcce1d68c357',
    port: '3306'
});


module.exports = conn;
