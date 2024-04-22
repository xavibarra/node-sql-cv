require('dotenv').config();
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Evento 'acquire' se emite cuando se adquiere una nueva conexión del pool
pool.on('acquire', function (connection) {
    console.log('Nueva conexión adquirida desde el pool');
});

// Evento 'connection' se emite cuando se establece una nueva conexión al servidor de la base de datos
pool.on('connection', function (connection) {
    console.log('Nueva conexión establecida con el servidor de la base de datos');
});

// Evento 'enqueue' se emite cuando una solicitud de conexión es encolada
pool.on('enqueue', function () {
    console.log('Solicitud de conexión encolada debido a todas las conexiones ocupadas');
});

// Evento 'error' se emite cuando hay un error en la conexión con el servidor de la base de datos
pool.on('error', function (err) {
    console.error('Error en la conexión con el servidor de la base de datos:', err);
});

module.exports = pool;
