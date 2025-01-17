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

//var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors());

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

  // Procesar el resto de las líneas
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line) {
      const values = line.split(',').map(header => header.replace(/"/g, ''));

      const entry = {};
      headers.forEach((header, index) => {
        entry[header] = values[index];
      });
      jsonData.push(entry);
    }
  }

  //console.log(jsonData)

  // Enviar respuesta al cliente
  res.send( jsonData );
  });

http.listen(port, function() {
    console.log('listening on port: '+port );
});