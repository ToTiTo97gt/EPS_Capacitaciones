const bd = require('../BD/conection')
const jwt = require('jsonwebtoken')
const aws_keys = require('../Keys/creds')
var AWS = require('aws-sdk')
const s3 = new AWS.S3(aws_keys.s3)
const nodemailer = require('nodemailer')
var CryptoJS = require("crypto-js")

exports.RegistrarAdmin = async (req, res) => {
    try {
        bd.query(`insert into administrador(nombre, apellido, email, passw, telefono, estado) 
          values ('${req.body.nombre}', '${req.body.apellido}', '${req.body.email}', '${req.body.passw}', '${req.body.telefono}', 1)`,function(err, result){
            if(err) throw err
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: 'sender97gt@gmail.com',
                  pass: 'ljme gkdf izog mkbi'
                },
                tls: {
                    rejectUnauthorized: false
                }
              });
            
              let mailOptions = {
                from: 'sender97gt@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Bienvenido al sistema de administradores", // Subject line
                html: `
                <html>
                  <body>
                      <h1>Bienvenido(a) ${req.body.nombre} ${req.body.apellido}</h1><br>
                      <h2>Usted fue elegido(a) para ser parte de los administradores de este modulo</h2><br>
                      <p>La contraseña que se la asigno es: ${req.body.passw}</p>
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
        })
    } catch (error) {
        console.log('error al registrar al admin')
        return res.send('error')
    }
}

exports.AdminUser = async (req, res) => {
    try {
        var clave = 'clave-secreta-123';

        // Descifrar el mensaje usando AES
        var bytes = CryptoJS.AES.decrypt(req.body.email, clave);
        var email = bytes.toString(CryptoJS.enc.Utf8);

        var bytes2 = CryptoJS.AES.decrypt(req.body.passw, clave);
        var passw = bytes2.toString(CryptoJS.enc.Utf8);

        var payload, clave="token1"
        bd.query(`select idAdmin from administrador where email=? and passw=? and estado = 1;`, [email, passw], function(err, result){
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
    } catch (error) {
        console.log(error + '\nError en la peticion: AdminUser')
    }
    
}

exports.NuevosDatos = async (req, res) => {
    try {
        var idAdmin = req.body.idAdmin;
        bd.query(`select * from administrador where idAdmin = ?;`, [idAdmin], function(err, result){
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return res.status(500).json({ message: 'Error al ejecutar la consulta' });
        }
            // Verificar si se encontraron resultados
            if (result.length === 0) {
                return res.status(404).json({ message: 'No se encontraron datos para el usuario proporcionado' });
            }
            // Devolver resultados
            return res.send(result);
        })
    } catch (error) {
        console.log(error + '\nError en la peticion: NuevosDatos')
    }
     
}

exports.ModificarDatos = async (req, res) => {
    var idUsuario = req.body.Datos.idAdmin
    try {
        bd.query(`update administrador set nombre=?, apellido=?, email=?, telefono = ? where idAdmin = ?`, [req.body.Datos.nombre, req.body.Datos.apellido, req.body.Datos.correo, req.body.Datos.telefono, idUsuario], (err, result) => {
            if(err) throw err;
            return res.send({msg: 'Exito al modificar los datos del Admin'})
        })
    } catch (error) {
        console.log('error al intenter modificar los datos del Admin\n'+error)
    }
}

exports.VerificarMail = async (req, res) => {
    try {
        var clave = 'clave-secreta-123';

        // Descifrar el mensaje usando AES
        var bytes = CryptoJS.AES.decrypt(req.body.Mail, clave);
        var email = bytes.toString(CryptoJS.enc.Utf8);
        bd.query(`Select email from administrador where email = ?`, [email], (err, result) =>{
            if(err){
                return res.status(400).send({msg : 'Error'})
            } else if(Object.keys(result).length === 0) {
                return res.send({msg:'Registro no encontrado'})
            } else {
                return res.send({msg:'success'})
            }

        })
    } catch (error) {
        console.log('Error en el servidor')
        return res.status(500).send('Error en el servidor');
    }
}

exports.RecuperarContra = async (req, res) => {
    try {
        var clave = 'clave-secreta-123';

        // Descifrar el mensaje usando AES
        var bytes = CryptoJS.AES.decrypt(req.body.datoContra, clave);
        var email = bytes.toString(CryptoJS.enc.Utf8);
        var tel = req.body.datoTel
        bd.query(`SELECT passw FROM administrador where SUBSTRING(telefono, LENGTH(telefono) - 3) = ? and email = ?`, [tel, email], (err, result) =>{
            if (err) {
                return res.status(400).send({msg : 'Error'})
            }
            if(Object.keys(result).length === 0){
                return res.send({msg: 'Dato erroneo'});
            } else {
                const contra = result[0].passw;

                // Puedes hacer lo que necesites con el correo aquí
                
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: 'sender97gt@gmail.com',
                      pass: 'ljme gkdf izog mkbi'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                  });
                
                  let mailOptions = {
                    from: 'sender97gt@gmail.com', // sender address
                    to: email, // list of receivers
                    subject: `Recuperar Contraseña de Administrador`, // Subject line
                    html: `
                    <html>
                    <body>
                        <h1>Su contraseña es: ${contra}</h1><br>
                        <h2>Por favor, anotela y borre este correo</h2>
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

                // Envía la respuesta al cliente con los datos recuperados
                return res.send({ msg: 'success', mensaje:'Se envio un mensaje a su correo' });
            }
        })
    } catch (error) {
        console.log('Error en el servidor')
        return res.status(500).send('Error en el servidor');
    }
}

