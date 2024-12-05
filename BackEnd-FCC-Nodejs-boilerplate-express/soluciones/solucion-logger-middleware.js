// Cargar el .env
require('dotenv').config();

// Dependencias
let express = require('express');
let app = express();

//Debugger
console.log("Hello World")

// Middlewares
// Hojas de estilos
app.use("/public", express.static(__dirname + "/public"));

// Logger
app.use((req, res, next) => {
    const log = `${req.method} ${req.path} - ${req.ip}`;
    console.log(log)
    next()
})


// Middleware chaining on routes
// Ruta /now con middleware encadenado
app.get("/now", (req, res, next) => {
    
    // Middleware para agregar la hora actual al objeto req
    req.time = new Date().toString()
    next()

    // Controlador final
}, (req, res) => {
    res.json({time: req.time})
})


// Rutas
// Ruta de Home
app.get("/", (req, res) => {
    const absolutePath = __dirname + "/views/index.html"
    res.sendFile(absolutePath)
})

// Ruta de /Json
app.get("/json", (req, res) => {
    let responseMessage = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        responseMessage = responseMessage.toUpperCase();}
    res.json({ "message": responseMessage })
})



module.exports = app;