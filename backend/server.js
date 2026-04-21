const express = require('express');
const cors = require('cors');
const { testConnection } = require('./external_integrations/baseDatos');

// Importar rutas
const registroRoutes = require('./api/registro');
const loginRoutes = require('./api/login');

const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/registro', registroRoutes);
app.use('/api', loginRoutes);

app.get('/api/estado', (req, res) => {
    res.json({ mensaje: '¡El servidor del CRM Experta&Abogados está funcionando perfectamente!' });
});

async function startServer() {
    try {
        await testConnection();
        app.listen(puerto, () => {
            console.log(`Servidor iniciado y escuchando en http://localhost:${puerto}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos al iniciar:', error.message || error);
        process.exit(1);
    }
}

startServer();