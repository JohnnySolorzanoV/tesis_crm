const cita = require('../entities/Cita');
const { executeSQL } = require('../external_integrations/baseDatos');

async function findbyId(id) {
    const result = await executeSQL(
        'SELECT id, fecha, hora, paciente_cedula, doctor_cedula FROM Cita WHERE id = $1', 
        [id]    );
    const row = result.rows[0];
    return row ? new cita(row) : null;
}

async function findAll () {
    const result = await executeSQL(
        'SELECT id, fecha, hora, paciente_cedula, doctor_cedula FROM Cita'
    );
    return result.rows.map((row) => new cita(row));
}

async function create(cita) {
    const result = await executeSQL(
        'INSERT INTO Cita (fecha, hora, paciente_cedula, doctor_cedula) VALUES ($1, $2, $3, $4) RETURNING *',
        [cita.fecha, cita.hora, cita.paciente_cedula, cita.doctor_cedula]
    );
    return new cita(result.rows[0]);
}

async function update(cita) {
    const result = await executeSQL(
        'UPDATE Cita SET fecha = $1, hora = $2, paciente_cedula = $3, doctor_cedula = $4 WHERE id = $5 RETURNING *',
        [cita.fecha, cita.hora, cita.paciente_cedula, cita.doctor_cedula, cita.id]
    );
    return result.rows[0] ? new cita(result.rows[0]) : null;
}   

async function deleteById(id) {
    const result = await executeSQL(
        'DELETE FROM Cita WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0] ? new cita(result.rows[0]) : null;
}   

const citaRepository = {
    findbyId,
    findAll,
    create,
    update,
    deleteById
};

module.exports = {
    citaRepository
};
