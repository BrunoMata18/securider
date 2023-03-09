var mysql = require('mysql');
var conn = mysql.createPool({
    host: "localhost",
    user: "server",
    password: "123456789",
    database : 'securiderdb',
    port: '3306'
});


module.exports = conn;


