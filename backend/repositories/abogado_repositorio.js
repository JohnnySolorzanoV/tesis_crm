const Abogado = require("../entities/abogado");
const { executeSQL } = require("../external_integrations/baseDatos");

async function findById(id) {
    const resultado = await executeSQL(
        'SELECT a.id, u.identificacion, u.nombre, u.correo, u.contrasena, a.especialidad, a.num_licencia FROM Abogado a JOIN Usuario u ON a.id_usuario = u.id WHERE a.id = $1',
        [id]
    );
    const row = resultado.rows[0];
    return row ? new Abogado(row) : null;
}

async function findAll() {
    const resultado = await executeSQL(
        'SELECT a.id, u.identificacion, u.nombre, u.correo, u.contrasena, a.especialidad, a.num_licencia FROM Abogado a JOIN Usuario u ON a.id_usuario = u.id'
    );
    return resultado.rows.map((row) => new Abogado(row));
}