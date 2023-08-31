const tareas = require('./Routes/rutas.routes')
var express = require('express');
const ejs=require('ejs');
const morgan=require('morgan');

var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
var http = require('http').Server(app);
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
var port = 3000;
app.use(morgan('dev'))

//Rutas
app.get('/', function(req,res){
    res.send("Bienvenido!")
});
    
//app.use("/",usuario);
app.use('/Inicio',tareas)

http.listen(port, function() {
    console.log('listening on :3000');
});