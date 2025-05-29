// server/routes/contactos.js
const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM contactos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, telefono, correo_eletronico } = req.body;
    const { rows } = await db.query(
      'INSERT INTO contactos (nombre, telefono, correo_eletronico) VALUES ($1, $2, $3) RETURNING *',
      [nombre, telefono, correo_eletronico]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('DELETE FROM contactos WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;