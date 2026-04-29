const bcrypt = require('bcrypt');
const Usuario = require('../entities/Usuario');
const { UsuarioRepository } = require('../repositories/UsuarioRepository');


async function CrearCuenta({ identificacion, nombre, correo, contrasena, rol }) {
  const contrasenaSegura = await bcrypt.hash(contrasena, 10);
  const usuario = new Usuario({ identificacion, nombre, correo, contrasena: contrasenaSegura, rol });
  console.log('Creando cuenta para usuario:', usuario);
  return UsuarioRepository.create(usuario);
}

module.exports = CrearCuenta;
