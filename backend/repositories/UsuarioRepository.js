const Usuario = require('../entities/Usuario');
const { executeSQL } = require('../external_integrations/baseDatos');

async function findByCedula(cedula) {
  const result = await executeSQL(
    'SELECT cedula, nombre, correo, contrasena, rol FROM Usuario WHERE cedula = $1',
    [cedula]
  );
  const row = result.rows[0];
  return row ? new Usuario(row) : null;
}

async function findAll() {
  const result = await executeSQL(
    'SELECT cedula, nombre, correo, contrasena, rol FROM Usuario'
  );
  return result.rows.map((row) => new Usuario(row));
}

async function create(usuario) {
  const result = await executeSQL(
    'INSERT INTO Usuario (cedula, nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [usuario.cedula, usuario.nombre, usuario.correo, usuario.contrasena, usuario.rol]
  );
  return new Usuario(result.rows[0]);
}

async function update(usuario) {
  const result = await executeSQL(
    'UPDATE Usuario SET nombre = $1, correo = $2, contrasena = $3, rol = $4 WHERE cedula = $5 RETURNING *',
    [usuario.nombre, usuario.correo, usuario.contrasena, usuario.rol, usuario.cedula]
  );
  return result.rows[0] ? new Usuario(result.rows[0]) : null;
}

async function deleteByCedula(cedula) {
  const result = await executeSQL(
    'DELETE FROM Usuario WHERE cedula = $1 RETURNING *',
    [cedula]
  );
  return result.rows[0] ? new Usuario(result.rows[0]) : null;
}

const UsuarioRepository = {
  findByCedula,
  findAll,
  create,
  update,
  deleteByCedula,
};

module.exports = {
  UsuarioRepository,
};
