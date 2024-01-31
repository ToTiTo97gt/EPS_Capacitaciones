const csvParser = require('csv-parser');

const tareas = require('./Routes/rutas.routes')
const user = require('./Routes/rutasUser.routes')
var express = require('express');
const {PDFDocument, StandardFonts} = require('pdf-lib')
const fs = require('fs').promises
const multer = require('multer')
const ejs=require('ejs');
const morgan=require('morgan');

var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)


// Enable preflight requests for all r

//var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.options('*', cors());

app.get('/', cors(), (req, res, next) => {
  res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
})

var http = require('http').Server(app);
app.use(bodyParser.json({ limit: '10mb', extended: false }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
var port = 3020;
app.use(morgan('dev'))

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Rutas
app.get('/', cors(), function(req,res){
    res.send("Bienvenido!")
});
    
//app.use("/",usuario);
app.use('/Admin', cors(), tareas)

app.use('/User', cors(), user)

app.post('/CSV', cors(), upload.single('file'), (req, res) => {
    const file = req.file;
  
    // Procesar el archivo (puedes guardar en el sistema de archivos, base de datos, etc.)
    var csvData = file.buffer.toString()
    const jsonData = []
      const lines = csvData.split('\n');

  // Procesar manualmente la primera línea (encabezados)
  const headers = lines[0].trim().split(',').map(header => header.replace(/"/g, ''));
  //console.log("headers: "+headers)
  // Procesar el resto de las líneas
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    //console.log("line: "+line)
    if (line) {
      const values = line.split(',').map(header => header.replace(/"/g, ''));
      //console.log("values: "+values)
      const entry = {};
      headers.forEach((header, index) => {
        entry[header] = values[index];
        //console.log("entry: "+entry + " header"+entry[header])
      });
      jsonData.push(entry);
    }
  }

  // Enviar respuesta al cliente
  res.send( jsonData );
  });

http.listen(port, function() {
    console.log('listening on port: '+port );
});