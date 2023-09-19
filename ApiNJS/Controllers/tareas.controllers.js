const bd = require('../BD/conection')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

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

exports.RegistrarAdmin = async (req, res) => {
    try {
        bd.query(`insert into administrador(nombre, apellido, email, passw, telefono) 
          values ('${req.body.nombre}', '${req.body.apellido}', '${req.body.email}', '${req.body.passw}', '${req.body.telefono}')`,function(err, result){
            if(err) throw err
            sendMail1(req.body, info => {
                console.log(`El Email fue enviado`)
                res.send(info)
            })
        })
    } catch (error) {
        console.log('error al registrar al admin')
        return res.send('error')
    }
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
    bd.query(`Select * from administrador where IdAdmin <> ${req.body.id}` , function(err, result){
        if(err) throw err;
        return res.send(result)
    })
}

exports.Permisos = async (req, res) => {
    bd.query(`select * from permiso where permiso <> 'Principal'`, function(err, result){
        if(err) throw err;
        return res.send(result)
    })
}

exports.PermisosAdmin = async (req, res) => {
    var idAdmin = req.body.idAdmin
    bd.query(`select c.idPermiso, c.permiso from adminpermiso a, administrador b, permiso c
	  where b.idAdmin = a.idAdmin and c.idPermiso = a.idPermiso and a.idAdmin = ${idAdmin}`, function(err, result){
        if(err) throw err
        return res.send(result)
    })
}

exports.AsignarPermiso = async (req, res) => {
    try {
        var idAdmin = req.body.idAdmin
        var idPermiso = req.body.idPermiso
        bd.query(`insert into adminpermiso(idAdmin, idPermiso) values(${idAdmin}, ${idPermiso})`, function(err, result){
            if(err) { 
                if(err.code === 'ER_DUP_ENTRY'){
                    console.error('Error: Esta asignacion ya existe')
                    res.status(409).json({ error: 'Esta asignacion ya existe' });
                } else {
                    console.error('Error en la consulta:', error);
                    res.status(500).json({ error: 'Error en la consulta' });
                }
            } else {
                res.status(201).json({mensaje:'Insercion Existosa'})
            }
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'error en la consulta'})
    }
}

exports.RevocarPermiso = async (req, res) => {
    try {
        var idAdmin = req.body.idAdmin
        var idPermiso = req.body.idPermiso
        bd.query(`delete from adminpermiso where idAdmin = ${idAdmin} and idPermiso = ${idPermiso}`, function(err, result){
            if(err) throw err
            res.status(201).json({mensaje:'permiso revocado con exito'})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'erros al revocar el permiso'})
    }
}

exports.EliminarAdmin = async (req, res) => {
    try {
        var idAdmin = req.body.idAdmin
        bd.query(`delete from administrador where idAdmin = ${idAdmin}`, function(err, result){
            if(err) throw err
            res.status(201).json({mensaje: 'Administrador Eliminado'})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error al eliminar al administrador'})
    }
}

// Exports Para la pestaña de creacion

exports.JornadaNueva = async (req, res) => {
    try {
        var ciclo = req.body.jornada.ciclo
        var fechaInicio = req.body.jornada.FechaInicio
        var fechaFinal = req.body.jornada.FechaFinal
        bd.query(`insert into jornada(ciclo, fechaInicio, fechaFinal, estado) values ('${ciclo}', '${fechaInicio}', '${fechaFinal}',
                CASE 
                    WHEN NOW() >= fechaInicio AND NOW() <= fechaFinal THEN 1
                    ELSE 0
                END);`, function(err, result){
            if(err) throw err
            res.status(201).json({mensaje:'Jornada Creada con exito'})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error al registrar la jornada nueva'})
    }
}

exports.GetJornadaActual = async (req, res) => {
    bd.query(`Select * from jornada where estado = 1` , function(err, result){
        if(err) throw err;
        return res.send(result)
    })
}

// fuciones extras

exports.Actualizar0 = async (req, res) => {
    bd.query(`UPDATE jornada
    SET estado = CASE
        WHEN CURDATE() > fechaFinal AND CURDATE() < fechaInicio THEN 0
        ELSE estado -- Mantener el valor actual si no se cumple la condición
    END
    WHERE CURDATE() > fechaFinal AND CURDATE() < fechaInicio`, function(err, result){
        if(err) throw err
        console.log("Actualizar 0")
    })
}

exports.Actualizar1 = async (req, res) => {
    bd.query(`UPDATE jornada
    SET estado = CASE
        WHEN CURDATE() >= fechaInicio AND CURDATE() <= fechaFinal THEN 1
        ELSE estado -- Mantener el valor actual si no se cumple la condición
    END
    WHERE CURDATE() >= fechaInicio AND CURDATE() <= fechaFinal`, function(err, result){
        if(err) throw err
        console.log("Actualizar 1")  
    })
}

function sendMail1(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'sender97gt@gmail.com',
        pass: 'toto1897'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  
    let mailOptions = {
      from: 'sender97gt@gmail.com', // sender address
      to: user.email, // list of receivers
      subject: "Bienvenido al sistema de administradores", // Subject line
      html: `
      <html>
        <body>
            <h1>Bienvenido(a) ${user.nombre} ${user.apellido}</h1><br>
            <h2>Usted fue elegido(a) para ser parte de los administradores de este modulo</h2><br>
            <p>La contraseña que se la asigno es: ${user.passw}</p>
            <p>y para ingresar use este mismo correo con el cual fue registrado(a)</p>
        </body>
      </html>`
    };
  
    // send mail with defined transport object
    let info = transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        } else {
            console.log('Email enviado')
        }
    });
  
    //callback(info);
}