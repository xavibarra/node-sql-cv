require('dotenv').config();

const express = require('express');
const app = express();

const pool = require('./database'); // Asume que has creado este módulo siguiendo los pasos anteriores.



app.use(express.json());

app.use(express.static('public'));

// Obtener todas las personas
app.get('/personas', (req, res) => {
    pool.query('SELECT * FROM personas', (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// Obtener una persona por ID
app.get('/persona/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM personas WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.status(200).json(results[0]);
    });
});

// Obtener una persona por ID
app.get('/personapornombre/:nombre', (req, res) => {
    const { nombre } = req.params;
    const query = 'SELECT * FROM personas WHERE nombre LIKE ?';
    const busqueda = '%' + nombre + '%';
    pool.query(query, [busqueda], (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});
// Crear una nueva persona
app.post('/personas', (req, res) => {
    const { nombre, email, telefono } = req.body;
    pool.query('INSERT INTO personas (nombre, email, telefono) VALUES (?, ?, ?)', [nombre, email, telefono],
        (err, results) => {
            if (err) throw err;
            res.status(201).send(`Persona agregada con el ID: ${results.insertId}`);
        });
});
// Actualizar una persona
app.put('/persona/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    pool.query('UPDATE personas SET nombre = ?, email = ?, telefono = ? WHERE id = ?', [nombre, email,
        telefono, id], (err, results) => {
            if (err) throw err;
            res.status(200).send(`Persona con el ID: ${id} actualizada.`);
        });
});

// Eliminar una persona
app.delete('/persona/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM personas WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(200).send(`Persona con el ID: ${id} eliminada.`);
    });
   });

// API Formación

// Obtener formaciones de una persona por ID
app.get('/formaciones/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * \
                FROM personas as p \
                join formacion as f \
                on p.id = f.id_persona \
                where p.id=  ?', [id], (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// Obtener experiencies de una persona por ID
app.get('/experiencias/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * \
                FROM personas as p \
                join experiencia as f \
                on p.id = f.id_persona \
                where p.id=  ?', [id], (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});


// Obtener habilidades de una persona por ID
app.get('/habilidades/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * \
                FROM personas as p \
                join habilidades as f \
                on p.id = f.id_persona \
                where p.id=  ?', [id], (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});
const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
   });