const bd = require('../BD/conection')
const jwt = require('jsonwebtoken')
const aws_keys = require('../Keys/creds')
var AWS = require('aws-sdk')
const s3 = new AWS.S3(aws_keys.s3)
const nodemailer = require('nodemailer')
var CryptoJS = require("crypto-js")

const fetch = require('node-fetch') //npm install node-fetch@2.6.1
const {PDFDocument, StandardFonts, rgb} = require('pdf-lib')
const fs = require('fs').promises

exports.GetDepartamentos = async (req, res) => {
    bd.query(`SELECT * FROM departamento`, function(err, result){
        if(err) throw err;
        res.send(result)
    })
}

exports.GetMunicipios = async (req, res) => {
    const idDepartamento = req.body.idDepartamento
    bd.query(`SELECT * FROM municipio WHERE idDepartamento=${idDepartamento}`, function(err, result){
        if(err) {
            if(err.code == 'ER_BAD_FIELD_ERROR'){
                console.error('No se encontreo resultado')
                res.status(409).json({ error: 'No se encontro resultado' });
            } else {
                console.error('Error en la consulta:', error);
                res.status(500).json({ error: 'Error en la consulta' });
            }
        } else {
            res.send(result)
        }
    })
}

exports.tiposUsuarios = async (req, res) => {
    bd.query(`SELECT * FROM tipousuario`, function(err, result){
        if(err) throw err;
        res.send(result)
    })
}

exports.RegistrarUsuario = async(req, res) => {
    try {
        const {carne, cui, nombre, apellido, correo, passwo, confirmPasswo, genero, direccion, idMunicipio, idTipo, estado, colegiado}= req.body.nuevoUser
        //console.log(carne, cui, nombre, apellido)
        bd.query(`Insert into usuario(carne, cui, nombre, apellido, correo, passwo, genero, direccion, idmunicipio, idTipo, estado, numcolegiado)
        values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
         [carne, cui, nombre, apellido, correo, passwo, genero, direccion, idMunicipio, idTipo, estado, colegiado], function(err, result){
            if(err) throw err

            const idUsuario = result.insertId;
            AsignacionAuto(idUsuario);

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
                subject: `Bienvenido(a) ${nombre} ${apellido}`, // Subject line
                html: `
                <html>
                <body>
                    <h1>Bienvenido(a) ${nombre} ${apellido}</h1><br>
                    <p>Para ingresar use su CUI o carnet de estudiante, si es su caso</p>
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

            return res.send(result)
        })
    } catch (error) {
        console.log('error al registrar al nuevo usuario')
        return res.send("error")
    }
}

