// server.js
const express = require('express');
const cors = require('cors');
const db = require('../models/db');
const path = require('path');

const app = express(); // Declaración correcta

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public/'))); // Sirve archivos estáticos

// Ruta principal para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/js/index.html'));
});

// Obtener todos los contactos
app.get('/api/contactos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contactos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar contacto
app.post('/api/contactos', async (req, res) => {
  const { nombre, telefono, correo_eletronico } = req.body;
  console.log('Recibido:', { nombre, telefono, correo_eletronico });  // 👈 para verificar entrada

  try {
    const result = await db.query(
      'INSERT INTO contactos (nombre, telefono, correo_eletronico) VALUES ($1, $2, $3) RETURNING *',
      [nombre, telefono, correo_eletronico]
    );
    console.log('Insertado:', result.rows[0]);       // 👈 para verificar inserción
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al insertar:', err);         // 👈 para ver errores
    res.status(500).json({ error: err.message });
  }
});

// Eliminar contacto
app.delete('/api/contactos/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM contactos WHERE id = $1', [req.params.id]);
    res.json({ eliminado: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});