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
    bd.query(`select * from administrador where email='${email}' and passw='${passw}';`, function(err, result){
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
    bd.query(`select * from permiso where permiso <> 'Principal' and permiso <> 'Informacion'`, function(err, result){
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

exports.GetJornadas = async (req, res) => {
    bd.query(`Select * from jornada ORDER BY estado DESC` , function(err, result){
        if(err) throw err;
        return res.send(result)
    })
}

exports.GetJornadaEspecifica = async (req, res) => {
    try { 
        var fecha = req.body.agenda.fecha
        bd.query(`Select idJornada from jornada where fechaInicio<='${fecha}' AND fechaFinal>='${fecha}'` , function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al solicitar la jornada'})
    }
}

exports.JornadasAnio = async (req, res) => {
    try {
        var anio = req.body.anio
        bd.query(`select * from jornada where year(fechaInicio) = '${anio}'` , function(err, result){
            if(err) {
                throw err;
            } else if(Object.keys(result).length === 0) {
                return res.send({msg:'No hay jornadas en este año'})
            } else {
                return res.send(result)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al solicitar la jornada'})
    }
}

exports.modificarJornada = async (req, res) => {
    try {
        var idJornada = req.body.jornada.idJornada
        var ciclo = req.body.jornada.ciclo
        var fechaInicio = req.body.jornada.fechaInicio
        var fechaFinal = req.body.jornada.fechaFinal
        bd.query(`update jornada set ciclo = '${ciclo}', fechaInicio = '${fechaInicio}', fechaFinal = '${fechaFinal}' where idJornada = ${idJornada}`, function(err, result){
            if(err) throw err
            res.status(201).json({mensaje:'Modificacion Exitosa'})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error al modificar la informacion de la jornada'})
    }
}

exports.eliminarJornada = async (req, res) => {
    var idJornada = req.body.idJornada
    bd.query(`delete from jornada idJornada = ${idJornada}` , function(err, result){
        if(err) throw err;
        return res.send(result)
    })
}

exports.CrearCapacitacion = async (req, res) => {
    try {
        var nomCapacitacion = req.body.capacitacion.nomCapacitacion
        var descripcion = req.body.capacitacion.descripcion
        var presentador = req.body.capacitacion.presentador
        var poster = req.body.capacitacion.poster
        var zoomLink = req.body.capacitacion.zoomLink
        var fbLink = req.body.capacitacion.fbLink
        var idJornada = req.body.capacitacion.idJornada
        var idCategoria = req.body.capacitacion.idCategoria
        if(poster == "" || poster === undefined){
            bd.query(`insert into capacitacion(nomCapacitacion, descripcion, presentador, poster, zoomLink, fbLink, idJornada, idCategoria, estado)
              values('${nomCapacitacion}', '${descripcion}', '${presentador}', '${poster}', '${zoomLink}', '${fbLink}', ${idJornada}, ${idCategoria}, 1)`, function(err, result){
                if(err) throw err
                if(idCategoria == 1){
                    res.status(201).json({mensaje:'Capacitacion Creada con exito'})
                } else {
                    res.status(201).json({mensaje:'Diplomado Creado con exito'})
                }
            })
        } else {
            var idArchivo = req.body.base64
            let archiv = "https://bucket-jornadas.s3.amazonaws.com/"+SubirArchivo(poster, idArchivo)
            if(archiv != "error"){
                bd.query(`insert into capacitacion(nomCapacitacion, descripcion, presentador, poster, zoomLink, fbLink, idJornada, idCategoria, estado)
                  values('${nomCapacitacion}', '${descripcion}', '${presentador}', '${archiv}', '${zoomLink}', '${fbLink}', ${idJornada}, ${idCategoria}, 1)`, function(err, result){
                    if(err) throw err
                    if(idCategoria == 1){
                        res.status(201).json({mensaje:'Capacitacion Creada con exito'})
                    } else {
                        res.status(201).json({mensaje:'Diplomado Creado con exito'})
                    }
                })
            }
        }
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error al registrar la capacitacion nueva'})
    }
}

exports.modificarCapacitacion = async (req, res) => {
    try {
        //oldPoster trae la ultima parte de la ruta del antiguo poster
        //poster trae el nuevo archivo
        const {idCapacitacion, nomCapacitacion, descripcion, presentador, poster, zoomLink, fbLink, idJornada} = req.body.capacitacion
        var base64 = req.body.base64
        var oldPoster = req.body.oldPoster
        if(oldPoster == poster){
            bd.query(`update capacitacion set nomCapacitacion = '${nomCapacitacion}', descripcion = '${descripcion}', presentador = '${presentador}', poster = '${poster}', zoomLink = '${zoomLink}', fbLink = '${fbLink}', idJornada=${idJornada} where idCapacitacion = ${idCapacitacion}`, function(err, result){
                if(err) throw err
                res.status(201).json({mensaje:'Modificacion Exitosa'})
            })
        } else {
            
            if(oldPoster !== undefined){
                console.log("--entre aqui--")
                const params1 = {
                    Bucket: "bucket-jornadas",
                    Key: oldPoster
                }
                const putResult1 = s3.deleteObject(params1).promise();
                console.log(putResult1);
            }
            let archiv = "https://bucket-jornadas.s3.amazonaws.com/"+SubirArchivo(poster, base64)
            if(archiv != "Error"){
                bd.query(`update capacitacion set nomCapacitacion = '${nomCapacitacion}', descripcion = '${descripcion}', presentador = '${presentador}', poster = '${archiv}', zoomLink = '${zoomLink}', fbLink = '${fbLink}' where idCapacitacion = ${idCapacitacion}`, function(err, result){
                    if(err) throw err
                    res.status(201).json({mensaje:'Modificacion Exitosa'})
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error al modificar la informacion de la capacitacion'})
    }
}

exports.Agendar = async (req, res) => {
    try {
        var fecha = req.body.agenda.fecha
        var hora = req.body.agenda.hora
        var idCapacitacion = req.body.agenda.idCapacitacion
        bd.query(`insert into agenda(fecha, hora, idCapacitacion) values ('${fecha}', '${hora}', ${idCapacitacion})`, function(err, result){
            if(err) throw err
            res.status(201).json({mensaje:'Fecha y hora registradas'})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error al registrar la Agenda'})
    }
}

exports.modificarAgenda = async (req, res) => {
    try {
        var jornada = req.body.jornada
        if(jornada == 0){
            const {fecha, hora} = req.body.agenda
            var idCapacitacion = req.body.idCapacitacion
            bd.query(`update agenda set fecha = '${fecha}', hora = '${hora}' where idCapacitacion = ${idCapacitacion}`, function(err, result){
                if(err) throw err
                res.status(201).json({mensaje:'Modificacion de agenda Exitosa'})
            })
        } else {
            var idCapacitacion = req.body.idCapacitacion
            bd.query(`delete from agenda agenda where idCapacitacion = ${idCapacitacion}`)
            for (var i = 0; i < req.body.agenda.length; i++){
                var {fecha, hora} = req.body.agenda[i]
                bd.query(`insert into agenda(fecha, hora, idCapacitacion) values ('${fecha}', '${hora}', ${idCapacitacion})`)
            }
            res.status(201).json({mensaje:'Modificacion de agenda de jornada exitosa'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error al modificar la agenda'})
    }
}

exports.CapacitacionReciente = async (req, res) => {
    try {
        var nomCapacitacion = req.body.capacitacion.nomCapacitacion
        var descripcion = req.body.capacitacion.descripcion
        var presentador = req.body.capacitacion.presentador
        bd.query(`select idCapacitacion from capacitacion where nomCapacitacion = '${nomCapacitacion}' and descripcion = '${descripcion}' and presentador = '${presentador}' Order by idCapacitacion DESC LIMIT 1`, function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error al solicitar la capacitacion'})
    }
}

exports.Capacitaciones = async (req, res) => {
    var idCategoria = req.body.idCategoria
    bd.query(`Select a.* from capacitacion a, jornada b where a.idJornada = b.idJornada and CURDATE() >= b.fechaInicio
	  and CURDATE() <= b.fechaFinal and a.idCategoria = ${idCategoria} and a.estado = 1;` , function(err, result){
        if(err) throw err;
        return res.send(result)
    })
}

exports.CapacitacionesPorJornada = async (req, res) => {
    var idJornada = req.body.idJornada
    var idCategoria = req.body.idCategoria
    bd.query(`Select * from capacitacion where idJornada = ${idJornada} and idCategoria = ${idCategoria} and estado = 1;` , function(err, result){
        if(err) throw err;
        return res.send(result)
    })
}

exports.getAgenda = async (req, res) => {
    var idCapacitacion = req.body.idCapacitacion
    bd.query(`Select * from agenda where idCapacitacion = '${idCapacitacion}'` , function(err, result){
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

exports.getInscripciones = async (req, res) => {
    try {
        var idCapacitacion = req.body.idCapacitacion
        if(req.body.datosExtra === undefined){
            bd.query(`select a.carne, a.cui, a.nombre, a.apellido, a.correo from usuario a, tipousuario b, municipio c, departamento d, asistencia e, capacitacion f
              where f.idCapacitacion = ${idCapacitacion} and f.idCapacitacion = e.idCapacitacion and e.inscrito = 1 and e.idUsuario = a.idUsuario and b.idTipo = a.idTipo and a.idmunicipio = c.idMunicipio and c.idDepartamento = d.idDepartamento`, function(err, result){
                if(err) throw err;
                return res.send(result)
            })
        } else {
            var parametrosExtra = ""
            if(req.body.datosExtra.idTipo != 0){
                parametrosExtra += " and b.idTipo = " + req.body.datosExtra.idTipo
            }
            if(req.body.datosExtra.genero != 0){
                parametrosExtra += " and a.genero = " + req.body.datosExtra.genero
            }
            if(req.body.datosExtra.idDepartamento != 0){
                parametrosExtra += " and d.idDepartamento = " + req.body.datosExtra.idDepartamento
            }
            if(req.body.datosExtra.idmunicipio != 0){
                parametrosExtra += " and c.idmunicipio = " + req.body.datosExtra.idmunicipio
            }
            if(req.body.datosExtra.presente != 2){
                parametrosExtra += " and e.presente = " + req.body.datosExtra.presente
            }
            console.log(parametrosExtra + " -*--*-*-*-*-*-")
            bd.query(`select a.carne, a.cui, a.nombre, a.apellido, a.correo from usuario a, tipousuario b, municipio c, departamento d, asistencia e, capacitacion f
              where f.idCapacitacion = ${idCapacitacion} and f.idCapacitacion = e.idCapacitacion and e.inscrito = 1 and e.idUsuario = a.idUsuario and b.idTipo = a.idTipo and a.idmunicipio = c.idMunicipio and c.idDepartamento = d.idDepartamento${parametrosExtra}`, function(err, result){
                if(err) throw err;
                return res.send(result)
            })
        }
    } catch (error) {
        console.log(error)
        console.log('Problema en la ejecucion del query para inscripciones')
    }
}

function SubirArchivo(Archivo, idArchivo){
    try {
        var nombrei = "Posts/" + Archivo;
        //se convierte la base64 a bytes
        let buff = new Buffer.from(idArchivo, 'base64');
        const params2 = {
            Bucket: "bucket-jornadas",
            Key: nombrei,
            Body: buff,
            ContentType: "image/jpeg",
            ACL: 'public-read'
        };
        putResult = s3.putObject(params2).promise();
        
        return nombrei;
    } catch (error) {
        return "error";
    }
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