exports.RecuperarContra = async (req, res) => {
    try {
        // Clave secreta para cifrar y descifrar
        var clave = 'clave-secreta-123';

        // Descifrar el mensaje usando AES
        var bytes = CryptoJS.AES.decrypt(req.body.datoContra, clave);
        var mensajeOriginal = bytes.toString(CryptoJS.enc.Utf8);
        bd.query(`Select correo, passwo from usuario where carne = ? or cui = ?`, [mensajeOriginal, mensajeOriginal], (err, result) =>{
            if (err) {
                return res.status(400).send({msg : 'Error'})
            }
            if(Object.keys(result).length === 0){
                return res.send({msg: 'El dato que envio no coincide'});
            } else {
                const correo = result[0].correo;
                const contra = result[0].passwo;

                // Puedes hacer lo que necesites con el correo aquí
                console.log('Correo encontrado:', correo);
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
                    to: correo, // list of receivers
                    subject: `Recuperar Contraseña`, // Subject line
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

exports.ModificarUsuario = async (req, res) => {
    var idUsuario = req.body.User.idUsuario
    //console.log(req.body.User)
    try {
        bd.query(`update usuario set carne=?, cui=?, nombre=?, apellido=?, correo=?, genero=?, direccion=? , idmunicipio=?, numcolegiado=? where idUsuario = ?`,
          [req.body.User.carne, req.body.User.cui, req.body.User.nombre, req.body.User.apellido, req.body.User.correo, req.body.User.genero, req.body.User.direccion, req.body.User.idmunicipio, req.body.User.numcolegiado, idUsuario], (err, result) => {
            if(err) throw err;
            return res.send({msg: 'Exito al modificar los datos del usuario'})
        })
    } catch (error) {
        console.log('error al intenter modificar los datos del usuario\n'+error)
    }
}

exports.CambiarPass = async (req, res) => {
    try {
        var idUser = req.body.idUser

        var clave = 'clave-secreta-123';

        // Descifrar el mensaje usando AES
        var bytes = CryptoJS.AES.decrypt(req.body.newPass, clave);
        var ContraNueva = bytes.toString(CryptoJS.enc.Utf8);
        var bytes2 = CryptoJS.AES.decrypt(req.body.correo, clave);
        var mail = bytes2.toString(CryptoJS.enc.Utf8)

        bd.query(`update usuario set passwo = ? where idUsuario = ?`, [ContraNueva, idUser], (err, result) => {
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
                      <p>Ahora su nueva contraseña es: ${ContraNueva}</p>
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

exports.GetUser = async (req, res) => {//modificar esta peticion para que acepta usuarios activos
    //select a.*, b.idDepartamento from usuario a, municipio b where a.estado = 1 and a.passwo='${passw}' and (a.carne='${dato1}' or a.cui='${dato1}') and a.idmunicipio = b.idMunicipio;
    try{
        var dato1 = req.body.dato1;
        var passw = req.body.passw;

        // Clave secreta para cifrar y descifrar
        var clave = 'clave-secreta-123';

        // Descifrar el mensaje usando AES
        var bytes = CryptoJS.AES.decrypt(passw, clave);
        var mensajeOriginal = bytes.toString(CryptoJS.enc.Utf8);

        var payload, clave="token1"
        bd.query(`select idUsuario from usuario where estado = 1 and passwo=? and (carne=? or cui=?);`, [mensajeOriginal, dato1, dato1], function(err, result){
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
    } catch(error){
        console.log('Error en el servidor')
        return res.status(500).send('Error en el servidor');
    }
}

exports.GetDatosUser = async (req, res) => {//modificar esta peticion para que acepta usuarios activos
    //select a.*, b.idDepartamento from usuario a, municipio b where a.estado = 1 and a.passwo='${passw}' and (a.carne='${dato1}' or a.cui='${dato1}') and a.idmunicipio = b.idMunicipio;
    try {
        var idUsuario = req.body.idUsuario;
        const consultaSQL = `SELECT a.*, b.idDepartamento FROM usuario a, municipio b 
                                WHERE a.estado = 1 AND a.idUsuario = ? AND a.idmunicipio = b.idMunicipio`;
            
        bd.query(consultaSQL, [idUsuario], function(err, result){
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
        console.error('Error en la función GetDatosUser:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
     
}

exports.GetCapacitaciones = async (req, res) => {
    var idUser = req.body.idUser;
    var Inscrito = req.body.Inscrito
        bd.query(`select a.*, c.fecha, c.hora from capacitacion a, jornada b, agenda c, asistencia d, usuario e where a.idJornada = b.idJornada and CURDATE() >= b.fechaInicio
          and CURDATE() <= b.fechaFinal and a.idCapacitacion = c.idCapacitacion and a.idCategoria = 1 and a.estado = 1 and e.idUsuario = d.idUsuario and e.idUsuario = ${idUser} and a.idCapacitacion = d.idCapacitacion and d.inscrito = ${Inscrito}
	      UNION
          Select a.*, null as fecha, null as hora from capacitacion a, jornada b, asistencia d, usuario e where a.idJornada = b.idJornada and CURDATE() >= b.fechaInicio
	      and CURDATE() <= b.fechaFinal and a.idCategoria = 2 and a.estado = 1 and e.idUsuario = d.idUsuario and e.idUsuario = ${idUser} and a.idCapacitacion = d.idCapacitacion and d.inscrito = ${Inscrito};`, function(err, result){
            if(err) throw err;
            return res.send(result)
        })
}

async function AsignacionAuto (idUser) {
    try {
        const capacitaciones = await capacitacionesUser()

        for(const capacitacion of capacitaciones){
            try {
                await insertarAsistencia(idUser, capacitacion.idCapacitacion)
            } catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    console.error(`${capacitacion.idCapacitacion} Ya Existe para el usuario ${idUser}`);
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

function capacitacionesUser() {
    return new Promise((resolve, reject) => {
        bd.query(`SELECT a.idCapacitacion FROM capacitacion a, jornada b where a.idJornada = b.idJornada and CURDATE() >= b.fechaInicio
          and CURDATE() <= b.fechaFinal`, (err, result) => {
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

exports.Diplomas = async(req, res) => {
    var idUser = req.body.idUser
    var idJornada = req.body.idJornada
    //console.log('**---'+idUser+'  '+idJornada)
    if(idJornada === undefined){
        console.log('no se recivio dato de jornada')
        return res.status(400).send('No se recivio dato de jornada')
    }
    try {
        bd.query(`select a.nomCapacitacion, a.descripcion, a.duracion, a.modalidad, d.fecha, 0 as dat, 'l' as link from capacitacion a, usuario b, asistencia c, agenda d, jornada e where a.idCategoria = 1  and a.idJornada = e.idJornada and a.idJornada = ${idJornada} and b.idUsuario = ${idUser} and a.idCapacitacion = c.idCapacitacion and b.idUsuario = c.idUsuario and d.idCapacitacion = a.idCapacitacion and c.inscrito = 1 and c.presente = 1`, (err, result) => {
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log('Error al solicitar las reuniones con derecho a diploma')
    }
}

exports.Diplomados = async(req, res) => {
    var idUser = req.body.idUser
    var idJornada = req.body.idJornada
    if(idJornada === undefined){
        console.log('no se recivio dato de jornada')
        return res.status(400).send('No se recivio dato de jornada')
    }
    try {
        bd.query(`select a.idCapacitacion, a.nomCapacitacion, a.descripcion, Min(d.fecha) as inicio, Max(d.fecha) as fin, Min(e.nota) as nota, a.diploma, a.duracion, a.modalidad, 0 as dat, 'l' as link
          from capacitacion a
          join asistencia c on a.idCapacitacion = c.idCapacitacion
          join usuario b on b.idUsuario = c.idUsuario
          join agenda d on a.idCapacitacion = d.idCapacitacion
          join nota e on a.idCapacitacion = e.idCapacitacion
          join tipousuariodiploma g on g.idCapacitacion = a.idCapacitacion
          join tipousuario f on f.idTipo = g.idTipo
          join jornada h on h.idJornada = a.idJornada
          where a.idCategoria = 2 and b.idUsuario = ${idUser} and a.idJornada = ${idJornada} and c.inscrito = 1 and c.presente = 1 and b.idTipo = f.idTipo
          group by a.idCapacitacion, a.nomCapacitacion, a.descripcion;`, (err, result) => {
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log('Error al solicitar las reuniones con derecho a diploma')
    }
}

exports.Inscripcion = async(req, res) => {//recordar la inscripcion
    var idUser = req.body.idUser
    var idCapacitacion = req.body.idCapacitacion
    var inscripcion = req.body.inscripcion
    try {
        bd.query(`update asistencia SET inscrito = ${inscripcion} WHERE idUsuario = ${idUser} and idCapacitacion = ${idCapacitacion}`, (err, result) => {
            if(err) throw err;
            return res.send({mensaje: 'Exito al modificar la asistencia'})
        })
    } catch (error) {
        console.log('Error al momento de registrar la inscripcion')
    }
}

exports.CalendarioDiplomado = async(req, res) => {
    var idCapacitacion = req.body.idCapacitacion
    try {
        bd.query(`select * from agenda where idCapacitacion = ${idCapacitacion}`, (err, result) => {
            if(err) throw err;
            return res.send(result)
        })
    } catch (error) {
        console.log("error al solicitar el calendario del diplomado")
    }
}

exports.GenerarPDF = async(req, res) => {
    try {
        // Crea un nuevo documento PDF
        var modalidad = ""
        if(req.body.datos.modalidad == 1){
            modalidad = "virtuales"
        } else if(req.body.datos.modalidad == 2){
            modalidad = "presenciales"
        } else if(req.body.datos.modalidad == 3){
            modalidad = "mixtas"
        }
        const duracion = req.body.datos.duracion
        const pdfDoc = await PDFDocument.create();
        const jpgUrl = 'https://bucket-jornadas.s3.amazonaws.com/Plantillas/PlantillaDiploma.jpg'
        const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
        const pageWidth = 792; //792 - 600
        const pageHeight = 612; //612 - 400
        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
        const scaleFactor = Math.min(pageWidth / jpgImage.width, pageHeight / jpgImage.height)
        const scaledWidth = jpgImage.width * scaleFactor;
        const scaledHeight = jpgImage.height * scaleFactor;
        page.drawImage(jpgImage, {
            x: 0,
            y: 0,
            width: scaledWidth,
            height: scaledHeight
        })
    
        // Incrusta la fuente en el documento
        const customFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
    
        // Usa la fuente personalizada en el texto
        const nombre = req.body.datos.nombre + " " + req.body.datos.apellido;

        const fontSize = 24;
        const longitudTexto = customFont.widthOfTextAtSize(nombre, fontSize);
        const PosX = (pageWidth - longitudTexto) / 2;
        const color = rgb(0, 0, 0)
        
        page.drawText(nombre, { font: customFont, x: (PosX + 5), y: 368, size: fontSize, color });
        
        const txt1 = "Por su participacion en la conferencia";
        const capaci = `"${req.body.capacitacion}"`
        const txt2 = `Con una duracion de ${duracion} horas ${modalidad}`;
        const txt3 = 'Dado en la Ciudad de Guatemala, '+req.body.fecha;
        
        const font2 = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const font1 = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
        const tam = 18
        const l1 = font2.widthOfTextAtSize(txt1, tam)
        const l2 = font1.widthOfTextAtSize(capaci, tam)
        const l3 = font2.widthOfTextAtSize(txt2, tam)
        const l4 = font2.widthOfTextAtSize(txt3, tam)
        
        page.drawText(txt1, {
            font: font2,
            x: ((pageWidth - l1) / 2),
            y: 334, size: tam, color});
        page.drawText(capaci, {
            font: font1,
            x: ((pageWidth - l2) / 2),
            y: 308, size: tam, color});
        page.drawText(txt2, {
            font: font2,
            x: ((pageWidth - l3) / 2),
            y: 284, size: tam, color});
        page.drawText(txt3, {
            font: font2,
            x: ((pageWidth - l4) / 2),
            y: 258, size: tam, color});
        // Guarda el documento
        const pdfBytes = await pdfDoc.save();
        const buffer = Buffer.from(pdfBytes)
        //console.log(base64String)

        var nombrei = "Diplomas/"+ req.body.datos.apellido+req.body.datos.nombre +"_"+ req.body.capacitacion +".pdf";
        //se convierte la base64 a bytes
        const params1 = {
            Bucket: "bucket-jornadas",
            Key: nombrei,
            Body: buffer,
            ACL: 'public-read'
        };
        putResult = s3.putObject(params1).promise();
  
        // Envía el PDF al cliente
        var URLArmado = 'https://bucket-jornadas.s3.amazonaws.com/Diplomas/'+req.body.datos.apellido+req.body.datos.nombre+'_'+req.body.capacitacion.replace(/\s+/g, '+')+'.pdf'
        console.log(URLArmado)
        return res.send({Mensaje:'Archivo Generado', URL: URLArmado})
  
    } catch (error) {
      console.error('Error al generar el PDF: ', error)
      res.status(500).send('Error interno del server')
    }
}

exports.GenerarDiplomadoPDF = async(req, res) => {
    try {
        // Crea un nuevo documento PDF
        var modalidad = ""
        if(req.body.datos.modalidad == 1){
            modalidad = "virtuales"
        } else if(req.body.datos.modalidad == 2){
            modalidad = "presenciales"
        } else if(req.body.datos.modalidad == 3){
            modalidad = "mixtas"
        }
        const duracion = req.body.datos.duracion
        const pdfDoc = await PDFDocument.create(); 
        const jpgUrl = req.body.diploma
        const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
        const pageWidth = 816; //hoja doble oficio
        const pageHeight = 1248; //hoja doble oficio
        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
        const scaleFactor = Math.min(pageWidth / jpgImage.width, pageHeight / jpgImage.height)
        const scaledWidth = jpgImage.width * scaleFactor;
        const scaledHeight = jpgImage.height * scaleFactor;
        page.drawImage(jpgImage, {
            x: 0,
            y: 0,
            width: scaledWidth,
            height: scaledHeight
        })
    
        // Incrusta la fuente en el documento
        const customFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
        // Usa la fuente personalizada en el texto
        const nombre = req.body.datos.nombre + " " + req.body.datos.apellido;

        const fontSize = 42;
        const longitudTexto = customFont.widthOfTextAtSize(nombre, fontSize);
        const PosX = (pageWidth - longitudTexto) / 2;
        const color = rgb(0, 0, 1)
        
        page.drawText(nombre, { font: customFont, x: (PosX-5), y: 570, size: fontSize});

        const capaci = `"${req.body.capacitacion}"`
        const txt2 = `Realizado del ${req.body.fechas. inicio} al ${req.body.fechas.fin},`;
        const txt3 = `con una duracion de ${duracion} horas`;
        const txt4 = `Dado en la Ciudad de Guatemala en la fecha del ${req.body.fechas.fin}`
        
        const font2 = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const font1 = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        const tam = 18, tam2 = 14, tam3 = 38
        const l1 = font1.widthOfTextAtSize(capaci, tam3)
        const l2 = font2.widthOfTextAtSize(txt2, tam2)
        const l3 = font2.widthOfTextAtSize(txt3, tam2)
        const l4 = font2.widthOfTextAtSize(txt4, tam2)
        
        page.drawText(capaci, {
            font: font1,
            x: ((pageWidth - l1) / 2),
            y: 465, size: tam3});
        page.drawText(txt2, {
            font: font2,
            x: ((pageWidth - l2) / 2),
            y: 425, size: tam2});
        page.drawText(txt3, {
            font: font2,
            x: ((pageWidth - l3) / 2),
            y: 400, size: tam2});
        page.drawText(txt4, {
            font: font2,
            x: ((pageWidth - l4) / 2),
            y: 370, size: tam2});
        // Guarda el documento
        const pdfBytes = await pdfDoc.save();
        const buffer = Buffer.from(pdfBytes)
        //console.log(base64String)

        var nombrei = "Diplomados/"+ req.body.datos.apellido+req.body.datos.nombre +"_"+ req.body.capacitacion +".pdf";
        //se convierte la base64 a bytes
        const params1 = {
            Bucket: "bucket-jornadas",
            Key: nombrei,
            Body: buffer,
            ACL: 'public-read'
        };
        putResult = s3.putObject(params1).promise();
  
        // Envía el PDF al cliente
        var URLArmado = 'https://bucket-jornadas.s3.amazonaws.com/Diplomados/'+ req.body.datos.apellido+req.body.datos.nombre +'_'+req.body.capacitacion.replace(/\s+/g, '+')+'.pdf'
        console.log(URLArmado)
        return res.send({Mensaje:'Archivo Generado', URL: URLArmado})
  
    } catch (error) {
      console.error('Error al generar el PDF: ', error)
      res.status(500).send('Error interno del server')
    }
}

exports.EnviarAyuda = async(req, res) => {
    try {
        var idUsuario = req.body.idUsuario
        var Asunto = req.body.Asunto
        var Descripcion = req.body.Descripcion
        bd.query(`insert into ayuda(idUsuario, Asunto, descripcion, estado) values (${idUsuario}, '${Asunto}', '${Descripcion}', 0)`, (err, result) => {
            if(err) throw err;
            return res.send({mensaje: 'Exito al modificar la asistencia'})
        })
    } catch (error) {
        console.log("error en la peticion de envio de ayuda ", error)
    }
}

function SubirArchivo(Archivo, idArchivo, tipo){
    try {
        var nombrei = "files/" + Archivo +uuid()+tipo;
        //se convierte la base64 a bytes
        let buff = new Buffer.from(idArchivo, 'base64');
        
        if(tipo == ".pdf"){
            const params1 = {
                Bucket: "bucket-jornadas",
                Key: nombrei,
                Body: buff,
                ACL: 'public-read'
            };
            putResult = s3.putObject(params1).promise();
        } else {
            const params2 = {
                Bucket: "appweb-6p1",
                Key: nombrei,
                Body: buff,
                ContentType: "image",
                ACL: 'public-read'
            };
            putResult = s3.putObject(params2).promise();
        }
        return nombrei;
    } catch (error) {
        return "error";
    }
}