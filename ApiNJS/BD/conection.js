var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'localhost', //db
    user: 'root', //root
    password: '12345678', //Rubik60
    database: 'eps', //jp_eps_conf
    port: 3306
});
connection.connect(function(error){
    if(error){
        throw error;
    } else {
        console.log('Conexion establecida.');
    }
})
module.exports = connection;