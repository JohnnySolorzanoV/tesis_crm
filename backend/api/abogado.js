const express = require('express');
const CrearAbogado = require('../use_cases/crearAbogado');
const abogadoRepositorio = require('../repositories/abogado_repositorio');

const router = express.Router();

router.get('/abogados', async (req, res) => {
    const abogados = await abogadoRepositorio.findAll();
    res.status(200).json({ abogados });
});

router.post('/crearAbogado', async (req, res) => {
    console.log('Recibida solicitud de creación de abogado con datos:', req.body);
    try {
        const { identificacion, nombre, correo, contrasena, especialidad, num_licencia } = req.body;
        const abogado = await CrearAbogado({ identificacion, nombre, correo, contrasena, especialidad, num_licencia });
        res.status(200).json({ message: 'Abogado creado exitosamente', abogado });
    } catch (error) {
        console.error('Error en creación de abogado:', error);
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;
