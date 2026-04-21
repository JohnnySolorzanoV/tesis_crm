const bcrypt = require('bcrypt');
const Usuario = require('../entities/Usuario');
const { UsuarioRepository } = require('../repositories/UsuarioRepository');


async function CrearCuenta({ cedula, nombre, correo, contrasena, rol }) {
  const hashedPassword = await bcrypt.hash(contrasena, 10);
  const usuario = new Usuario({ cedula, nombre, correo, hashedPassword, rol });
  console.log('Creando cuenta para usuario:', usuario);
  return UsuarioRepository.create(usuario);
}

module.exports = CrearCuenta;
