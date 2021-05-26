const express = require('express');
require('dotenv').config();
const cors = require('cors');

const {dbConnection} = require('./database/config');

// Crear servidor expressJs
const app = express();

// Configurar CORS
app.use(cors());

// Base de Datos
dbConnection();

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hello Friend'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo  en el puerto ', 3000);
})