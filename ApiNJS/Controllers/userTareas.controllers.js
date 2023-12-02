const bd = require('../BD/conection')
const jwt = require('jsonwebtoken')
const aws_keys = require('../Keys/creds')
var AWS = require('aws-sdk')
const s3 = new AWS.S3(aws_keys.s3)
const nodemailer = require('nodemailer')

const fetch = require('node-fetch') //npm install node-fetch@2.6.1
const {PDFDocument, StandardFonts, rgb} = require('pdf-lib')
const fs = require('fs').promises

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
    var idUser = req.body.idUser;
    var Inscrito = req.body.Inscrito
        bd.query(`select a.*, c.fecha, c.hora from capacitacion a, jornada b, agenda c, asistencia d, usuario e where a.idJornada = b.idJornada and CURDATE() >= b.fechaInicio
          and CURDATE() <= b.fechaFinal and a.idCapacitacion = c.idCapacitacion and a.idCategoria = 1 and e.idUsuario = d.idUsuario and e.idUsuario = ${idUser} and a.idCapacitacion = d.idCapacitacion and d.inscrito = ${Inscrito}
	      UNION
          Select a.*, null as fecha, null as hora from capacitacion a, jornada b, asistencia d, usuario e where a.idJornada = b.idJornada and CURDATE() >= b.fechaInicio
	      and CURDATE() <= b.fechaFinal and a.idCategoria = 2 and e.idUsuario = d.idUsuario and e.idUsuario = ${idUser} and a.idCapacitacion = d.idCapacitacion and d.inscrito = ${Inscrito};`, function(err, result){
            if(err) throw err;
            return res.send(result)
        })
}

exports.AsignacionAuto = async (req, res) => {
    var idUser = req.body.idUser;
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
                    console.error('Error inesperado:', error);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }
            }
        }

        return res.status(200).json({mensaje: 'Existo al asignar los datos'})
    } catch (error) {
        console.error('Error inesperado:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
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
    try {
        bd.query(`select nomCapacitacion, descripcion, fecha from capacitacion a, usuario b, asistencia c, agenda d where b.idUsuario = ${idUser} and a.idCapacitacion = c.idCapacitacion and b.idUsuario = c.idUsuario and d.idCapacitacion = a.idCapacitacion and c.inscrito = 1 and c.presente = 1`, (err, result) => {
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
        const pdfDoc = await PDFDocument.create();
        const jpgUrl = 'https://bucket-jornadas.s3.amazonaws.com/Extras/PlantillaDiploma.jpg'
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
            height: scaledHeight,
        })
    
        // Incrusta la fuente en el documento
        const customFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
    
        // Usa la fuente personalizada en el texto
        const nombre = req.body.datos.nombre + " " + req.body.datos.apellido;

        const fontSize = 24;
        const longitudTexto = customFont.widthOfTextAtSize(nombre, fontSize);
        const PosX = (pageWidth - longitudTexto) / 2;

        page.drawText(nombre, { font: customFont, x: (PosX + 5), y: 368, size: fontSize });
        
        const txt1 = "Por su participacion en la conferencia";
        const capaci = `"${req.body.capacitacion}"`
        const txt2 = 'Con una duracion de dos horas virtuales';
        const txt3 = 'Dado en la Ciudad de Guatemala, '+req.body.fecha;
        
        const font2 = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const font1 = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
        const tam = 18
        const l1 = font2.widthOfTextAtSize(txt1, tam)
        const l2 = font1.widthOfTextAtSize(capaci, tam)
        const l3 = font2.widthOfTextAtSize(txt2, tam)
        const l4 = font2.widthOfTextAtSize(txt3, tam)
        const color = rgb(1, 0, 1)

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

        var nombrei = "Extras/"+ req.body.datos.nombre +"_"+ req.body.capacitacion +".pdf";
        //se convierte la base64 a bytes
        const params1 = {
            Bucket: "bucket-jornadas",
            Key: nombrei,
            Body: buffer,
            ACL: 'public-read'
        };
        putResult = s3.putObject(params1).promise();
  
        // Envía el PDF al cliente
        var URLArmado = 'https://bucket-jornadas.s3.amazonaws.com/Extras/'+req.body.datos.nombre +'_'+req.body.capacitacion.replace(/\s+/g, '+')+'.pdf'
        console.log(URLArmado)
        return res.send({Mensaje:'Archivo Generado', URL: URLArmado})
  
    } catch (error) {
      console.error('Error al generar el PDF: ', error)
      res.status(500).send('Error interno del server')
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