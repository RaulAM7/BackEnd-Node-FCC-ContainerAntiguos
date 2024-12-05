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
    res.json({ time: req.time })
})


// SOLUCION - RUTA dinamica que pille word como params dinamico y expulse un {echo: word}

app.get("/:word/echo", (req, res) => 
{
    const word = req.params.word

    res.json( {echo: word} )
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
        responseMessage = responseMessage.toUpperCase();
    }
    res.json({ "message": responseMessage })
})




// Rutas de prueba para trastear

app.get("/about-us", (req, res) => {
    res.send('Página About us')
})


app.get("/:slurg", (req, res) => {

    const slurg = req.params.slurg

    res.send(`El slurg es: ${slurg}`)
})



app.get("/user/:id", (req, res) => 
{
    const userId = req.params.id

    res.json( {id: userId, name: `Usuario ${userId}`}  )
})




app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000...');
});


module.exports = app;