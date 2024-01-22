var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'db', //db
    user: 'root', //root
    password: 'Rubik-60', //Rubik-60
    database: 'jp_eps_conf', //jp_eps_conf
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