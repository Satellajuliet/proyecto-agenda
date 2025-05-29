// server/routes/contactos.js
const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

router.get('/', contactoController.obtenerContactos);
router.post('/', contactoController.agregarContacto);
router.delete('/:id', contactoController.eliminarContacto);

module.exports = router;
