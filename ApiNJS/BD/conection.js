var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'eps',
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