exports.CambiarPass = async (req, res) => {
    try {
        var idUser = req.body.idAdmin
        var clave = 'clave-secreta-123';

        // Descifrar el mensaje usando AES
        var bytes = CryptoJS.AES.decrypt(req.body.newPass, clave);
        var ContraNueva = bytes.toString(CryptoJS.enc.Utf8);
        var bytes2 = CryptoJS.AES.decrypt(req.body.correo, clave);
        var mail = bytes2.toString(CryptoJS.enc.Utf8)
        bd.query(`update administrador set passw = ? where idAdmin = ?`, [ContraNueva, idUser], (err, result) => {
            if(err) throw err

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: 'sender97gt@gmail.com',
                  pass: 'ljme gkdf izog mkbi'
                },
                tls: {
                    rejectUnauthorized: false
                }
              });
            
              let mailOptions = {
                from: 'sender97gt@gmail.com', // sender address
                to: mail, // list of receivers
                subject: "Cambio de Contraseña", // Subject line
                html: `
                <html>
                  <body>
                      <p>Ahora su nueva contraseña es: ${newPass}</p>
                      <p>Anotela y borre este correo</p>
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

            return res.send({msg: 'Contraseña modificada con exito'})
        })
    } catch (error) {
        console.log('Error al modificar la contraseña:\n', error)
    }
}

exports.AdminPermisos = async (req, res) => {
    try {
        var idAdmin = req.body.idAdmin
        bd.query(`select a.idAdmin, a.idPermiso from adminpermiso a, administrador b, permiso c
	      where b.idAdmin = a.idAdmin and c.idPermiso = a.idPermiso and a.idAdmin = ${idAdmin}`, function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log(error + '\nError en la peticion: AdminPermisos')
    }
    
}

exports.AdminLista = async (req, res) => {
    try {
        bd.query(`Select * from administrador where IdAdmin <> ${req.body.id}` , function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log(error + '\nError en la peticion: AdminLista')
    }
    
}

exports.Permisos = async (req, res) => {
    try {
        bd.query(`select * from permiso where permiso <> 'Principal' and permiso <> 'Informacion' and permiso <> 'Diplomados'`, function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log(error + '\nError en la peticion: Permisos')
    }
    
}

exports.PermisosAdmin = async (req, res) => {
    try {
        var idAdmin = req.body.idAdmin
        bd.query(`select c.idPermiso, c.permiso from adminpermiso a, administrador b, permiso c
	      where b.idAdmin = a.idAdmin and c.idPermiso = a.idPermiso and a.idAdmin = ${idAdmin}`, function(err, result){
            if(err) throw err
            return res.send(result)
        })
    } catch (error) {
        console.log(error + '\nError en la peticion: PermisosAdmin')
    }
    
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

exports.BloquearAdmin = async (req, res) => {
    try {
        var idAdmin = req.body.idAdmin
        var estado = req.body.estado
        bd.query(`update administrador set estado = ${estado} where idAdmin = ${idAdmin}`, function(err, result){
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
    try {
        bd.query(`Select * from jornada ORDER BY estado DESC` , function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log(error + "error en la peticion GetJornadas")
    }
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
    try {
        var idJornada = req.body.idJornada
        bd.query(`delete from jornada idJornada = ${idJornada}` , function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log(error + "error en la peticion eliminarJornada")
    }
}

async function AsignacionAuto (idCapa) {
    try {
        const Usuarios = await Users()

        for(const Usuario of Usuarios){
            try {
                await insertarAsistencia(Usuario.idUsuario, idCapa)
            } catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    console.error(`${idCapa} Ya Existe para el usuario ${Usuario.idUsuario}`);
                } else {
                    // Otro tipo de error
                    console.error('Error inesperado11:', error);
                    //return res.status(500).json({ error: 'Error interno del servidor' });
                }
            }
        }
        //return res.status(200).json({mensaje: 'Existo al asignar los datos'})
    } catch (error) {
        console.error('Error inesperado22:', error);
        //return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

function Users() {
    return new Promise((resolve, reject) => {
        bd.query(`SELECT idUsuario FROM usuario`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

function insertarAsistencia(idUser, idCapacitacion){
    return new Promise((resolve, reject) => {
        bd.query(`Insert into asistencia(idUsuario, inscrito, presente, idCapacitacion) values (${idUser}, 0, 0, ${idCapacitacion})`, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
        });
    });
}

exports.CrearCapacitacion = async (req, res) => {
    try {
        var nomCapacitacion = req.body.capacitacion.nomCapacitacion
        var descripcion = req.body.capacitacion.descripcion
        var presentador = req.body.capacitacion.presentador
        var poster = req.body.capacitacion.poster
        var zoomLink = req.body.capacitacion.zoomLink
        var fbLink = req.body.capacitacion.fbLink
        var duracion = req.body.capacitacion.duracion
        var modalidad = req.body.capacitacion.modalidad
        var idJornada = req.body.capacitacion.idJornada
        var idCategoria = req.body.capacitacion.idCategoria
        if(poster == "" || poster === undefined){
            bd.query(`insert into capacitacion(nomCapacitacion, descripcion, presentador, poster, zoomLink, fbLink, idJornada, idCategoria, estado, duracion, modalidad)
              values('${nomCapacitacion}', '${descripcion}', '${presentador}', '${poster}', '${zoomLink}', '${fbLink}', ${idJornada}, ${idCategoria}, 1, '${duracion}', ${modalidad})`, function(err, result){
                if(err) throw err
                const idCapa = result.insertId
                AsignacionAuto(idCapa)
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
                bd.query(`insert into capacitacion(nomCapacitacion, descripcion, presentador, poster, zoomLink, fbLink, idJornada, idCategoria, estado, duracion, modalidad)
                  values('${nomCapacitacion}', '${descripcion}', '${presentador}', '${archiv}', '${zoomLink}', '${fbLink}', ${idJornada}, ${idCategoria}, 1, '${duracion}', ${modalidad})`, function(err, result){
                    if(err) throw err
                    const idCapa = result.insertId
                    AsignacionAuto(idCapa)
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
        const {idCapacitacion, nomCapacitacion, descripcion, presentador, poster, zoomLink, fbLink, idJornada, estado, diploma, duracion, modalidad} = req.body.capacitacion
        var base64 = req.body.base64
        var oldPoster = req.body.oldPoster
        if(oldPoster == poster){
            bd.query(`update capacitacion set nomCapacitacion = '${nomCapacitacion}', descripcion = '${descripcion}', presentador = '${presentador}', poster = '${poster}', zoomLink = '${zoomLink}', fbLink = '${fbLink}', estado=${estado}, diploma='${diploma}', duracion='${duracion}', modalidad=${modalidad} where idCapacitacion = ${idCapacitacion}`, function(err, result){
                if(err) throw err
                res.status(201).json({mensaje:'Modificacion Exitosa'})
            })
        } else {
            if(oldPoster !== undefined){
                const params1 = {
                    Bucket: "bucket-jornadas",
                    Key: oldPoster
                }
                const putResult1 = s3.deleteObject(params1).promise();
                console.log(putResult1);
            }
            let archiv = "https://bucket-jornadas.s3.amazonaws.com/"+SubirArchivo(poster, base64)
            if(archiv != "Error"){
                bd.query(`update capacitacion set nomCapacitacion = '${nomCapacitacion}', descripcion = '${descripcion}', presentador = '${presentador}', poster = '${archiv}', zoomLink = '${zoomLink}', fbLink = '${fbLink}', estado=${estado}, diploma='${diploma}', duracion='${duracion}', modalidad=${modalidad} where idCapacitacion = ${idCapacitacion}`, function(err, result){
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

exports.EstadoCapacitacion = async (req, res) => {
    try {
        var idCapacitacion = req.body.idCapacitacion
        var estado = req.body.estado
        bd.query(`update capacitacion set estado = ${estado} where idCapacitacion = ${idCapacitacion}`, function(err, result) {
            if(err) throw err
            res.status(201).json({mensaje:'Modificacion Exitosa'})
        })
    } catch (error) {
        console.log('Error en el servidor')
    }
}

exports.AsignarDiplomas = async (req, res) => {
    var idCapacitacion = req.body.idCapacitacion
    try {
        bd.query(`delete from tipousuariodiploma where idCapacitacion = ${idCapacitacion}`)
        for (var i = 0; i < req.body.datos.length; i++){
            var {idTipo, tipo} = req.body.datos[i]
            bd.query(`insert into tipousuariodiploma(idCapacitacion, idTipo) values (${idCapacitacion}, ${idTipo})`)
        }
        res.status(201).json({mensaje:'Permisos Asignados'})
    } catch (error) {
        try {
            console.log(error+'\nNo habia datos previos para borrar')
            for (var i = 0; i < req.body.datos.length; i++){
                var {idTipo, tipo} = req.body.datos[i]
                bd.query(`insert into tipousuariodiploma(idCapacitacion, idTipo) values (${idCapacitacion}, ${idTipo})`)
            } 
            res.status(201).json({mensaje:'Permisos Asignados'})
        } catch (error1) {
            console.error('error: '+error1)
            res.status(500).json({error: 'error al asignar permisos de diploma'})
        }
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
    try {
        var idCategoria = req.body.idCategoria
        var estado = req.body.estado
        bd.query(`Select a.* from capacitacion a, jornada b where a.idJornada = b.idJornada and CURDATE() >= b.fechaInicio
          and CURDATE() <= b.fechaFinal and a.idCategoria = ${idCategoria};` , function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log(error + "error en la peticion Capacitaciones")
    }
}

exports.CapacitacionesPorJornada = async (req, res) => {
    try {
        var idJornada = req.body.idJornada
        var idCategoria = req.body.idCategoria
        bd.query(`Select * from capacitacion where idJornada = ${idJornada} and idCategoria = ${idCategoria} and estado = 1;` , function(err, result){
            if(err){
                if(err.code === 'ER_BAD_FIELD_ERROR'){
                    console.error('Columna no encontrada en la tabla.');
                } else {
                    // Otro tipo de error, manejar según sea necesario
                    console.error('Error en la consulta:', err);
                }
            } else {
                return res.send(result)
            }
        })
    } catch (error) {
        console.log(error + "error en la peticion CapacitacionesPorJornada")
    }
}

exports.Participaciones = async (req, res) => {
    try {
        var idJornada = req.body.idJornada
        var idCategoria = req.body.idCategoria
        var idUsuario = req.body.idUsuario
        bd.query(`Select a.idCapacitacion, a.nomCapacitacion, a.descripcion, a.diploma, c.presente from capacitacion a, usuario b, asistencia c where a.idJornada = ${idJornada} and a.idCategoria = ${idCategoria} and c.inscrito = 1 and a.estado = 1 and c.idUsuario = ${idUsuario} and a.idCapacitacion = c.idCapacitacion and c.idUsuario = b.idUsuario;` , function(err, result){
            if(err){
                if(err.code === 'ER_BAD_FIELD_ERROR'){
                    console.error('Columna no encontrada en la tabla.');
                } else {
                    console.error('Error en la consulta:', err);
                }
            } else {
                return res.send(result)
            }
        })
    } catch (error) {
        console.log('Error del server '+error)
    }
}

exports.DiplomaCapacitaciones = async(req, res) => {
    var idUser = req.body.idUser
    var idJornada = req.body.idJornada
    //console.log('**---'+idUser+'  '+idJornada)
    if(idJornada === undefined){
        console.log('no se recivio dato de jornada')
        return res.status(400).send('No se recivio dato de jornada')
    }
    try {
        bd.query(`select a.nomCapacitacion, a.descripcion, a.duracion, a.modalidad, c.presente, d.fecha, 0 as dat, 'l' as link from capacitacion a, usuario b, asistencia c, agenda d, jornada e where a.idCategoria = 1  and a.idJornada = e.idJornada and a.idJornada = ${idJornada} and b.idUsuario = ${idUser} and a.idCapacitacion = c.idCapacitacion and b.idUsuario = c.idUsuario and d.idCapacitacion = a.idCapacitacion and c.inscrito = 1`, (err, result) => {
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log('Error al solicitar las reuniones con derecho a diploma')
    }
}

exports.DiplomaDiplomados = async(req, res) => {
    var idUser = req.body.idUser
    var idJornada = req.body.idJornada
    if(idJornada === undefined){
        console.log('no se recivio dato de jornada')
        return res.status(400).send('No se recivio dato de jornada')
    }
    try {
        bd.query(`select a.nomCapacitacion, a.descripcion, c.presente, Min(d.fecha) as inicio, Max(d.fecha) as fin, e.nota, a.diploma, a.duracion, a.modalidad, 0 as dat, 'l' as link
          from capacitacion a
          join asistencia c on a.idCapacitacion = c.idCapacitacion
          join usuario b on b.idUsuario = c.idUsuario
          join agenda d on a.idCapacitacion = d.idCapacitacion
          join nota e on a.idCapacitacion = e.idCapacitacion
          join tipousuariodiploma g on g.idCapacitacion = a.idCapacitacion
          join tipousuario f on f.idTipo = g.idTipo
          join jornada h on h.idJornada = a.idJornada
          where a.idCategoria = 2 and b.idUsuario = ${idUser} and a.idJornada = ${idJornada} and c.inscrito = 1 and b.idTipo = f.idTipo
          group by a.idCapacitacion, a.nomCapacitacion, a.descripcion;`, (err, result) => {
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log('Error al solicitar las reuniones con derecho a diploma')
    }
}

exports.getAgenda = async (req, res) => {
    try {
        var idCapacitacion = req.body.idCapacitacion
        bd.query(`Select * from agenda where idCapacitacion = '${idCapacitacion}'` , function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log(error + '\nError al solicitar las reuniones con derecho a diploma')
    }
}

exports.Asistencias = async (req, res) => {
    var idCapacitacion = req.body.idCapacitacion
    var tipo = req.body.tipo
    console.log(idCapacitacion)
    try {
        if (tipo == 1){
            for(let data of req.body.datos){
                bd.query(`update asistencia set presente = 1 where idUsuario = (select idUsuario from usuario where carne = '${data['Carne']}' and cui='${data['CUI']}' and correo='${data['Correo Electrónico']}') and inscrito = 1 and idCapacitacion = ${idCapacitacion}`, function(err, result){
                    if(err){
                        if(err.code === 'ER_BAD_FIELD_ERROR'){
                            console.error('Columna no encontrada en la tabla.');
                        } else {
                            // Otro tipo de error, manejar según sea necesario
                            console.error('Error en la consulta:', err);
                        }
                    } else {
                        console.log('Asistencia Registrada')
                        //return res.send({message: 'Asistencia registrada con exito'})
                    }
                })
            }
        } else if(tipo == 2) {
            var nota = 0
            for(let data of req.body.datos){
                bd.query(`update asistencia set presente = 1 where idUsuario = (select idUsuario from usuario where carne = '${data['Carne']}' and cui='${data['CUI']}' and correo='${data['Correo Electrónico']}') and inscrito = 1 and idCapacitacion = ${idCapacitacion}`, function(err, result){
                    if(err){
                        if(err.code === 'ER_BAD_FIELD_ERROR'){
                            console.error('Columna no encontrada en la tabla.');
                        } else {
                            // Otro tipo de error, manejar según sea necesario
                            console.error('Error en la consulta:', err);
                        }
                    } else {
                        bd.query(`Select a.idUsuario from usuario a, asistencia b where a.carne = '${data['Carne']}' and a.cui='${data['CUI']}' and a.correo='${data['Correo Electrónico']}' and a.idUsuario = b.idUsuario and b.inscrito = 1 and b.idCapacitacion = ${idCapacitacion};`, function(err, result){
                            if(err){
                                console.error('Error en la consulta ')
                                return;
                            }

                            if(!result || result.length === 0 || !result[0].idUsuario){
                                console.log('Usuario inexistente o no se inscribio')
                            } else {
                                if(data['nota'] === undefined){
                                    nota = 0
                                } else {
                                    nota = data['nota']
                                }
                                const user = result[0].idUsuario;
                                console.log('Nota Registrada')
                                bd.query(`insert into nota (idUsuario, idCapacitacion, nota) values (${user}, ${idCapacitacion}, ${nota}) On duplicate key update nota = ${nota}`)
                            }
                        })
                        //return res.send({message: 'Asistencia registrada con exito'})
                    }
                })
            }
        }
        
        return res.send({message: 'Asistencias Registradas'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error al registrar las asistencias'})
    }
}

exports.solicitudesAyuda = async(req, res) => {
    try {
        bd.query(`Select a.idUsuario, a.cui, a.nombre, a.apellido, a.correo, b.Asunto, b.descripcion, b.estado from usuario a, ayuda b where a.idUsuario = b.idUsuario` , function(err, result){
        if(err) throw err;
        return res.send(result)
    })
    } catch (error) {
        console.log("error en el server: solicitudesAyuda")
    }
}

exports.FiltrarAyudas = async(req, res) => {
    try {
        var estado = req.body.estado
        var usuario = req.body.usuario
        if((estado === undefined && usuario === undefined) || (estado === "" && usuario === "")){
            bd.query(`Select a.idUsuario, a.cui, a.nombre, a.apellido, a.correo, b.Asunto, b.descripcion, b.estado from usuario a, ayuda b where a.idUsuario = b.idUsuario` , function(err, result){
                if(err) throw err;
                return res.send(result)
            })
        } else if (estado === undefined || estado === ""){
            bd.query(`Select a.idUsuario, a.cui, a.nombre, a.apellido, a.correo, b.Asunto, b.descripcion, b.estado from usuario a, ayuda b where a.idUsuario = b.idUsuario and a.cui = '${usuario}'` , function(err, result){
                if(err) throw err;
                return res.send(result)
            })
        } else if (usuario === undefined || usuario === ""){
            bd.query(`Select a.idUsuario, a.cui, a.nombre, a.apellido, a.correo, b.Asunto, b.descripcion, b.estado from usuario a, ayuda b where a.idUsuario = b.idUsuario and b.estado = ${estado}` , function(err, result){
                if(err) throw err;
                return res.send(result)
            })
        } else if((estado !== undefined && usuario !== undefined) || (estado !== "" && usuario !== "")){
            bd.query(`Select a.idUsuario, a.cui, a.nombre, a.apellido, a.correo, b.Asunto, b.descripcion, b.estado from usuario a, ayuda b where a.idUsuario = b.idUsuario and a.cui = '${usuario}' and b.estado = ${estado}` , function(err, result){
                if(err) throw err;
                return res.send(result)
            })
        }
    } catch (error) {
        console.log("Error en la peticion FiltrarAyudas ",error)
    }
}

exports.EstadoAyuda = async(req, res) => {
    try {
        var usuario = req.body.usuario
        var asunto = req.body.asunto
        bd.query(`update ayuda set estado = 1 where idUsuario = ${usuario} and Asunto = '${asunto}'`)
    } catch (error) {
        console.log("Error en la peticion EstadoAyuda ",error)
    }
}

// fuciones extras

exports.Actualizar0 = async (req, res) => {
    try {
        bd.query(`UPDATE jornada
        SET estado = CASE
            WHEN CURDATE() > fechaFinal OR CURDATE() < fechaInicio THEN 0
            ELSE estado -- Mantener el valor actual si no se cumple la condición
        END
        WHERE CURDATE() > fechaFinal OR CURDATE() < fechaInicio`, function(err, result){
            if(err) throw err
            console.log("Actualizar 0")
        })
    } catch (error) {
        console.log(error + "\n Error en la peticion de Actualizacion0")
    }
}

exports.Actualizar1 = async (req, res) => {
    try {
        bd.query(`UPDATE jornada
        SET estado = CASE
            WHEN CURDATE() >= fechaInicio AND CURDATE() <= fechaFinal THEN 1
            ELSE estado -- Mantener el valor actual si no se cumple la condición
        END
        WHERE CURDATE() >= fechaInicio AND CURDATE() <= fechaFinal`, function(err, result){
            if(err) throw err
            console.log("Actualizar 1")  
        })
    } catch (error) {
        console.log(error + "\n Error en la peticion de Actualizacion1")
    }
    
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

exports.getUsuarios = async (req, res) => {
    try {
        if(req.body.datosExtra === undefined){
            bd.query(`select a.* from usuario a, tipousuario b, municipio c, departamento d
              where b.idTipo = a.idTipo and a.idmunicipio = c.idMunicipio and c.idDepartamento = d.idDepartamento`, function(err, result){
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
            bd.query(`select a.* from usuario a, tipousuario b, municipio c, departamento d
              where b.idTipo = a.idTipo and a.idmunicipio = c.idMunicipio and c.idDepartamento = d.idDepartamento${parametrosExtra}`, function(err, result){
                if(err) throw err;
                return res.send(result)
            })
        }
    } catch (error) {
        console.log(error)
        console.log('Problema en la ejecucion del query para inscripciones')
    }
}

exports.CargarPlantilla = async (req, res) => {
    try {
        var Archivo64 = req.body.base64
        //var Archivo = req.body.PlantillaConferencia
        var nombrei = "Plantillas/PlantillaDiploma.jpg";
        let buff = new Buffer.from(Archivo64, 'base64')
        //se convierte la base64 a bytes
        const params1 = {
            Bucket: "bucket-jornadas",
            Key: nombrei,
            Body: buff,
            ContentType: "image/jpeg",
            ACL: 'public-read'
        };
        s3.upload(params1, (err, data) => {
            if(err){
                console.error('Error en la carga', err)
            } else {
                console.log('Carga exitosa: ' , data.Location)
            }
        });
        return res.send(nombrei)
    } catch (error) {
        console.log(error)
        console.log('Error al cargar la plantilla de conferencias')
    }
}

exports.CargarPlantillaDiplo = async (req, res) => {
    try {
        var Archivo64 = req.body.base64
        //var Archivo = req.body.PlantillaConferencia
        var nombrei = "Plantillas/Plantilla_"+ req.body.nomCapacitacion +".jpg";
        let buff = new Buffer.from(Archivo64, 'base64')
        //se convierte la base64 a bytes
        const params1 = {
            Bucket: "bucket-jornadas",
            Key: nombrei,
            Body: buff,
            ContentType: "image/jpeg",
            ACL: 'public-read'
        };
        s3.upload(params1, (err, data) => {
            if(err){
                console.error('Error en la carga', err)
            } else {
                console.log('Carga exitosa: ' , data.Location)
                bd.query(`update capacitacion set diploma='${data.Location}' where idCapacitacion = ${req.body.idCapacitacion}`)
            }
        });
        return res.send(nombrei)
    } catch (error) {
        console.log(error)
        console.log('Error al cargar la plantilla de diplomado')
    }
}

exports.ListaActual = async (req, res) => {
    try {
        var idCapacitacion = req.body.idCapacitacion
        bd.query(`Select a.* from tipousuario a, capacitacion b, tipousuariodiploma c where b.idCapacitacion = ${idCapacitacion} and b.idCapacitacion = c.idCapacitacion and a.idTipo = c.idTipo ` , function(err, result){
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.error(error+ " Error al obtener el listado actual")
        res.status(500).json({error: 'error al registrar las asistencias'})
    }
}

exports.CambiarTipo = async (req, res) => {
    var idUsuario = req.body.idUsuario
    var idTipo = req.body.idTipo
    //console.log(req.body.User)
    try {
        bd.query(`update usuario set idTipo=${idTipo} where idUsuario = ${idUsuario}`, (err, result) => {
            if(err) throw err;
            return res.send({msg: 'Exito al modificar los datos del usuario'})
        })
    } catch (error) {
        console.log('error al intenter modificar los datos del usuario\n'+error)
    }
}

exports.CambiarEstado = async (req, res) => {
    var idUsuario = req.body.idUsuario
    var estado = req.body.estado
    //console.log(req.body.User)
    try {
        bd.query(`update usuario set estado=${estado} where idUsuario = ${idUsuario}`, (err, result) => {
            if(err) throw err;
            return res.send({msg: 'Exito al modificar los datos del usuario'})
        })
    } catch (error) {
        console.log('error al intenter modificar los datos del usuario\n'+error)
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