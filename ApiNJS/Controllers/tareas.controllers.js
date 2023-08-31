const bd = require('../BD/conection')
const jwt = require('jsonwebtoken')

exports.Prueba = async (req, res) => {
    bd.query(`SELECT * FROM tipoTarea`, function (err, result) {
        if (err) throw err;
        console.log('Funciona')
        res.send(result);
    });
}

exports.Empleados = async (req, res) => {
    bd.query(`select NoEmpleado, Nombre, Apellido from empleado`, function(err, result) {
        if(err) throw err;
        return res.json(result)
    });
    
}

exports.AdminUser = async (req, res) => {
    var email = req.body.email;
    var passw = req.body.passw;
    var payload, clave="token1"
    bd.query(`select idAdmin, nombre, apellido from administrador where email='${email}' and passw='${passw}';`, function(err, result){
        if(err) throw err;
        payload = {
            "datos": result
        }
        jwt.sign(payload, clave, (err, token) => {
            if(err){
                return res.status(400).send({msg : 'Error'})
            } else if(Object.keys(result).length === 0) {
                return res.send({msg:'Registro no encontrado', token: token})
            } else {
                return res.send({msg:'success', token: token})
            }
        })

    }) 
}

exports.AdminPermisos = async (req, res) => {
    var idAdmin = req.body.idAdmin
    bd.query(`select a.idAdmin, a.idPermiso from adminpermiso a, administrador b, permiso c
	    where b.idAdmin = a.idAdmin and c.idPermiso = a.idPermiso and a.idAdmin = ${idAdmin}`, function(err, result){
            if(err) throw err;
            return res.send(result)
    })
}

exports.AdminLista = async (req, res) => {
    bd.query(`Select a.* from administrador a, adminpermiso b where a.idAdmin=b.idAdmin and b.idPermiso <> 1 group by a.idAdmin;` , function(err, result){
        if(err) throw err;
        return res.send(result)
    })
}

exports.Permisos = async (req, res) => {
    bd.query(`select * from permiso`, function(err, result){
        if(err) throw err;
        return res.send(result)
    })
}