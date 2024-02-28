var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'db-epost-fcjys-solicitudes.c4nomdu94wi7.us-east-1.rds.amazonaws.com', //db-epost-fcjys-solicitudes.c4nomdu94wi7.us-east-1.rds.amazonaws.com
    user: 'Diego_Vasquez', //root
    password: 'ToTiTo97gt', //Rubik-60
    database: 'db_conferencia', //jp_eps_conf
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