const express = require('express');
const CrearCuenta = require('../use_cases/crearCuenta');

const router = express.Router();

router.post('/crearCuenta', async (req, res) => {
    console.log('Recibida solicitud para crear cuenta con datos:', req.body);
  try {
    const { cedula, nombre, correo, contrasena, rol } = req.body;
    const usuario = await CrearCuenta({ cedula, nombre, correo, contrasena, rol });
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al crear cuenta:', error);
    res.status(500).json({ error: 'No se pudo crear la cuenta' });
  }
});

module.exports = router;
