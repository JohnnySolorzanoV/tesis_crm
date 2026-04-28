const Abogado = require("../entities/abogado");
const Usuario = require("../entities/Usuario");
const { executeSQL } = require("../external_integrations/baseDatos");

async function findById(id) {
    const resultado = await executeSQL(
        'SELECT a.id, u.identificacion, u.nombre, u.correo, u.contrasena, a.especialidad, a.num_licencia FROM abogado a JOIN Usuario u ON a.id_usuario = u.id WHERE a.id = $1',
        [id]
    );
    const row = resultado.rows[0];
    return row ? new Abogado(row) : null;
}

async function findAll() {
    const resultado = await executeSQL(
        'SELECT a.id, u.identificacion, u.nombre, u.correo, u.contrasena, a.especialidad, a.num_licencia FROM abogado a JOIN Usuario u ON a.id_usuario = u.id'
    );
    return resultado.rows.map((row) => new Abogado(row));
}


async function create(abogado) {
  const usuarioResult = await executeSQL(
    'INSERT INTO Usuario (identificacion, nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [abogado.identificacion || abogado.cedula, abogado.nombre, abogado.correo, abogado.contrasena, 'abogado']
  );

  const abogadoResult = await executeSQL(
    'INSERT INTO abogado (id_usuario, especialidad, num_licencia) VALUES ($1, $2, $3) RETURNING id, id_usuario, especialidad, num_licencia',
    [usuarioResult.rows[0].id, abogado.especialidad, abogado.num_licencia]
  );

  return new Abogado({
    id: abogadoResult.rows[0].id,
    identificacion: abogado.identificacion || abogado.cedula,
    nombre: abogado.nombre,
    correo: abogado.correo,
    contrasena: abogado.contrasena,
    especialidad: abogado.especialidad,
    num_licencia: abogado.num_licencia,
  });
}

async function update(abogado) {
  const existing = await executeSQL(
    'SELECT id_usuario FROM abogado WHERE id = $1',
    [abogado.id]
  );
  const row = existing.rows[0];
  if (!row) {
    return null;
  }

  await executeSQL(
    'UPDATE Usuario SET identificacion = $1, nombre = $2, correo = $3, contrasena = $4 WHERE id = $5',
    [abogado.identificacion || abogado.cedula, abogado.nombre, abogado.correo, abogado.contrasena, row.id_usuario]
  );

  const abogadoUpdate = await executeSQL(
    'UPDATE abogado SET especialidad = $1, num_licencia = $2 WHERE id = $3 RETURNING id, id_usuario, especialidad, num_licencia',
    [abogado.especialidad, abogado.num_licencia, abogado.id]
  );

  return abogadoUpdate.rows[0] ? new Abogado({
    id: abogadoUpdate.rows[0].id,
    identificacion: abogado.identificacion || abogado.cedula,
    nombre: abogado.nombre,
    correo: abogado.correo,
    contrasena: abogado.contrasena,
    especialidad: abogadoUpdate.rows[0].especialidad,
    num_licencia: abogadoUpdate.rows[0].num_licencia,
  }) : null;
}

async function deleteById(id) {
  const resultado = await executeSQL(
    'DELETE FROM abogado WHERE id = $1 RETURNING id, id_usuario, especialidad, num_licencia',
    [id]
  );
  return resultado.rows[0] ? new Abogado({
    id: resultado.rows[0].id,
    identificacion: undefined,
    nombre: undefined,
    correo: undefined,
    contrasena: undefined,
    especialidad: resultado.rows[0].especialidad,
    num_licencia: resultado.rows[0].num_licencia,
  }) : null;
}

const abogado_repositorio = {
  findById,
  findAll,
  create,
  update,
  deleteById,
};

module.exports = abogado_repositorio;