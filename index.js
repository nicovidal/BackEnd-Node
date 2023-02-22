const express = require('express');
require('dotenv').config();

/* console.log(process.env) */

//Crear el servidor de express

const app = express();

//directorio publico
app.use(express.static('public'));


//Lectura y parseo del body
app.use(express.json())


//rutas
app.use('/api/auth',require('./routes/auth'))
//TODO:Auth//crear.login.renew
//todo lo que vaya a exportar , estara en esa ruta







//TODO:CRUD:EVENTOS






//Escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});