const Usuario = require('../entities/Usuario');
const { executeSQL } = require('../external_integrations/baseDatos');

async function findByIdentificacion(identificacion) {
  const resultado = await executeSQL(
    'SELECT identificacion, nombre, correo, contrasena, rol FROM Usuario WHERE identificacion = $1',
    [identificacion]
  );
  const row = resultado.rows[0];
  return row ? new Usuario(row) : null;
}

async function findByCorreo(correo) {
  const resultado = await executeSQL(
    'SELECT identificacion, nombre, correo, contrasena, rol FROM Usuario WHERE correo = $1',
    [correo]
  );
  const row = resultado.rows[0];
  return row ? new Usuario(row) : null;
}

async function findAll() {
  const resultado = await executeSQL(
    'SELECT identificacion, nombre, correo, contrasena, rol FROM Usuario'
  );
  return resultado.rows.map((row) => new Usuario(row));
}

async function create(usuario) {
  const resultado = await executeSQL(
    'INSERT INTO Usuario (identificacion, nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [usuario.identificacion, usuario.nombre, usuario.correo, usuario.contrasena, usuario.rol]
  );
  return new Usuario(resultado.rows[0]);
}

async function update(usuario) {
  const resultado = await executeSQL(
    'UPDATE Usuario SET nombre = $1, correo = $2, contrasena = $3, rol = $4 WHERE identificacion = $5 RETURNING *',
    [usuario.nombre, usuario.correo, usuario.contrasena, usuario.rol, usuario.identificacion]
  );
  return resultado.rows[0] ? new Usuario(resultado.rows[0]) : null;
}

async function deleteByIdentificacion(identificacion) {
  const resultado = await executeSQL(
    'DELETE FROM Usuario WHERE identificacion = $1 RETURNING *',
    [identificacion]
  );
  return resultado.rows[0] ? new Usuario(resultado.rows[0]) : null;
}

const UsuarioRepository = {
  findByIdentificacion,
  findByCorreo,
  findAll,
  create,
  update,
  deleteByIdentificacion,
};

module.exports = {
  UsuarioRepository,
};
