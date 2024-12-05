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


// Parámetros en la ruta
// Trabajando con Query Parameters
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
        responseMessage = responseMessage.toUpperCase();
    }
    res.json({ "message": responseMessage })
})

// Ruta /now con middleware chaining on routes
app.get("/now", (req, res, next) => {

    // Middleware para agregar la hora actual al objeto req
    req.time = new Date().toString()
    next()
    // Controlador final
}, (req, res) => {
    res.json({ time: req.time })
})


// SOLUCION - RUTA DINAMICA CON QUERY PARAMS para pillar first name y last name 
// Se le debe acceder con una ruta como /name?first=primer&last=segundo
app.get("/name", (req, res) => {
    // Acceder a los query params
    const firstName = req.query.first
    const lastName = req.query.last
    // Construir la respuesta
    res.json({ name: `${firstName} ${lastName}` })
})

// SOLUCION - RUTA dinamica que pille word como params dinamico y expulse un {echo: word}
app.get("/:word/echo", (req, res) => {
    const word = req.params.word

    res.json({ echo: word })
})

// Rutas de prueba
app.get("/about-us", (req, res) => {
    res.send('Página About us')
})

app.get("/slurg/:slurg", (req, res) => {

    const slurg = req.params.slurg

    res.send(`El slurg es: ${slurg}`)
})

app.get("/user/:id", (req, res) => {
    const userId = req.params.id

    res.json({ id: userId, name: `Usuario ${userId}` })
})




module.exports = app;