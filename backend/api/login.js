const express = require('express');
const Login = require('../use_cases/login');

const router = express.Router();

router.post('/login', async (req, res) => {
  console.log('Recibida solicitud de login con datos:', req.body);
  try {
    const { correo, contrasena } = req.body;
    const usuario = await Login({ correo, contrasena });
    res.status(200).json({ message: 'Login exitoso', usuario });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
