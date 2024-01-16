var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: '34.235.137.29',
    user: 'root',
    password: 'Rubik-60',
    database: 'jp_eps_conf',
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