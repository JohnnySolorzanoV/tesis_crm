const cita = require('../entities/Cita');
const { executeSQL } = require('../external_integrations/baseDatos');

async function findbyId(id) {
    const resultado = await executeSQL(
        'SELECT id, fecha, hora, idpaciente, idmedico FROM Cita WHERE id = $1', 
        [id]    );
    const row = resultado.rows[0];
    return row ? new cita(row) : null;
}

async function findAll () {
    const resultado = await executeSQL(
        'SELECT id, fecha, idpaciente, idmedico FROM Cita'
    );
    return resultado.rows.map((row) => new cita(row));
}

async function create(cita) {
    const resultado = await executeSQL(
        'INSERT INTO Cita (fecha, hora, idpaciente, idmedico) VALUES ($1, $2, $3, $4) RETURNING *',
        [cita.fecha, cita.hora, cita.paciente_cedula, cita.doctor_cedula]
    );
    return new cita(resultado.rows[0]);
}

async function update(cita) {
    const resultado = await executeSQL(
        'UPDATE Cita SET fecha = $1, hora = $2, paciente_cedula = $3, doctor_cedula = $4 WHERE id = $5 RETURNING *',
        [cita.fecha, cita.hora, cita.paciente_cedula, cita.doctor_cedula, cita.id]
    );
    return resultado.rows[0] ? new cita(resultado.rows[0]) : null;
}   

async function deleteById(id) {
    const resultado = await executeSQL(
        'DELETE FROM Cita WHERE id = $1 RETURNING *',
        [id]
    );
    return resultado.rows[0] ? new cita(resultado.rows[0]) : null;
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
