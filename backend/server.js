const express = require('express');
const cors = require('cors');

const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/estado', (req, res) => {
    res.json({ mensaje: '¡El servidor del CRM Experta&Abogados está funcionando perfectamente!' });
});

app.listen(puerto, () => {
    console.log(`Servidor iniciado y escuchando en http://localhost:${puerto}`);
});