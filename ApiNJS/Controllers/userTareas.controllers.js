const bd = require('../BD/conection')
const jwt = require('jsonwebtoken')
const aws_keys = require('../Keys/creds')
var AWS = require('aws-sdk')
const s3 = new AWS.S3(aws_keys.s3)
const nodemailer = require('nodemailer')

exports.Prueba = async (req, res) => {
    bd.query(`SELECT * FROM tipoTarea`, function (err, result) {
        if (err) throw err;
        console.log('Funciona')
        res.send(result);
    });
}

exports.GetDepartamentos = async (req, res) => {
    bd.query(`SELECT * FROM departamento`, function(err, result){
        if(err) throw err;
        res.send(result)
    })
}

exports.GetMunicipios = async (req, res) => {
    const idDepartamento = req.body.idDepartamento
    bd.query(`SELECT * FROM municipio WHERE idDepartamento=${idDepartamento}`, function(err, result){
        if(err) throw err;
        res.send(result)
    })
}

exports.tiposUsuarios = async (req, res) => {
    bd.query(`SELECT * FROM tipoUsuario`, function(err, result){
        if(err) throw err;
        res.send(result)
    })
}

exports.RegistrarUsuario = async(req, res) => {
    try {
        const {carne, cui, nombre, apellido, correo, passwo, confirmPasswo, genero, direccion, idMunicipio, idTipo, estado}= req.body.nuevoUser
        console.log(carne, cui, nombre, apellido)
        bd.query(`Insert into usuario(carne, cui, nombre, apellido, correo, passwo, genero, direccion, idmunicipio, idTipo, estado)
          values('${carne}', '${cui}', '${nombre}', '${apellido}', '${correo}', '${passwo}', ${genero}, '${direccion}', ${idMunicipio}, ${idTipo}, ${estado})`, function(err, result){
            if(err) throw err
            return res.send(result)
        })
    } catch (error) {
        console.log('error al registrar al nuevo usuario')
        return res.send("error")
    }
    
}

exports.GetUser = async (req, res) => {//modificar esta peticion para que acepta usuarios activos
    var dato1 = req.body.dato1;
    var passw = req.body.passw;
    var payload, clave="token1"
    bd.query(`select a.*, b.idDepartamento from usuario as a, municipio as b where passwo='${passw}' and (carne='${dato1}' or cui='${dato1}') and a.idmunicipio = b.idMunicipio;`, function(err, result){
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

exports.GetCapacitaciones = async (req, res) => {
    var idTipo = req.body.idTipo;
    if(idTipo == 4 || idTipo == 5 || idTipo == 7){
        bd.query(`select a.*, c.fecha, c.hora from capacitacion a, jornada b, agenda c where a.idJornada = b.idJornada and CURDATE() >= b.fechaInicio
        and CURDATE() <= b.fechaFinal and a.idCapacitacion = c.idCapacitacion and a.idCategoria = 1;`, function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } else {
        bd.query(`Select a.*, c.fecha, c. hora from capacitacion a, jornada b, agenda c where a.idJornada = b.idJornada and CURDATE() >= b.fechaInicio
          and CURDATE() <= b.fechaFinal and a.idCapacitacion = c.idCapacitacion and a.idCategoria = 1
          UNION
          Select a.*, null as fecha, null as hora from capacitacion a, jornada b where a.idJornada = b.idJornada and CURDATE() >= b.fechaInicio
          and CURDATE() <= b.fechaFinal and a.idCategoria = 2;`, function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    }
    
}